import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

import { section3Steps } from "../../utilities";
import Button from "../Button";
import { useViewPort } from "../../Hooks/useViewport";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = React.forwardRef((props, ref)  => {
  const { width } = useViewPort();

  if (!ref.current) ref.current = {};
  const isSize = width > 1536 ? true : false;
  const pinRef = useRef(null);
  const slideRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current;

      /** ---------------------------------------------------------
       *  INITIAL STATES
       * --------------------------------------------------------- **/
      slides.forEach((slide, i) => {
        const img = slide.querySelector(".slide-image");
        const text = slide.querySelector(".slide-text");

        gsap.set(img, { autoAlpha: 0, y: 50, scale: 0.92 });
        gsap.set(text, { autoAlpha: 0, y: 80 });

        if (i === 0) {
          gsap.set(img, { autoAlpha: 1, y: 0, scale: 1 });
          gsap.set(text, { autoAlpha: 1, y: 0 });
        }
      });

      /** ---------------------------------------------------------
       *  MASTER SCROLL TIMELINE
       * --------------------------------------------------------- **/
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top 8%",
          end: "+=" + slides.length * 500,
          scrub: 1.2,
          pin: true,
        },
      });

      /** ---------------------------------------------------------
       *  LOOP : transition slide-by-slide
       * --------------------------------------------------------- **/
      slides.forEach((slide, i) => {
        if (i === 0) return;

        const prev = slides[i - 1];
        const prevImg = prev.querySelector(".slide-image");
        const prevText = prev.querySelector(".slide-text");

        const currImg = slide.querySelector(".slide-image");
        const currText = slide.querySelector(".slide-text");

        /** ---------------------------------------------------------
         *  1. PREVIOUS — APPLE EXIT UP
         * --------------------------------------------------------- **/
        tl.to(prevImg, {
          autoAlpha: 0,
          y: -80,
          scale: 0.92,
          ease: "power3.in",
          duration: 0.7,
        }, i);

        tl.to(prevText, {
          autoAlpha: 0,
          y: -80,
          ease: "power2.in",
          duration: 0.5,
        }, i);

        /** ---------------------------------------------------------
         *  2. CURRENT — APPLE ENTER FROM BOTTOM
         * --------------------------------------------------------- **/
        tl.fromTo(
          currImg,
          { autoAlpha: 0, y: 80, scale: 0.95 },
          {
            autoAlpha: 1,

            // Apple "overshoot & settle"
            y: 0,
            scale: 1,
            ease: "back.out(1.7)", 
            duration: 1.1,
          },
          i + 0.15
        );

        /** ---------------------------------------------------------
         *  3. CURRENT TEXT — SMOOTH LIFT UP
         * --------------------------------------------------------- **/
        tl.fromTo(
          currText,
          { autoAlpha: 0, y: 380 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.9,
          },
          i + 0.25
        );
      });
    }, pinRef);

    return () => ctx.revert();
  }, [isSize]);

  return (
    <section ref={ (el) => ref.current.section = el} className="px-10">
      {/* STATIC TOP PORTION */}
        <div ref={ !isSize ? pinRef : null}  className="max-w-356 bg-[#F2F1F3] mx-auto rounded-[32px] p-6">
            <div className="text-center flex mt-12  items-center flex-col">
                    <h className="font-heading rounded-xl bg-orange-400 tracking-wide text-white px-2 py-0.5 font-semibold">Services</h>
                    <h2 ref={ (el) => ref.current.heading = el} className=" text-h4 lg:text-h2 font-bold font-heading leading-10 lg:leading-14 mt-6">
                        Your bike deserves next-gen care.
                    </h2>
                    <p ref={ (el) => ref.current.subHeading = el} className=" text-sm lg:text-regularNormal px-6 mt-4 font-sans">
                        Say goodbye to guesswork—our digital-first approach brings precision, clarity, and professional service to every ride.
                    </p> 
                    <div>
                        <Button name={"Explore"} color={'primary'} textColor={'white'}/>
                        <Button name={"Details"} isArrow={true}/>
                    </div>                 
            </div>
            {/* PINNED SLIDER */}
            <div ref={ isSize ? pinRef : null} className="relative h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[50vh] 2xl:h-[85vh] overflow-hidden mt-12 2xl:mt-22 rounded-xl">
                {section3Steps.map((step, i) => (
                  <>
                  
                <div
                    key={i} 
                    ref={(el) => (slideRefs.current[i] = el)}
                    className="absolute inset-0 w-full flex flex-col xl:flex-row items-center 2xl:items-baseline justify-baseline gap-8 p-4"
                >
                    <div className="slide-image w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] 2xl:relative xl:w-4/5 2xl:w-full  rounded-2xl  flex flex-col items-center justify-center">
                      <img src={step.image} className="w-full object-contain rounded-2xl z-5 "/>
                      <div className="hidden w-full lg:block 2xl:absolute 2xl:inset-0 overflow-hidden xl:bg-black/40 rounded-2xl z-10"></div>
                    </div>
                    <div className="w-full xl:w-2/3 slide-text 2xl:absolute 2xl:bottom-10 p-4">
                        <h3 className="font-heading text-center text-xl md:text-2xl inline lg:text-2xl xl:text-3xl font-bold mb-4 p-2 text-black  bg-white 2xl:bg-gray-300/30 xl:text-orange-400 rounded-2xl">{step.heading}</h3>
                        <p className=" font-sans 2xl:text-white text-[14px] mt-6  lg:text-regularNormal">{step.subHeading}</p> 
                    </div>
                </div>
                </>
                ))}
            </div>
            
      </div>
    </section>

  );
})

export default ServiceSection
