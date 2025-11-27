import React, { useEffect, useRef, useState } from "react";
import { menus } from "../utilities";
import { MobileDropdown } from "./mobileDropdown";
import { DesktopDropdown } from "./desktopDropdown";



const Header = React.forwardRef((props, ref) =>  {
  
  const [open, setOpen] = useState(false);
  const firstMenuItemRef = useRef(null); // 🔑 1. Create Ref

  useEffect(() => {
    if (open) {    
      setTimeout(() => {
        firstMenuItemRef.current?.focus()
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = " ";
    }
  }, [open])
 
  return (
    <>
    <header ref={ref} className="z-130 flex items-center justify-between relative  rounded-2xl  px-4 py-2 ">
        {/* Logo: change path or import as needed */}
        <a href="/" aria-label="Go to Homepage">
          <img src="/src/assets/logo-white2.svg" alt="Company logo" className="w-52" />
        </a>
        <div className="flex items-center">
            <nav className="opacity-0 invisible lg:opacity-100 lg:visible right-10 absolute md:static transition-all duration-300 ">
                  <ul className="flex items-center gap-8 cursor-pointer">
                    {menus.map((menu, i) => (
                      <DesktopDropdown menu={menu} key={i} />
                    ))}
                  </ul>
            </nav>    
            <div className="flex items-center justify-center">
              <button className="bg-primary hidden lg:block ml-5 font-semibold text-white px-3 py-1.5 rounded-[12px]  p-3 xl:px-5 xl:py-2 hover:scale-110 cursor-pointer duration-300 transition-all">
                Log in
            </button>
            </div>          
        </div>
        {/* hamburger btn */}
        <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu-content"
              className="lg:hidden z-60 flex cursor-pointer flex-col justify-center gap-[5px] w-8 h-8 items-end ml-4"
            >
              <span
                className={`h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
                }`}
              />
              <span
                className={`h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-6"
                }`}
              />
        </button>
    </header>
    {/* mobile menu*/}
    <div 
        id="mobile-menu-content"
        aria-hidden={!open}
        className={`lg:hidden w-screen h-screen z-80 bg-white/30 backdrop-blur-md fixed inset-0 shadow-2xl
          flex flex-col justify-start pt-34 px-6 transition-all duration-800 ease-[cubic-bezier(0.645,0.045,0.355,1)]
          ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-full"
          }
        `}>
          
          <nav className="w-full" aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-2"> 
              {
                menus.map((menu, index) => {
                  const currentRef = index === 0 ? firstMenuItemRef : undefined;

                  return (
                  <MobileDropdown menu={menu} key={index}  isMenuOpened={open}
                    ref={currentRef}
                  /> 
                  )}
                )
              }
            </ul>
          </nav>
    </div>
      </>
  );
})

export default Header
