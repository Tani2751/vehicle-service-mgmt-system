import {useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "../components/Header";
import brandList from "../utilities";

function HomePage() {
    const landingRef = useRef(null);
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);
    const btnRef = useRef(null);
    const headerRef = useRef(null);

    const contentRef =  useRef(null);
    const marqueRef = useRef(null);
    const twowheelerRef = useRef(null);
    const bikeContainerRef = useRef(null);
    const textSpanRef = useRef(null);

    const bookRef = useRef(null);
    const trackRef = useRef(null);
    const maintainRef = useRef(null);



    useEffect(() => {

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
            left: "100%", // Move bike to the end of the container
            duration: 2,
            ease: "power2.out"
        }, "-=0.6").to(textSpanRef.current, {
            clipPath: "inset(0 0% 0 0)",
            color: "#FF8904",   // Fully reveal text
            duration: 2,
            ease: "power2.out"
        }, "<").to(bikeContainerRef.current, {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power2.out"
        }, 3.0)

        tl.to([bookRef.current, trackRef.current, maintainRef.current ], {
            fontFamily: "Noto Sans",
            color: "#FF8904",
            duration: 0.2,
            stagger: 0.3,
            ease: "power2.in"
        }, 3.3)

        return () => tl.kill();
     
    }, []);


    return (
        <main>
            <section ref={landingRef} className="min-h-screen  bg-cover  bg-center flex flex-col justify-between items-center"
                style={{ backgroundImage: `url("/src/assets/garage.jpg")` }}
            >   
                {/* overlay */}
                <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-10"/>
                <div className="mx-10 pt-5 min-w-[360px] md:min-w-[630px] lg:min-w-[930px] xl:w-full xl:pl-10 xl:pr-10">
                    <Header ref={headerRef} />                     
                </div>
   
                <div ref={contentRef} className=" flex items-center relative justify-center z-60">
                    <div className="font-heading ml-4 py-10 md:py-16 lg:py-24 px-4 lg:px-8 xl:px-10 flex flex-col items-baseline lg:items-center xl:items-center">
                        <div>
                            <h1 ref={headingRef} className=" text-white font-bold xl:text-center lg:text-center text-4xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl">
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
                            <p ref={subheadingRef} className=" text-white xl:mt-10 mt-8 text-[14px] font-medium xl:font-medium lg:text-center xl:text-center sm:text-[12px] md:text-[14px] lg:text-[14px] xl:text-[18px]">
                                <span ref={bookRef} className="font-bold text-xl"> Book </span>, 
                                <span ref={trackRef} className="font-bold text-xl"> Track </span>, and 
                                <span ref={maintainRef} className="font-bold text-xl"> Maintain </span> 
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

                <div ref={marqueRef} className="z-70 relative w-full min-h-20 overflow-hidden flex mb-20">
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
            <section className="min-h-screen">

            </section>
         </main> 
    )
}


export default HomePage