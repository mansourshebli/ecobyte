import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  title: string;
  onEnded: () => void;
}

export function VideoPlayer({ title, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onEnded();
      // Reset and play for the next feature
      video.currentTime = 0;
      video.play().catch(console.error);
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(console.error);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  return (
    <div className="relative h-[400px] rounded-lg bg-gray-950 p-4">
      <div className="h-[calc(100%-2rem)] w-full overflow-hidden rounded-lg bg-gray-900">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        >
          <source src="/theVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="mt-2 text-sm text-gray-300">
        {title}
      </div>
    </div>
  );
}