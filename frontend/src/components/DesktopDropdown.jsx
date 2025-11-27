import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP} from "@gsap/react";


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
      <button
        type="button"
        onKeyDown={handleKeyDown}        
        aria-haspopup="true" // Tells screen readers it controls a popup
        aria-expanded={isOpen} // Tells screen readers the current state
        className="cursor-pointer text-regularNormal py-2 flex items-center gap-1 font-heading font-semibold text-white">
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
      </button>
      
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
          <div className=" min-w-[400px]  max-w-[800px] p-3 grid md:hidden lg:grid lg:grid-cols-2 lg:gap-4">
            {menu.subMenus?.map((subMenu, i) => (              
                isMore ? 
                (
                  <a
                    key={i}
                    href={subMenu.url || "#"}
                    role="menuitem"
                    onKeyDown={handleKeyDown}  
                    className="menu-item  no-underline flex text-black hover:scale-95 hover:bg-black hover:text-white duration-300 transition-all cursor-pointer flex-col items-center justify-between bg-[#F2F1F3] rounded-xl p-4 ">
                    <div className="w-30 h-30 lg:hidden xl:block">
                        <img
                          src={subMenu.image}
                          className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[14px]  font-bold block`}>{subMenu.name}</span>
                      <span className={`text-[12px]  font-semibold block`}>{subMenu.subHeading}</span>
                    </div>
                  </a>
                )
                :
                <div
                key={i}
                className={`menu-item group/card ${i === 3 ? "p-1 hover:scale-100": ""}
                  rounded-xl  transform hover:scale-94 duration-300 transition-all
                  flex flex-col gap-4 items-center justify-between  lg:justify-end cursor-pointer
                   w-full lg:min-w-20 lg:flex-row`}
                style={{ backgroundColor: subMenu.color}}
              >
              {
                i === 3 ?
                  (
                    <div className="flex flex-col gap-3 font-heading w-full">
                      {
                        subMenu?.otherfeatures?.map((exSer, j) => (
                          <a 
                            href={subMenu.url || "#"}
                            role="menuitem"
                            onKeyDown={handleKeyDown} 
                            className="no-underline text-black bg-[#F2F1F3] rounded-xl p-4 font-bold group/x 
                            flex gap-4  justify-end cursor-pointer flex-1
                              shadow-sm transform hover:scale-94 duration-300 transition-all">
                            <div className="text-xl mb-1">
                              {exSer.icon}
                            </div>
                            <div key={j} className="text-l">
                              {exSer.name}
                              <div className="flex items-center">
                                <span className={`mr-2 text-nowrap font-semibold text-[12px] ${subMenu.text ? "text-black" : "text-white"} inline`}>
                                Know more                    
                                </span>
                                <div className={` flex items-center duration-300 transition-all  group-hover/x:translate-x-1`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill={`${subMenu.text ? "#000000" : "white"}`}><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                                </div>
                              </div>   
                            </div>
                          </a>
                        ))
                      }
                    </div>
                  )
                  :
                  (
                    <a 
                        href={subMenu.url || "#"}
                        role="menuitem"
                        onKeyDown={handleKeyDown} 
                        className="no-underline p-4 flex flex-col items-center lg:items-end">
                      <div className="w-30 h-30 mb-2 lg:hidden xl:block">
                        <img
                          src={subMenu.image}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className={` font-heading font-bold lg:flex lg:flex-col lg:items-baseline lg:justify-end lg:mt-2 xl:mt-0`}>
                        <span className={` xl:text-l lg:text-regularNormal ${subMenu.text ? "text-black" : "text-white"} block`}>{subMenu.name}</span>
                        {isPrice && <span className={` xl:text-l lg:text-regularNormal ${subMenu.text ? "text-black" : "text-white"} block`}>{subMenu.price}</span>}
                        <div className="flex items-center">
                          <span className={`mr-2 font-semibold text-[12px] ${subMenu.text ? "text-black" : "text-white"} inline`}>
                          Know more                    
                          </span>
                          <div className={` flex items-center duration-300 transition-all  group-hover/card:translate-x-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill={`${subMenu.text ? "#000000" : "white"}`}><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                          </div>
                        </div>                  
                      </div>
                    </a>
                  )
              }
                </div>  
            ))}
          </div>
        </div>
      </>
      )}
      
    </div>
  );
}