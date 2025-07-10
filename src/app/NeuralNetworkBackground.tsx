import React, { useRef, useEffect } from "react";

const LAYERS = [4, 6, 5, 3]; // Fewer nodes per layer for lower density
const NODE_RADIUS = 8;
const COLORS = {
  node: "#4cd7ff",
  nodeGlow: "#4cd7ff55",
  line: "#4cd7ff44",
  lineActive: "#4cd7ffcc"
};

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Calculate node positions
    const layerGap = width / (LAYERS.length + 1);
    const nodePositions: { x: number; y: number }[][] = LAYERS.map((count, i) => {
      const yGap = height / (count + 1);
      return Array.from({ length: count }, (_, j) => ({
        x: layerGap * (i + 1),
        y: yGap * (j + 1)
      }));
    });

    let t = 0;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw connections
      for (let l = 0; l < LAYERS.length - 1; l++) {
        for (const from of nodePositions[l]) {
          for (const to of nodePositions[l + 1]) {
            // Animate line alpha for a pulsing effect
            const pulse = 0.5 + 0.5 * Math.sin(t / 30 + from.x * to.y * 0.0001);
            ctx.strokeStyle = `rgba(76, 215, 255, ${0.18 + 0.22 * pulse})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
          }
        }
      }
      // Draw nodes
      for (let l = 0; l < LAYERS.length; l++) {
        for (const node of nodePositions[l]) {
          // Glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, NODE_RADIUS * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.nodeGlow;
          ctx.globalAlpha = 0.28 + 0.12 * Math.abs(Math.sin(t / 40 + node.x * 0.01));
          ctx.fill();
          ctx.globalAlpha = 1;
          // Node
          ctx.beginPath();
          ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.node;
          ctx.shadowColor = COLORS.node;
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      t++;
      requestAnimationFrame(animate);
    }
    animate();
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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