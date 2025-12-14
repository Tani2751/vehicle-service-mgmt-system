import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import Button from "../Button";
import { process } from "../../utilities";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const processRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([])

  useLayoutEffect(() => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      // BREAKPOINTS
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 640px) and (max-width: 1023px)",
      isMobile: "(max-width: 639px)"
    },
    (context) => {
      let { isDesktop, isTablet, isMobile } = context.conditions;

      // 🎯 SCALE VALUES PER DEVICE
      const videoZoom = isDesktop ? 6.7 : isTablet ? 4.5 : 2.8;
      const headingZoom = isDesktop ? 67 : isTablet ? 50 : 35;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        }
      });

      // 1️⃣ VIDEO ZOOM
      tl.fromTo(
        videoRef.current,
        { scale: 0.8, autoAlpha: 1 },
        {autoAlpha: 0.5, scale: videoZoom, ease: "none", duration: 1 }
      );

      // 2️⃣ HEADING ZOOM
      tl.fromTo(
        headingRef.current,
        { scale: 0.7 },
        { scale: headingZoom, ease: "none", duration: 1, delay: 0.1 },
        "<" // run in parallel
      );

      // 3️⃣ PROCESS DIV REVEAL
      tl.fromTo(
        processRef.current,
        { opacity: 1, scale: 0 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.2"
      );

      tl.to(
        videoRef.current,
        {autoAlpha:0}
      );
      
      tl.from(itemsRef.current, {
        opacity:0,
        y: 50,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
      })

      return () => tl.kill();
    }
  );

  return () => mm.revert(); // cleanup matchMedia
}, []);


  return (
    <>
    
    <section ref={containerRef} className=" lg:overflow-hidden relative w-full h-screen mb-30">

        {/* VIDEO + OVERLAY */}
        <div ref={videoRef} className="relative w-full h-screen opacity-0">
          <video
            className="w-full h-full object-cover rounded-[32px]"
            src="https://res.cloudinary.com/duxgfwaef/video/upload/v1765632966/Two_Wheeler_Servicing_Video_Generated_r9poab.mp4"
            autoPlay
            muted
            playsInline
            loop

          />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20 rounded-[32px]" />

        {/* TEXT OVER VIDEO */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
          <h6 className="font-heading rounded-xl bg-orange-400 text-white px-2 py-0.5">Process</h6>
          <h2 ref={headingRef} className=" text-nowrap lg:text-7xl text-white font-bold mt-6">How bike service works</h2>
          <p className=" text-center text-h6 text-white mt-4">Simple steps to get your two-wheeler serviced quickly</p>
          <Button name="Book Now" color="primary" textColor="white" />
        </div>
      </div>

      {/* PROCESS LIST DIV (ANIMATED) */}
      <div
        ref={processRef}
        className="absolute top-40 md:top-0  left-0 w-full min-h-screen flex items-center justify-center bg-white text-black opacity-0"
      >
        <div className="py-8 bg-[#F2F1F3] px-6 rounded-2xl flex flex-col items-baseline">
          <h2 className="text-h4 lg:text-h3 font-bold mb-4 ml-3">Six steps to services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 p-4 ">
            {process.map((pro, i) => (
              <div   
                  key={i} 
                  ref={(el) => itemsRef.current[i] = el}
                  className="p-4 max-w-[390px] md:max-w-[500px] bg-white backdrop-blur-lg rounded-2xl inline-flex flex-col items-center justify-center gap-4">

                <div className="flex items-baseline p-2 text-orange-400">
                  {pro.icon}
                </div>
                <div className="w-3/3 mt-4">
                  <h3 className="text-2xl  md:text-h6 font-semibold lg:text-h5 px-2 inline">
                      {pro.heading}
                  </h3>
                    <p className="font-sans text-[14px] md:text-[14px] mt-2 lg:text-regularNormal ml-6">
                      {pro.description}
                    </p>
                </div>              
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <div className="h-[110vh] md:h-[5vh] lg:hidden"></div>
     </>
  );
}
