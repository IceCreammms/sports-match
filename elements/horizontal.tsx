"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Horizontal() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
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
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="h-[100vh] relative overflow-hidden">
      <div ref={sectionRef} className="flex absolute top-0 left-0">
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="font-[family-name:var(--font-maru-mega)] text-[220px] text-black">
            How it works?
          </div>
        </div>
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="font-[family-name:var(--font-maru-mega)] text-[220px] text-black">
            Choose ur preference
          </div>
        </div>
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="font-[family-name:var(--font-maru-mega)] text-[220px] text-black">
            Swipe
          </div>
        </div>
        <div className="w-screen h-[100vh] flex justify-center items-center flex-shrink-0">
          <div className="font-[family-name:var(--font-maru-mega)] text-[220px] text-black">
            Share it with a friend !
          </div>
        </div>
      </div>
    </section>
  );
}
