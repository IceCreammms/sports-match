"use client";

import { useEffect, useRef } from "react";

export default function Horizontal() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/dist/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(sectionRef.current, {
        translateX: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.5,
          pin: true,
          snap: {
            snapTo: 1 / 3,
            duration: 0.1,
          },
        },
      });
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="h-[100vh] relative overflow-hidden bg-white"
    >
      <div ref={sectionRef} className="flex absolute top-0 left-0">
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="relative">
            <div className="font-[family-name:var(--font-maru-mega)] text-[220px] absolute -right-2 top-2 text-black">
              How it works?
            </div>
            <div
              className="font-[family-name:var(--font-maru-mega)] text-[220px] relative"
              style={{
                backgroundImage: "url(/default.png)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "2px black",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              How it works?
            </div>
          </div>
        </div>

        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="relative">
            <div className="font-[family-name:var(--font-maru-mega)] text-[220px] absolute -right-2 top-2 text-black">
              Choose ur preference
            </div>
            <div
              className="font-[family-name:var(--font-maru-mega)] text-[220px] relative"
              style={{
                backgroundImage: "url(/default.png)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "2px black",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Choose ur preference
            </div>
          </div>
        </div>

        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="relative">
            <div className="font-[family-name:var(--font-maru-mega)] text-[220px] absolute -right-2 top-2 text-black">
              Swipe
            </div>
            <div
              className="font-[family-name:var(--font-maru-mega)] text-[220px] relative"
              style={{
                backgroundImage: "url(/default.png)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "2px black",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Swipe
            </div>
          </div>
        </div>

        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="relative">
            <div className="font-[family-name:var(--font-maru-mega)] text-[180px] absolute -right-2 top-2 text-black">
              Share it with a friend !
            </div>
            <div
              className="font-[family-name:var(--font-maru-mega)] text-[180px] relative"
              style={{
                backgroundImage: "url(/default.png)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "2px black",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Share it with a friend !
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
