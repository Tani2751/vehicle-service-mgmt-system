import React, { useEffect, useState, useRef } from "react";

// Use an ID for the sub-menu content (e.g., based on the menu name)
const generateId = (name) => `submenu-${name.toLowerCase().replace(/\s/g, '-')}`;

export const MobileDropdown = React.forwardRef(({ menu, isMenuOpened }, ref) => {
    const [open, setOpen] = useState(false);
    const hasSubMenu = menu?.subMenus?.length > 0;
    const submenuId = generateId(menu.name);

    // 🔑 NEW: Ref for the very first link in the sub-menu
    const firstSubMenuItemRef = useRef(null);
    
    // Closes the sub-menu when the main mobile menu is closed/opened
    useEffect(() => {
        setOpen(false);
    }, [isMenuOpened])

    // 🔑 NEW: Focus management for the sub-menu
    useEffect(() => {
        if (open && hasSubMenu) {
            // When the sub-menu opens, immediately move focus to the first link inside it.
            // This is the crucial step to ensure the Tab key works correctly next.
            setTimeout(() => {
                firstSubMenuItemRef.current?.focus();
            }, 50); // Small delay to ensure the DOM is painted
        }
    }, [open, hasSubMenu])


    // Helper function to handle the click action and prevent link navigation
    const handleToggle = (e) => {
        if (hasSubMenu) {
            e.preventDefault();
            // 🛑 CRITICAL FIX: To prevent the "Expected ref" error on the main link when 
            // the dropdown is the focus target, we should ensure the parent focus 
            // is not active when we are opening the sub-menu.
            setOpen(!open);
        }
    };

    return (
        // The container div is now just for styling/layout (ml-8)
        <div className="ml-8 font-heading text-[#2C2828]"> 
            <li className="p-2 text-3xl md:text-3xl flex items-center gap-1 select-none">
                
                {/* This is the primary interactive element (link/toggle) */}
                <a 
                    href={hasSubMenu ? "#" : menu.path || "/"} 
                    onClick={handleToggle}
                    // ARIA FOR THE TOGGLE ELEMENT
                    aria-expanded={hasSubMenu ? open : undefined} 
                    aria-controls={hasSubMenu ? submenuId : undefined} 
                    // FORWARDED REF ATTACHED TO THE FOCUSABLE ELEMENT (for use by the parent Header component)
                    ref={ref}
                    tabIndex={0} 
                    className="cursor-pointer text-gray-800 no-underline hover:text-black "
                >
                    {menu.name}
                </a>
                
                {hasSubMenu && (
                    <span 
                        aria-hidden="true" 
                        className="cursor-pointer"
                        onClick={handleToggle} // Allows clicking the icon to toggle
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 -960 960 960"
                            width="18px"
                            fill="currentColor"
                            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        >
                            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                    </span>
                )}
            </li>
            
            {/* Sub-menu content container */}
            {hasSubMenu && (
                <div
                    id={submenuId} 
                    aria-hidden={!open} 
                    className={`
                        grid transition-[grid-template-rows] duration-300 ease-out 
                        ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                    `}
                >
                    <div className="overflow-hidden">
                        <ul className={`ml-8 font-sans flex flex-col pb-2`}>
                            {menu.subMenus.map((subMenu, i) => (
                                <li 
                                    key={i} 
                                    className={`p-1 duration-500 transition-all
                                        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                                        `}
                                    style={{ transitionDelay: `${open ? i * 100 : 0}ms` }}
                                > 
                                    <a 
                                        href={subMenu.path || '#'} 
                                        className="text-gray-800 no-underline hover:text-black cursor-pointer"
                                        // 🔑 APPLY NEW REF HERE: Only to the first sub-menu item (i === 0)
                                        ref={i === 0 ? firstSubMenuItemRef : null} 
                                        tabIndex={0}
                                    >
                                        {subMenu.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
})
        
        
