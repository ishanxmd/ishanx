import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Loader2, Plus, Trash2, Paperclip, X, FileText } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type Attachment = {
  kind: "image" | "file";
  name: string;
  mime: string;
  dataUrl: string; // data:<mime>;base64,...
};

type Msg = {
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const MAX_FILE_MB = 10;

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

const buildApiContent = (m: Msg) => {
  if (!m.attachments || m.attachments.length === 0) return m.content;
  const parts: any[] = [];
  if (m.content) parts.push({ type: "text", text: m.content });
  for (const a of m.attachments) {
    if (a.kind === "image") {
      parts.push({ type: "image_url", image_url: { url: a.dataUrl } });
    } else {
      parts.push({
        type: "file",
        file: { filename: a.name, file_data: a.dataUrl },
      });
    }
  }
  if (parts.length === 0) parts.push({ type: "text", text: "" });
  return parts;
};

const ChatSidebar = ({ onNewChat, onClearChat }: { onNewChat: () => void; onClearChat: () => void }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onNewChat} tooltip="New Chat">
              <Plus className="h-4 w-4" />
              {!collapsed && <span>New Chat</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onClearChat} tooltip="Clear Chat">
              <Trash2 className="h-4 w-4" />
              {!collapsed && <span>Clear Chat</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pendingFiles, setPendingFiles] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearMessages = () => {
    setMessages([]);
    setPendingFiles([]);
  };

  const onPickFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    const added: Attachment[] = [];
    for (const f of files) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        alert(`"${f.name}" exceeds the ${MAX_FILE_MB}MB limit.`);
        continue;
      }
      try {
        const dataUrl = await readAsDataUrl(f);
        added.push({
          kind: f.type.startsWith("image/") ? "image" : "file",
          name: f.name,
          mime: f.type || "application/octet-stream",
          dataUrl,
        });
      } catch {
        alert(`Failed to read "${f.name}".`);
      }
    }
    if (added.length) setPendingFiles((prev) => [...prev, ...added]);
  };

  const removePending = (i: number) =>
    setPendingFiles((prev) => prev.filter((_, idx) => idx !== i));

  const send = async () => {
    const text = input.trim();
    if ((!text && pendingFiles.length === 0) || loading) return;
    const userMsg: Msg = {
      role: "user",
      content: text,
      attachments: pendingFiles.length ? pendingFiles : undefined,
    };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setPendingFiles([]);
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: buildApiContent(m) })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      if (!res.body) throw new Error("No response body");
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (chunk) {
              acc += chunk;
              setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, content: acc } : msg));
            }
          } catch { /* ignore */ }
        }
      }
      if (!acc) {
        setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, content: "(no response)" } : msg));
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Error"}` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-[#0a0a0a] text-white">
        <ChatSidebar onNewChat={clearMessages} onClearChat={clearMessages} />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b border-white/10 px-4 py-3 flex items-center gap-3 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-10">
            <SidebarTrigger className="text-white hover:bg-white/10" />
            <Link to="/#features" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-semibold">ISHAN-X AI</h1>
              <p className="text-xs text-white/50">General-purpose AI assistant</p>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
              {messages.length === 0 && !loading && (
                <div className="text-center text-white/40 text-sm pt-20">
                  Ask ISHAN-X AI anything to start the conversation.
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-[#0071e3] text-white rounded-br-md"
                        : "bg-white/[0.06] border border-white/10 text-white/90 rounded-bl-md"
                    }`}
                  >
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {m.attachments.map((a, j) =>
                          a.kind === "image" ? (
                            <img
                              key={j}
                              src={a.dataUrl}
                              alt={a.name}
                              className="max-h-40 rounded-lg border border-white/20"
                            />
                          ) : (
                            <div
                              key={j}
                              className="flex items-center gap-2 bg-black/20 border border-white/20 rounded-lg px-2 py-1.5 text-xs"
                            >
                              <FileText className="w-4 h-4 shrink-0" />
                              <span className="truncate max-w-[180px]">{a.name}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </main>

          <footer className="border-t border-white/10 bg-[#0a0a0a] px-4 py-3 sticky bottom-0">
            <div className="max-w-3xl mx-auto">
              {pendingFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {pendingFiles.map((a, i) => (
                    <div
                      key={i}
                      className="relative group bg-white/[0.06] border border-white/10 rounded-lg p-1.5 pr-7"
                    >
                      {a.kind === "image" ? (
                        <img src={a.dataUrl} alt={a.name} className="h-14 w-14 object-cover rounded" />
                      ) : (
                        <div className="flex items-center gap-2 px-2 py-2 text-xs text-white/80">
                          <FileText className="w-4 h-4" />
                          <span className="truncate max-w-[160px]">{a.name}</span>
                        </div>
                      )}
                      <button
                        onClick={() => removePending(i)}
                        className="absolute top-0.5 right-0.5 rounded-full bg-black/60 hover:bg-black/80 p-0.5"
                        aria-label="Remove attachment"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,application/pdf,text/*,.md,.json,.csv"
                  onChange={onPickFiles}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white p-3 transition-colors disabled:opacity-40"
                  aria-label="Attach image or file"
                  title="Attach image or file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Message ISHAN-X AI..."
                  className="flex-1 resize-none max-h-40 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#0071e3] transition-colors"
                />
                <button
                  onClick={send}
                  disabled={loading || (!input.trim() && pendingFiles.length === 0)}
                  className="rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 transition-colors"
                  aria-label="Send"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[10px] text-white/30 text-center mt-2">
                AI can make mistakes. Verify important info.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;
