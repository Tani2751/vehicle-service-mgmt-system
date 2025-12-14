
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

import AppleStyleCarousel from "../AppleStyleCarousel";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = React.forwardRef((props, ref)  => {
 
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);


  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.3
      }
    );

    if(sectionRef.current) {
      observer.observe(sectionRef.current)
    };

    return () => observer.disconnect();
  }, [])


 

  return (
    <section  className="flex flex-col items-center justify-center  p-6">
      <div className="flex">
        <div className="flex flex-col justify-center items-center p-4">
        <p className="font-heading rounded-xl bg-orange-400 font-semibold text-white px-2 py-0.5">Services</p>
        <h2 className=" text-nowrap lg:text-5xl font-bold font-heading text-h5 mt-6">Digital bike care reimagined</h2>
        <p className=" text-center text-[14px] font-sans lg:text-regularNormal mt-4">We transform motorcycle maintenance into a precise, transparent experience. Every touchpoint is engineered to deliver professional care with minimal friction.</p>
        </div>
      </div>
      
      <div className="w-full p-4" ref={sectionRef}>
        <AppleStyleCarousel autoplay={inView} />
      </div>
      
    </section>
  )
})
export default ServiceSection
