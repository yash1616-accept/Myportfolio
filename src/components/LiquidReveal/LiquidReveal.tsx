import React, { useRef, useEffect } from 'react';
import styles from './LiquidReveal.module.css';

interface LiquidRevealProps {
  baseImageSrc: string;
  overlayImageSrc: string;
  brushSize?: number;
  lerpAmount?: number;
}

export const LiquidReveal: React.FC<LiquidRevealProps> = ({
  baseImageSrc,
  overlayImageSrc,
  brushSize = 150,
  lerpAmount = 0.1, // Controls the "heavy" liquid drag 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const renderMouse = useRef({ x: 0, y: 0 }); // Pos the brush actually renders
  const isHovered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    const container = containerRef.current;
    if (!canvas || !ctx || !container) return;

    let animationFrameId: number;
    let isOverlayLoaded = false;
    let imgRatio = 1;

    // Load overlay image
    const overlayImg = new Image();
    const initOverlay = () => {
      isOverlayLoaded = true;
      imgRatio = overlayImg.width / overlayImg.height;
      resizeCanvas();
    };

    overlayImg.onload = initOverlay;
    overlayImg.src = overlayImageSrc;
    // Check if it's already cached
    if (overlayImg.complete && overlayImg.naturalHeight !== 0) {
      initOverlay();
    }

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      // Re-draw overlay on resize
      if (isOverlayLoaded) {
        drawFullOverlay();
      }
    };

    const drawFullOverlay = () => {
      // Reset composite operation to draw the solid overlay initially
      ctx.globalCompositeOperation = 'source-over';

      // Simple strategy to "fill" or "cover" the canvas with the image
      // For a seamless look, we draw it at cover aspect ratio
      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgRatio;
        drawH = canvas.height;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }
      ctx.drawImage(overlayImg, drawX, drawY, drawW, drawH);
    };

    // Initialize dimensions
    window.addEventListener('resize', resizeCanvas);

    // Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!isHovered.current) {
        isHovered.current = true;
        // Snap render mouse to actual mouse on enter
        renderMouse.current = { ...mouse.current };
        previousMouse.current = { ...mouse.current };
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling while revealing effect
      if (e.cancelable) {
        e.preventDefault();
      }
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      if (!isHovered.current) {
        isHovered.current = true;
        // Snap render mouse to actual touch on enter
        renderMouse.current = { ...mouse.current };
        previousMouse.current = { ...mouse.current };
      }
    };

    const handleTouchEnd = () => {
      isHovered.current = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    const drawGooeyBrush = (renderX: number, renderY: number, prevX: number, prevY: number) => {
      ctx.globalCompositeOperation = 'destination-out';

      const distance = Math.hypot(renderX - prevX, renderY - prevY);
      const step = brushSize / 4;

      if (distance > step) {
        const steps = Math.ceil(distance / step);
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const cx = prevX + (renderX - prevX) * t;
          const cy = prevY + (renderY - prevY) * t;

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, brushSize);
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)'); // Added mid-stop for gooey edge
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, brushSize, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const grad = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, brushSize);
        grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(renderX, renderY, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animation loop (Lerp + Erasing)
    const render = () => {
      if (!isOverlayLoaded) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Heal the overlay (fade out the trail)
      ctx.globalCompositeOperation = 'source-over';
      // When hovered, heal at a consistent rate (0.02) to create a nice tail.
      // When NOT hovered, heal a bit faster (0.1) so the hole shrinks and snaps closed beautifully,
      // rather than disappearing instantly (1.0).
      ctx.globalAlpha = isHovered.current ? 0.02 : 0.1;

      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgRatio;
        drawH = canvas.height;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }
      ctx.drawImage(overlayImg, drawX, drawY, drawW, drawH);
      ctx.globalAlpha = 1.0; // Reset alpha for brush

      // Always calculate lerp to allow the brush to catch up even if mouse just left
      const distX = mouse.current.x - renderMouse.current.x;
      const distY = mouse.current.y - renderMouse.current.y;

      if (Math.abs(distX) > 0.1 || Math.abs(distY) > 0.1 || isHovered.current) {
        renderMouse.current.x += distX * lerpAmount;
        renderMouse.current.y += distY * lerpAmount;

        if (isHovered.current) {
          drawGooeyBrush(
            renderMouse.current.x, renderMouse.current.y,
            previousMouse.current.x, previousMouse.current.y
          );
        }

        previousMouse.current = { ...renderMouse.current };
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Start loop
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [overlayImageSrc, brushSize, lerpAmount]);

  return (
    <section className={styles.liquidRevealContainer} ref={containerRef}>
      {/* 1. Base Layer (The image you reveal) */}
      <img src={baseImageSrc} alt="Revealed content" className={styles.baseLayer} />

      {/* 2. Optional Magical UI Overlay Content */}
      <div className={styles.magicContent}>
        <h2>Discover the Magic</h2>
        <p>A hidden world lies beneath the surface.</p>
      </div>

      {/* 3. The Canvas (The Overlay layer being erased) */}
      <canvas ref={canvasRef} className={styles.canvasOverlay} />

      {/* SVG Filter Definition for the Gooey Hole Edge */}
      <svg className={styles.svgFilter}>
        <defs>
          <filter id="gooey-hole">
            <feGaussianBlur in="SourceAlpha" stdDeviation="25" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 60 -30" result="gooeyAlpha" />
            <feComposite in="SourceGraphic" in2="gooeyAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};
