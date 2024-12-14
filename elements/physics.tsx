'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function Physics() {
    const sceneRef = useRef(null);
    const divRefs = useRef([]);
    const [matterInitialized, setMatterInitialized] = useState(false);

    const jsonData = [
        { text: "Competitive" },
        { text: "Agile" },
        { text: "Powerful" },
        { text: "Enduring" },
        { text: "Skilled" },
        { text: "Tactical" },
        { text: "Resilient" },
        { text: "Determined" },
        { text: "Disciplined" },
        { text: "Passionate" },
        { text: "Dynamic" },
        { text: "Strategic" },
        { text: "Focused" },
        { text: "Versatile" },
        { text: "Energetic" },
    ];

    const calculateTextDimensions = (text, font = '24px Arial') => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return {
            width: metrics.width + 120, // Add padding/margin
            height: 80, // Fixed height or adjust based on font size
        };
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !matterInitialized) {
                    setMatterInitialized(true);
                    initializeMatter();
                }
            },
            {
                threshold: 0.8,
            }
        );

        if (sceneRef.current) {
            observer.observe(sceneRef.current);
        }

        return () => {
            if (sceneRef.current) {
                observer.unobserve(sceneRef.current);
            }
        }
    }, [matterInitialized]);

    const initializeMatter = () => {
        const { Engine, Render, World, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;

        // Create engine
        const engine = Engine.create();

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false,
            },
        });

        render.canvas.className = 'overflow-hidden w-full h-full';



        // Create ground
        const ground = Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 50,
            window.innerWidth,
            100,
            { isStatic: true }
        );

        const wallLeft = Bodies.rectangle(
            -50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            { isStatic: true }
        );

        const wallRight = Bodies.rectangle(
            window.innerWidth + 50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            { isStatic: true }
        );

        const ceiling = Bodies.rectangle(
            window.innerWidth / 2,
            -50,
            window.innerWidth,
            100,
            { isStatic: true }
        );

        // Create shapes
        const shapes = [];
        for (let i = 0; i < jsonData.length; i++) {
            const { text } = jsonData[i];
            const { width, height } = calculateTextDimensions(text);
            const body = Bodies.rectangle(

                Math.random() * (window.innerWidth - 200) + 100, // Random X position within the screen (with 100px margin on both sides)
                Math.random() * (window.innerHeight - 200) + 100, // Random Y spawn above the screen
                width, // Width
                height, // Height
                {
                    restitution: 0.5, // Bounciness
                    render: { fillStyle: "transparent" },
                    chamfer: { radius: 40 },
                    isStatic: false,

                }
            );
            shapes.push(body);
        }

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        })

        World.add(engine.world, [ground, wallLeft, wallRight, ceiling, ...shapes, mouseConstraint]);

        const updateDivs = () => {
            const scalingFactor = render.options.width / window.innerWidth;

            shapes.forEach((body, index) => {
                const div = divRefs.current[index];
                const { text } = jsonData[index];
                const { width, height } = calculateTextDimensions(text);
                if (div) {

                    const x = (body.position.x - window.innerWidth / 2) / scalingFactor;
                    const y = (body.position.y - window.innerHeight / 2) / scalingFactor;

                    div.style.width = `${width}px`;
                    div.style.height = `${height}px`;
                    div.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
                    div.style.overflow = 'hidden';
                }
            });
        };

        Engine.run(engine);
        Render.run(render);

        Events.on(engine, 'afterUpdate', updateDivs);

        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }

    return (
        <div className="h-[100vh] w-full flex justify-center items-center relative overflow-hidden pointer-events-none">
            {/* Matter.js Canvas */}
            <div
                ref={sceneRef}
                className="absolute inset-0 z-20 pointer-events-none w-full"
            ></div>

            {/* DOM Elements for Shapes */}
            {jsonData.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (divRefs.current[index] = el)}
                    className="absolute bg-white text-center rounded-[100px] flex items-center justify-center font-bold text-black text-[24px] z-30"
                    style={{
                        visibility: matterInitialized ? 'visible' : 'hidden',
                    }}
                >
                    {data.text}
                </div>
            ))}

            {/* Existing Content */}
            <div className="bg-cover bg-[url('/default.png')] h-screen w-full overflow-hidden flex flex-col items-center z-10">
                <div className="font-[family-name:var(--font-maru-mega)] text-[220px]">
                    Why ?
                </div>
                <div className="font-[family-name:var(--font-satoshi)] text-[40px] text-white font-bold">
                    Remember what sport is really about
                </div>
            </div>
        </div>
    );
}
