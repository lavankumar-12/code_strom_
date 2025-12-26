import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let wave = {
            y: canvas.height / 2,
            length: 0.01,
            amplitude: 100,
            frequency: 0.01
        };

        let increment = wave.frequency;

        const colors = [
            { r: 255, g: 65, b: 108, a: 0.5 }, // Primary Pink
            { r: 0, g: 242, b: 255, a: 0.5 },  // Cyan accent
            { r: 100, g: 100, b: 255, a: 0.3 } // Deep Purple
        ];

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            // Trail effect for smooth fading
            ctx.fillStyle = 'rgba(10, 10, 18, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            increment += wave.frequency;

            // Draw multiple waves
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x < canvas.width; x++) {
                    // Complex sine wave equation using i to offset each wave
                    let y = canvas.height / 2 +
                        Math.sin(x * wave.length + increment + (i * 100)) * wave.amplitude * Math.sin(increment);

                    ctx.lineTo(x, y);
                }

                ctx.strokeStyle = `rgba(${colors[i].r}, ${colors[i].g}, ${colors[i].b}, ${colors[i].a})`;
                ctx.lineWidth = 2; // Thin elegant lines
                ctx.stroke();
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 bg-[#0a0a12] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#000000] to-[#0f0c29]"></div>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full filter blur-[3px] opacity-70"></canvas>

            {/* Add a subtle vignette overlay for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
    );
};

export default Background;
