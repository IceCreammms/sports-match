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

      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: () => `-${sectionRef.current.offsetWidth - window.innerWidth}px`,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: true,
            pin: true,
          },
        }
      );

      return () => {
        pin.kill();
      };
    };

    initGSAP();
  }, []);

  return (
    <section ref={triggerRef} className="h-[100vh] relative overflow-hidden">
      <div ref={sectionRef} className="flex absolute top-0 left-0 w-fit">
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="font-[family-name:var(--font-maru-mega)] text-[220px] bg-clip-text text-transparent bg-[url('/default.png')] bg-cover bg-center">
            How it works?
          </div>
        </div>
        <p className="w-fit h-[100vh] flex items-center line-clamp-1">
          <span className="font-[family-name:var(--font-maru-mega)] text-[220px] bg-clip-text text-transparent bg-[url('/default.png')] bg-cover bg-center whitespace-nowrap">Choose ur preference </span>
          <span className="font-[family-name:var(--font-maru-mega)] text-[220px] bg-clip-text text-transparent bg-[url('/default.png')] bg-cover bg-center whitespace-nowrap ml-[200px]">Swipe </span>
          <span className="font-[family-name:var(--font-maru-mega)] text-[220px] bg-clip-text text-transparent bg-[url('/default.png')] bg-cover bg-center whitespace-nowrap ml-[200px] mr-[10vw]">Share it with a friend !</span>
        </p>
        
      </div>
    </section>
  );
}
