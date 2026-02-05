

const bgColors = {
  primary: "bg-orange-400",
  secondary: "bg-black",
};

const textColors = {
  white: "text-white",
  black: "text-black",
};


export default function Button({name, color, isArrow, textColor }) {
    return (
        <>
            <button className={` 
                ${bgColors[color]}
                ${textColors[textColor]}
                ${isArrow ? "inline-flex items-center": ""}
                font-semibold mt-6 px-2 py-1 xl:px-5 xl:py-1 rounded-[12px] text-mediumNormal xl:text-lg  hover:scale-110 cursor-pointer duration-300 transition-all mx-2`}>
                {name}
                {isArrow ? 
                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={`${color ? color : "#00000"}`} ><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>    
                :
                ""
                }   
            </button>
        </>
    )
}