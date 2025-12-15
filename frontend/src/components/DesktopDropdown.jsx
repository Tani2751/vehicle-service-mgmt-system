import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP} from "@gsap/react";
import { Link, NavLink } from "react-router-dom";


export function DesktopDropdown({ menu, i }) {
    const [isOpen, setIsOpen] = useState(false);
    // const [isHovering, setIsHovering] = useState(false);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    const hasSubMenu = menu?.subMenus?.length > 0;
    const isPrice = menu?.name === "Plans";
    const isMore = menu.name === "More";
    const closeMenu = () => setIsOpen(false);

    const handleKeyDown = (event) => {
        if(!hasSubMenu) return;

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                setIsOpen(prev => !prev);
                break;
            case 'Escape':
                // Close the menu on Escape
                closeMenu();
                // Move focus back to the button that opened it
                dropdownRef.current.querySelector('button').focus();
                break;
        
            default:
                break;
        }
    };


    useGSAP(() => {
      if (!menuRef.current) return;

      if (isOpen) {

          gsap.killTweensOf(menuRef.current);
          gsap.killTweensOf(".menu-item");

          gsap.to(menuRef.current , {
            autoAlpha: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto"
          })
      } else {
        gsap.to(menuRef.current,{
          autoAlpha: 0,
          scale: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto"
        })
      }
    }, {
      scope: dropdownRef,
      dependencies: [isOpen]
    })

  // Click outside to close the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
        // If the ref exists and the click is NOT inside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeMenu();
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
  
  return (
    <div 
        onMouseEnter={() => hasSubMenu && setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative group/menu" key={i} ref={dropdownRef}>
      <NavLink
        to={"/plans"}     
        onKeyDown={handleKeyDown}        
        aria-haspopup="true" // Tells screen readers it controls a popup
        aria-expanded={isOpen} // Tells screen readers the current state
        className="cursor-pointer text-regularNormal py-2 flex items-center gap-1 font-heading font-semibold text-black">
        {menu.name}
        {hasSubMenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
            className={`transition-transform duration-200 group-hover/menu:rotate-180`}
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        )}
      </NavLink>
      
      {hasSubMenu && (
      <>
        {/*---Blur Backdrop overlay---*/}
        {/* <div 
            className="
              fixed inset-0 w-screen h-screen z-30
              bg-black/20 backdrop-blur-xs
              opacity-0 invisible 
              group-hover/menu:opacity-100 group-hover/menu:visible
              transition-all duration-300 ease-out
              pointer-events-none
            "
          /> */}
        <div
            ref={menuRef}
            role="menu"
            className="opacity-0 invisible translate-y-2 scale-95
                        absolute top-full right-0 z-50
                        bg-white shadow-lg rounded-2xl p-3
                        flex flex-col gap-1 items-basline 
                        xl:flex origin-top-right"
        >
          <h7 className="font-heading font-bold ml-5 mt-6 pb-0 mb-0">
            {menu.heading}:
          </h7>
          <div className=" min-w-[400px] max-w-[800px] p-3 grid md:hidden lg:grid lg:grid-cols-2 lg:gap-4">
            {menu.subMenus?.map((subMenu, i) => (             

              <Link key={i} 
                  to={`${subMenu.Link}`}
                  className="no-underline text-black">
                  <div className="bg-[#F2F1F3] rounded-2xl p-3 flex flex-col items-center justify-center gap-6 
                    hover:bg-orange-400/70 transition-all duration-200 hover:text-white
                  ">
                      <div>
                    <img className="size-20" src={`${subMenu.image}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{subMenu.name}</p>
                  </div>    
                  </div>                                
              </Link>
            ))}
          </div>
        </div>
      </>
      )}
      
    </div>
  );
}