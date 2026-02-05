
import  { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";



const positionClasses = {
  top: "bottom-full mb-2 -left-30",
  bottom: "top-full mt-2 -left-30",
  left: "right-full mr-2 top-10",
  right: "left-full ml-2 top-0",
};;

const Dropdown = ({
  trigger,
  items,
  position = "bottom",
  onSelect,
  variant= "",
  underline=false
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const ref = useRef();
  const {data, status, error} = useSelector((state) => state?.user);
  const [computedPosition, setComputedPosition] = useState(position);


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    if(status === "loading") <div>Loading...</div>
      const userInfo = data?.data?.userData
      const handleSelect = (item) => {
        if (onSelect) onSelect(item);
        setOpen(false);
    };

  useEffect(() => {
    if (!open) return;

    const triggerEl = triggerRef.current;
    const dropdownEl = dropdownRef.current;

    if (!triggerEl || !dropdownEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    
    
    // const dropdownHeight = dropdownEl.offsetHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const spaceLeft = viewportWidth - triggerRect.left;
    const spaceRight = triggerRect.right;

    // console.log(triggerRect, dropdownHeight, viewportHeight,spaceBelow, spaceAbove, viewportWidth );

    // If preferred bottom but not enough space → move to top
    if (position === "bottom" && spaceAbove > spaceBelow) {
      setComputedPosition("top");
    } else if (position === "left" && spaceLeft > spaceRight) {
      setComputedPosition("right");
    } else {
      setComputedPosition(position);
    }
  }, [open, position]);

  
  return (
    <div className="relative inline-block" ref={ref}>
      <div ref={triggerRef} onClick={() => setOpen((prev) => !prev)}>
        {trigger}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`absolute z-120 min-w-40 rounded-xl  bg-white shadow-md ${positionClasses[computedPosition]}`}
        >
            { variant === "profile" ? 
                <div className="flex justify-between rounded-xl items-center  bg-white ">
                    <div className="flex p-3">
                            <div className="font-bold rounded-full flex items-center justify-center h-10 w-10 bg-gray-300">
                              {`${userInfo.username.slice(0,1).toUpperCase()}`}
                            </div>
                            <div className="flex flex-col ml-2">
                            <span className="font-sans text-[14px]">{userInfo?.username}</span>
                            <span className="font-sans text-[14px]">{userInfo?.email}</span>
                            </div>
                    </div>
                </div> : "" 
        }


        {
          variant === "garage" ? 

          <h6 className="text-sm font-semibold m-2">
            Garages
          </h6> : ""
        }

        {underline === true ? 
          <div className=" border-t border-gray-400">            
          </div> : ""
        }

        
            
          {items?.map((item) => (
            <button
              key={item?.value}
              onClick={() => handleSelect(item)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 font-sans text-sm hover:rounded-xl hover:overflow-hidden"
            >
              <div className="flex justify-start gap-x-3 items-center text-nowrap">
                <div>
                    {item?.icon}
                </div>
                <div>
                    {item?.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
