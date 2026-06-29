import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="border-b border-white/10 px-4 py-3 flex items-center gap-3 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-10">
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
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="Message AI Assistant..."
            className="flex-1 resize-none max-h-40 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#0071e3] transition-colors"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 transition-colors"
            aria-label="Send"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-[10px] text-white/30 text-center mt-2">
          AI can make mistakes. Verify important info.
        </p>
      </footer>
    </div>
  );
};

export default Chat;
