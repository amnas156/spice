"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  angle: number;
  speed: number;
}

export default function SpiceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const colors = [
      "rgba(192, 57, 43, 0.7)",  // Chilli Red
      "rgba(230, 126, 34, 0.7)", // Turmeric Orange
      "rgba(243, 156, 18, 0.7)", // Turmeric Gold
      "rgba(39, 174, 96, 0.6)",  // Coriander Green
      "rgba(211, 84, 0, 0.6)",   // Earthy Brown
      "rgba(241, 196, 15, 0.7)",  // Coconut Yellow
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomY = false): Particle {
      const w = canvas?.width || 800;
      const h = canvas?.height || 600;
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2, // Move upwards
        radius: Math.random() * 3.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        decay: Math.random() * 0.005 + 0.002,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particles.forEach((p, idx) => {
        // Drifting effect (Sine wave oscillation)
        p.angle += p.speed;
        p.x += Math.sin(p.angle) * 0.15 + p.vx;
        p.y += p.vy;

        // Interaction with mouse cursor (pushed away slightly)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceDist = 120; // Interaction radius

          if (dist < forceDist) {
            const force = (forceDist - dist) / forceDist;
            const angle = Math.atan2(dy, dx);
            // Push away
            p.x += Math.cos(angle) * force * 2.5;
            p.y += Math.sin(angle) * force * 2.5;
          }
        }

        // Render particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Add soft glow around bigger particles
        if (p.radius > 2.5) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
        ctx.restore();

        // Respawn if off screen
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
