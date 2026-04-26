import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Button";
import { process } from "../../utilities";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const processRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

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
      const videoZoom = isDesktop ? 5.7 : isTablet ? 3 : 2;
      const headingZoom = isDesktop ? 40 : isTablet ? 26 : 12;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 20%" : "top 0%",
          end: "bottom top",
          markers: true,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
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
        "-=0.3"
      );
      // 3
      tl.to(videoRef.current, {
        autoAlpha: 0,
        duration: 0.3
      });
      // 4
      tl.fromTo(
        processRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      tl.from(itemsRef.current, {
        opacity:0,
        y: 20,
        stagger: 0.08,
        duration: 0.4,
      })

      return () => tl.kill();
    }
  );

  return () => mm.revert(); // cleanup matchMedia
}, []);


  return (
    <>
    
    <section ref={containerRef} className=" relative  w-full h-[200vh] lg:h-[160vh]"> 

        {/* VIDEO + OVERLAY */}
        <div ref={videoRef} className="absolute  inset-0 w-full h-[70vh] sm:h-[80vh] lg:h-screen rounded-2xl overflow-hidden">
          
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/duxgfwaef/image/upload/v1765632714/Gemini_Generated_Image_tj7lnitj7lnitj7l_-_Copy_sveixq.jpg')"
            }}
          />

          {/* DARK OVERLAY */}
          {/* <div className="absolute inset-0 bg-black/20 rounded-[32px]" /> */}

          {/* TEXT OVER VIDEO */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
            <h6 className="font-heading rounded-xl bg-orange-400 text-white px-2 py-0.5">Process</h6>
            <h2 ref={headingRef} className="text-nowrap lg:text-7xl text-white font-bold mt-6">How bike service works</h2>
            <p className=" text-center text-h6 text-white mt-1">Simple steps to get your two-wheeler serviced quickly</p>
            <Button name="Book Now" color="primary" textColor="white" />
          </div>
        </div>

      {/* PROCESS LIST DIV (ANIMATED) */}
      <div
        ref={processRef}
        className="relative  flex items-center justify-center bg- text-black opacity-0"
      >
        <div className=" py-8 bg-[#F2F1F3] md:mt-0 px-6 rounded-2xl flex flex-col items-baseline">
          <h2 className="text-h4 lg:text-h3 font-bold mb-4 ml-3">Six steps to services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {process.map((pro, i) => (
              <div   
                  key={i} 
                  ref={(el) => itemsRef.current[i] = el}
                  className="p-4 max-w-[390px] md:max-w-[500px] bg-white/60 will-change-transform transform-gpus  backdrop-blur-lg rounded-2xl inline-flex flex-col items-center justify-center ">

                <div className="flex items-baseline p-1">
                  {pro.icon}
                </div>
                <div className="w-3/3 mt-4">
                  <h3 className="text-2xl md:text-2xl font-semibold lg:text-2xl px-2 inline">
                      {pro.heading}
                  </h3>
                    <p className="font-sans text-[12px] md:text-[12px] mt-2 lg:text-regularNormal ml-6">
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
