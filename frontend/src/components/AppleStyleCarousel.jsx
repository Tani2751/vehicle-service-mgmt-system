

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { section3Steps } from '../utilities';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useViewPort } from '../Hooks/useViewport';


gsap.registerPlugin(ScrollToPlugin);

const AppleStyleCarousel = ({autoplay}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef(null);
  let {width} = useViewPort()


  const slideDuration = 6000; // 5 seconds

  // Logic: Handle the auto-advance timer
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % section3Steps.length);
      }, slideDuration);
    }

    return () => clearInterval(interval);
  }, [isPlaying, slideDuration]);

  useEffect(() => {
    setIsPlaying(autoplay)
  }, [autoplay])


  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = width >= 1024 ? 1300
                      : width >= 768 ? 700
                      : 350
      const gap = 40;
      const scrollPosition = activeIndex * (cardWidth + gap);

      gsap.to(scrollContainerRef.current, {
        scrollTo: {x: scrollPosition},
        duration: 1.2,
        ease: "power3.out"
      })
    }
  }, [activeIndex])

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans ">
      
      {/* 1. Custom Animation Styles */}
      <style>{`
        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: fillProgress ${slideDuration}ms linear forwards;
        }
      `}</style>

      {/* --- Main Display Card --- */}
      <div className=' w-full overflow-hidden p-2'>
        <div 
          ref={scrollContainerRef}
          className='flex gap-10 w-full mr-60  overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth py-4'
          style={{ scrollbarWidth: 'none' }}
        >
        {section3Steps.map((step, i) => (
          <div key={i}
            className=" min-w-[350px] md:min-w-[700px] lg:min-w-[1300px] lg:translate-x-80 md:translate-x-10 bg-[#F2F1F3] border border-white/30 rounded-2xl overflow-hidden">        
            <div className='h-100 lg:h-158 md:h-100'>
              <img className='rounded-t-2xl w-full h-full object-cover' src={`${step.image}`} alt={`${step.heading}`}/>
            </div>
            <div className='p-3'>
              <h6 className='text-orange-400 text-h6 font-heading  font-semibold px-2bg-orange-400 inline'>{step.heading}</h6>
              <p className='font-sans text-[15px] mt-2 text-black/80 font-normal text-wrap'>{step.subHeading}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      
      
      

      {/* --- Controls Container --- */}
      <div className="mt-4 flex items-center justify-center gap-4 ">
        
        {/* Pagination Container */}
        <div className="bg-gray-200/20 px-2 py-2 rounded-full flex items-center gap-2 h-10 backdrop-blur-md border border-gray-400/40">
          {section3Steps.map((_, index) => {
            const isActive = activeIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  relative h-2 rounded-full overflow-hidden transition-all duration-300 ease-out
                  ${isActive ? "w-12 bg-orange-300" : "w-2 bg-orange-500 hover:bg-orange-700"}
                `}
                aria-label={`Go to slide ${index + 1}`}
              >
                
                {isActive && isPlaying && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-orange-400 animate-progress" 
                  />
                )}
                
                {isActive && !isPlaying && (
                  <div className="absolute top-0 left-0 h-full w-full bg-orange-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Play/Pause Button */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-gray-200/20 rounded-full flex items-center justify-center hover:bg-gray-200/50 transition-colors border border border-gray-400/40"
        >
          {isPlaying ? (
            <Pause size={14} className="fill-orange-400 text-orange-400" />
          ) : (
            <Play size={14} className="fill-orange-400 text-orange-400 ml-0.5" />
          )}
        </button>

      </div>
    </div>
  );
};

export default AppleStyleCarousel;