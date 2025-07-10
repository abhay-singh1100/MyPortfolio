import React, { useRef, useEffect } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

const BUBBLE_COLOR = "#4cd7ff88";
const BUBBLE_COUNT = 32;

export default function BubblesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize bubbles
    bubbles.current = Array.from({ length: BUBBLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 8 + Math.random() * 8,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      color: BUBBLE_COLOR,
    }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      let x, y;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      if (typeof x === "number" && typeof y === "number") {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles.current) {
        // Mouse/touch repulsion
        const dist = Math.hypot(b.x - mouse.current.x, b.y - mouse.current.y);
        if (dist < 120) {
          const angle = Math.atan2(b.y - mouse.current.y, b.x - mouse.current.x);
          b.dx += Math.cos(angle) * 0.08;
          b.dy += Math.sin(angle) * 0.08;
        }
        // Move
        b.x += b.dx;
        b.y += b.dy;
        // No friction, always moving
        // Bounce off edges
        if (b.x - b.r < 0 || b.x + b.r > width) b.dx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > height) b.dy *= -1;
        // Draw
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
} 