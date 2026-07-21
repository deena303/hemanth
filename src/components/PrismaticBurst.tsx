import { useEffect, useRef } from "react";

interface PrismaticBurstProps {
  animationType?: "rotate3d" | "flat";
  intensity?: number;
  speed?: number;
  distort?: number;
  hoverDampness?: number;
  rayCount?: number;
  mixBlendMode?: "lighten" | "screen" | "multiply" | "normal";
}

export default function PrismaticBurst({
  animationType = "rotate3d",
  intensity = 2,
  speed = 0.8,
  distort = 1,
  hoverDampness = 0.25,
  rayCount = 24,
  mixBlendMode = "lighten",
}: PrismaticBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep track of mouse state
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
  });

  const colors = [
    "rgba(248, 180, 217, 0.15)",  // #F8B4D9 (soft pink)
    "rgba(217, 184, 255, 0.15)",  // #D9B8FF (soft purple)
    "rgba(255, 245, 230, 0.12)",  // #FFF5E6 (warm off-white/cream)
    "rgba(255, 214, 236, 0.15)",  // #FFD6EC (rose pink)
    "rgba(191, 217, 255, 0.15)",  // #BFD9FF (soft blue)
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle Resize
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (rect?.height || window.innerHeight) * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Coordinates normalized from -1 to 1
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      // Mouse position targets for center shifting
      mouseState.current.targetX = nx * 80 * intensity;
      mouseState.current.targetY = ny * 80 * intensity;

      // Tilt targets for 3D effect
      mouseState.current.targetTiltX = -ny * 12 * intensity; // Rotate around X
      mouseState.current.targetTiltY = nx * 12 * intensity;  // Rotate around Y
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Damp mouse coordinates
      mouseState.current.currentX += (mouseState.current.targetX - mouseState.current.currentX) * hoverDampness;
      mouseState.current.currentY += (mouseState.current.targetY - mouseState.current.currentY) * hoverDampness;

      // Damp tilt rotation for container 3D transform
      mouseState.current.tiltX += (mouseState.current.targetTiltX - mouseState.current.tiltX) * hoverDampness;
      mouseState.current.tiltY += (mouseState.current.targetTiltY - mouseState.current.tiltY) * hoverDampness;

      if (animationType === "rotate3d" && containerRef.current) {
        containerRef.current.style.transform = `perspective(1200px) rotateX(${mouseState.current.tiltX}deg) rotateY(${mouseState.current.tiltY}deg)`;
      } else if (containerRef.current) {
        containerRef.current.style.transform = "none";
      }

      time += speed * 0.01;

      const centerX = width / 2 + mouseState.current.currentX;
      const centerY = height / 2 + mouseState.current.currentY;
      const maxRadius = Math.max(width, height) * 1.2;

      ctx.save();
      
      // Draw Prismatic Rays
      for (let i = 0; i < rayCount; i++) {
        const angleBase = (i / rayCount) * Math.PI * 2;
        // Ray rotation speed
        const angle = angleBase + time * 0.15;

        // Soft wobbling distort factor using sine waves
        const distortFactor = Math.sin(time + angle * 4) * distort * 0.08;
        const angle1 = angle - 0.06 - distortFactor;
        const angle2 = angle + 0.06 + distortFactor;

        const colorIndex = i % colors.length;
        const rayGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        rayGradient.addColorStop(0, colors[colorIndex]);
        rayGradient.addColorStop(0.3, colors[(colorIndex + 1) % colors.length]);
        rayGradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle1) * maxRadius,
          centerY + Math.sin(angle1) * maxRadius
        );
        ctx.lineTo(
          centerX + Math.cos(angle2) * maxRadius,
          centerY + Math.sin(angle2) * maxRadius
        );
        ctx.closePath();

        ctx.fillStyle = rayGradient;
        ctx.fill();
      }

      // Add a soft center romantic ambient glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 250);
      glowGrad.addColorStop(0, "rgba(248, 180, 217, 0.18)");
      glowGrad.addColorStop(0.5, "rgba(217, 184, 255, 0.08)");
      glowGrad.addColorStop(1, "rgba(0,0,0,0)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationType, intensity, speed, distort, hoverDampness, rayCount]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-transform duration-300 ease-out"
      style={{
        zIndex: 0,
        mixBlendMode: mixBlendMode as any,
      }}
      id="prismatic-burst-bg"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full block"
      />
    </div>
  );
}
