import { useEffect, useRef } from "react";
import bgVideo from "@/assets/bg2.mp4";

const BackgroundVideo = () => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = 0.2;
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        ref={ref}
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
};

export default BackgroundVideo;