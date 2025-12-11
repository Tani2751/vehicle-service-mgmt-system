import {useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";
import brandList, { benefitsList, section3Steps } from "../utilities";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import ServiceSection from "../components/HomePage_Section/ServiceSection";
import { ProcessSection } from "../components/HomePage_Section/ProcessSection";
import TestimonialSection from "../components/HomePage_Section/TestimonialSection";
import FAQSection from "../components/HomePage_Section/FAQSection";
import { FooterSection } from "../components/HomePage_Section/FooterSection";



gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function HomePage() {

    const [smoother, setSmoother] = useState(null);

    const landingRef = useRef(null);
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);
    const btnRef = useRef(null);
    const headerRef = useRef(null);

    const heroContentRef =  useRef(null);
    const marqueRef = useRef(null);
    const twowheelerRef = useRef(null);
    const bikeContainerRef = useRef(null);
    const textSpanRef = useRef(null);

    const bookRef = useRef(null);
    const trackRef = useRef(null);
    const maintainRef = useRef(null);

    const smoothWrapperRef = useRef(null);
    const smoothContentRef = useRef(null);


    const section2Ref = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);


    const serviceRef3 = useRef({
        section: null,
        heading: null,
        subHeading: null,
    });

    console.log(serviceRef3);
    

    useGSAP(() => {

        const sm = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        smooth: 1.5,
        effects: true,
    });


        const split = SplitText.create([bookRef.current, trackRef.current, maintainRef.current],
            {
                type: "chars, words"
            }
        )

        const tl = gsap.timeline();

        gsap.set(textSpanRef.current, {
            clipPath: "inset(0 100% 0 0)", // Completely hidden from the right
        });

        tl.fromTo(
            landingRef.current,
            { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
            { 
                scaleY: 1, 
                opacity: 1, 
                duration: 2.0,
                ease: "power4.out"
            },
            0
        ) 
        
        // tl.fromTo(
        //         contentRef.current,
        //         { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
        //         { 
        //             scaleY: 1, 
        //             opacity: 1, 
        //             duration: 1.0,
        //             ease: "power2.out"
        //         },
        //         0.5
        //     )

        tl.fromTo(
            headerRef.current,
            { y:20, opacity: 0},
            { y:0, opacity: 1, duration: 0.8 },
            1.0 
        );
        
        tl.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            1.4 
        );

        tl.from(split.chars, {
            y:20,
            opacity: 0,
            color: "#FF8904",
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in"
        }, 1.5)

        tl.fromTo(
            subheadingRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            1.6 
        );

        tl.fromTo(
            btnRef.current,
            {opacity:0, scale:0},
            {opacity:1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
            1.8
        );

        tl.fromTo(
            marqueRef.current,
            {opacity:0, y:30},
            {opacity:1, y:0, duration: 0.4, ease: "back.out(1.7)" },
            2.0
        );

        tl.to(bikeContainerRef.current, {
            left: "105%", // Move bike to the end of the container
            duration: 1.6,
            ease: "power2.out"
        }, "-=0.6").to(textSpanRef.current, {
            clipPath: "inset(0 0% 0 0)",
            color: "#FF8904",   // Fully reveal text
            duration: 1.6,
            ease: "power2.out"
        }, "<")

        
        setSmoother(sm);
        return () => tl.kill();
        
    },{ scope: smoothWrapperRef });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {


            gsap.fromTo(landingRef.current,
                {scale: 1, opacity: 1},
                {
                    scale: 0.85,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: landingRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            )

            gsap.fromTo(section2Ref.current, 
                { scale: 0.85, opacity: 0},
                {
                    scale: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section2Ref.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            )

            gsap.from([titleRef.current, textRef.current], {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                trigger: section2Ref.current,
                start: "top 35%",
                },
            });

            gsap.from(cardsRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                trigger: section2Ref.current,
                start: "top 30%",
                end: "center 30%",
                scrub: true,
                },
            });

            gsap.fromTo(section2Ref.current,
                {scale: 1, opacity: 1},
                {
                    scale: 0.85,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: section2Ref.current.section,
                        start: "bottom 50%",
                        end: "bottom top",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            )

            gsap.fromTo(serviceRef3.current.section, 
                { scale: 0.85, opacity: 0},
                {
                    scale: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: serviceRef3.current.section,
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            )


            gsap.from([serviceRef3.current.heading, serviceRef3.current.subHeading], {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                trigger: section2Ref.current,
                start: "top 35%",
                },
            });

            
        }, section2Ref);
        return () => ctx.revert();
    }, []);

 
    return (
        <>
            <div className="mx-10 pt-5 min-w-[360px] md:min-w-[630px] lg:min-w-[930px] xl:w-full xl:pl-10 ">
                <Header ref={headerRef} smoother={smoother} smoothWrapper={smoothWrapperRef}/>                     
            </div>

            <div id="smooth-wrapper" ref={smoothWrapperRef} className="overflow-x-hidden">
                <div id="smooth-content" ref={smoothContentRef}>

                    <main>
                        <section ref={landingRef} className="min-h-screen  bg-cover  bg-center flex flex-col justify-end items-center overflow-hidden"
                            style={{ backgroundImage: `url("/src/assets/garage.jpg")` }}
                        >   
                            {/* overlay */}
                            <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-10 "/>
                            <div ref={heroContentRef} className=" flex items-center justify-center z-60 mb-20 lg:mb-0">
                                <div className="font-heading ml-4 py-10 md:py-16 lg:py-24 lg:px-8 xl:px-4 flex flex-col items-center ">
                                    <div>
                                        <h1 ref={headingRef} className=" text-white font-bold text-center text-5xl md:text-6xl lg:text-8xl xl:text-8xl">
                                            Simplify your{" "}
                                            <span ref={twowheelerRef} className="relative px-2 inline-block align-bottom overflow-hidden">                         
                                                <span className="block text-orange-400" ref={textSpanRef}>
                                                    two-wheeler service
                                                </span>
                                                <div 
                                                    ref={bikeContainerRef}
                                                    className="w-30 ml-4 lg:ml-8 md:w-50 lg:w-70 absolute top-1/2 left-0 z-0 -translate-x-1/2 
                                                    -translate-y-1/2 pointer-events-none">
                                                    <img src="src/assets/motorcycle.png"/>
                                                </div>
                                            </span>
                                            <br className="lg:hidden" />
                                            experience
                                        </h1>
                                    </div>
                                    <div className="w-100 md:w-[400px] xl:w-full">
                                        <p ref={subheadingRef} className=" text-white xl:mt-10 mt-8 text-regularNormal font-normal xl:font-medium lg:text-center xl:text-center lg:text-[14px] xl:text-mediumNormal">
                                            <span ref={bookRef} className="font-bold text-xl text-[#FF8904]"> Book</span>, 
                                            <span ref={trackRef} className="font-bold text-xl text-[#FF8904]"> Track</span>, and 
                                            <span ref={maintainRef} className="font-bold text-xl text-[#FF8904]"> Maintain </span> 
                                            your bike with ease. Get professional service at your fingertips, anytime and anywhere.                                 
                                        </p>
                                    </div>
                                    <div ref={btnRef}>
                                        <button className="bg-orange-400  font-bold xl:mt-10 mt-8 px-3 py-1.5 xl:px-5 xl:py-2 rounded-[12px] xl:text-xl text-white hover:scale-110 cursor-pointer duration-300 transition-all">
                                            Book Now
                                        </button>
                                    </div>            
                                </div>
                            </div> 

                            <div ref={marqueRef} className="z-70 relative w-full min-h-20 overflow-hidden flex mb-20 fade-mask">
                                <div className="flex infinite"
                                style={{width:"max-content"}}
                                >
                                    <div className="inline-flex shrink-0">
                                        <ul className="flex items-center">
                                            {brandList.map((brand, i) => (
                                                <li key={i} className="text-white text-lg lg:text-xl text-nowrap mr-15  lg:mr-20">
                                                    {brand}
                                                </li>
                                            ))}
                                        </ul>  
                                    </div>
                                    <div className="inline-flex flex-shrink: 0;">
                                        <ul className="flex items-center">
                                            {brandList.map((brand, i) => (
                                                <li key={i} className="text-white text-lg lg:text-xl text-nowrap mr-15  lg:mr-20">
                                                    {brand}
                                                </li>
                                            ))}
                                        </ul>  
                                    </div>
                                </div>                                      
                            </div>             
                        </section>

                        <section className="min-h-screen px-16 py-22 flex items-center justify-center bg-white">
                            
                            <div 
                                ref={section2Ref}
                                className="bg-[#F2F1F3] w-356 flex flex-col items-center justify-center p-6 rounded-[32px]">

                                <div className="flex flex-col items-center justify-center">
                                    <h className="font-heading rounded-xl bg-orange-400 tracking-wide text-white px-2 py-0.5 font-semibold">
                                    Benefits
                                    </h>
                                    <h2  ref={titleRef} className="text-center text-h4 lg:text-h2 font-bold font-heading leading-10 lg:leading-14 mt-6">
                                        Why riders trust MotoCare for bike maintenance ?
                                    </h2>
                                    <p ref={textRef} className="text-center text-sm lg:text-regularNormal  mt-4 font-sans">
                                        Experience hassle-free bike servicing with a platform designed for modern riders. We simplify maintenance through smart technology and customer-focused solutions.
                                    </p>
                                </div>

                                <div className="max-w-5xl grid sm:grid-cols-1 md:grid-cols-2 p-4 mt-4 gap-6 place-items-center">
                                    {benefitsList.map((benefit, i) => (
                                        <div key={i}
                                            className="flex bg-orange-400/60  rounded-2xl flex-col justify-center items-center p-6 mt-2 shadow-lg"
                                            ref={(el) => (cardsRef.current[i] = el)}
                                        >
                                            <div className="w-40 h-30 ">
                                                <img src={benefit.image} className="w-full h-full object-contain" />
                                            </div>
                                            <h6 className="font-heading font-semibold mb-2 text-nowrap">
                                                {benefit.heading}
                                            </h6>
                                            <p className="text-center font-sans text-[12px] lg:text-[14px]">
                                                {benefit.subHeading}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <button className="bg-black mr-4 font-semibold xl:mt-10 mt-8 px-3 py-1.5 xl:px-5 xl:py-2 rounded-[12px] xl:text-xl text-white hover:scale-110 cursor-pointer duration-300 transition-all">
                                        Learn more
                                    </button>

                                    <button className="inline-flex items-center font-semibold xl:mt-10 mt-8 px-3 py-1.5 xl:px-5 xl:py-2 rounded-[12px] xl:text-xl text-orange-400 hover:scale-110 cursor-pointer duration-300 transition-all">
                                        Explore 
                                        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FF8904"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                                    </button>
                                </div>
                                
                            </div>
                            
                        </section>

                        <ServiceSection ref={serviceRef3} />

                        <ProcessSection />

                        <TestimonialSection />

                        <FAQSection />

                        <FooterSection />


                    </main> 

                </div>
            </div>
        </>

        
    )
}


export default HomePage