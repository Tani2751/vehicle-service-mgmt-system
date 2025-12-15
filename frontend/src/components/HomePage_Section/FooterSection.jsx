import { footerLinks } from "../../utilities";
import Button from "../Button";



export function FooterSection() {
    return (
        <div className="bg-black">
        <footer className="z-100 h-[110vh] md:h-[80vh] lg:h-[90vh] bg-[#F2F1F3] p-6  flex items-center  flex-col justify-between rounded-b-[62px]">
            <div className="flex flex-col items-center p-4 mt-12">
                <h1 className="font-heading text-orange-400 font-bold md:text-h2 lg:text-7xl text-h4">
                    Ready to ride worry-free
                </h1>
                <p className="font-sans text-[14px] lg:text-regularNormal mt-6">
                    Join thousands of riders who trust MotoCare with their vehicles
                </p>
                <Button name={"Book your service now"} color={"secondary"} textColor={"white"} />
            </div>
            <div className="grid md:grid-cols-3 lg:gap-x-40 grid-cols-2 gap-x-12 gap-y-10">
                {footerLinks.map((link, i) => (
                    <div className="w-full" key={i}>
                        <h5 className="font-heading font-bold text-xl text-center md:text-2xl lg:text-2xl">{link.name}</h5>
                        <ul className="flex flex-col items-center ">
                            {link.subLinks.map((sublink, j) => (
                                <li className="mt-4" key={j}>
                                    <a href="#" className="text-center hover:text-orange-400 text-nowrap lg:text-lg no-underline text-black">{sublink}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center lg:flex-row gap-6 justify-around w-full ">
                <p>
                    &copy; 2025 MotoCare. All rights reserved.
                </p>
                <ul className="flex gap-6 text-sm ">
                    <li>
                        <a className="no-underline text-black">Privacy policy</a>
                    </li>
                    <li>
                        <a className="no-underline text-black">Terms of service</a>
                    </li>
                    <li>
                        <a className="no-underline text-black">Cookies setting</a>
                    </li>
                </ul>
            </div>
        </footer>
        <div className="h-[70vh] lg:h-[60vh] flex lg:flex-row flex-col items-center lg:justify-around p-4">
            <div>
                <img className="size-80 lg:size-130" src="/src/assets/logo_white_s.svg" />
            </div>
            <div className=" p-3 flex flex-col items-center justify-center">
                <h5 className="text-white text-2xl  font-heading font-semibold text-center">
                    Get maintenance tips and service reminders delivered monthly.
                </h5>
                <input className="mt-6 h-8 w-80 px-3 py-6 bg-gray-800 border border-gray-700
                         focus:border-orange-400 text-white text-lg font-semibold
                         focus:outline-none
                         " 
                        placeholder="Your Email" />
                <Button name={"Subscribe"} color={"primary"} textColor={"white"}/>
            </div>
        </div>
        </div>
    )
}