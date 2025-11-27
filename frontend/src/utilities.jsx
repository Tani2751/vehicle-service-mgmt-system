
import { LiaTruckPickupSolid } from "react-icons/lia";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaTruckPickup } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { AppWindow } from 'lucide-react';



export const menus = [
    {
        name: "Services",
        heading:"Comprehensive bike care solutions",
        subMenuHeadings: ["Regular / Periodic Maintenance Services", "Repair / Issue-Based Services", "Optional / Custom Add-ons", "Pick-Up & Drop Service", "Roadside Assistance", "Loyalty Points", "Service Booking", "Customer Portal"],
        subMenus: [
            {
                name: "Regular / Periodic Services",
                color: "#00B2FF",
                image: "/src/assets/wrench.png",
                
            },
            {
                name: "Repair / Issue-Based Services",
                image: "/src/assets/screwdriverman.png",
                color: "#B593FF",

            },
            {
                name: "Optional / Custom Add-ons",
                image: "/src/assets/add-on.png",
                color: "#F2F1F3",
                text: "#B593FF",
            },
            {
                text: "#B593FF",
                otherfeatures: [
                    {
                    name: "Pick-Up & Drop Service",
                    subHeading: "a rider picks up and delivers the vehicle after servicing",
                    icon: <LiaTruckPickupSolid  />
                },
                {
                    name: "Roadside Assistance",
                    icon: <FaTruckPickup  />
                },
                ]
            },
        ],
    },
    {
        name: "Plans",
        heading:"Flexible maintenance packages",
        subMenuHeadings: [`Basic Plan - “Essential Care”`, `Plus Plan - “Smart Care”`, `Premium Plan - “Total Care”`],
        subMenus: [
            {
                name: `Basic Plan - “Essential Care”`,
                subHeading: "Basic bike maintenance services",
                price: "₹999/year",
                color: "#00B2FF",
                image: "/src/assets/basicplan.png",
            },
            {
                name: `Plus Plan - “Smart Care”`,
                subHeading: "Comprehensive maintenance package",
                price: "₹1,999/year",
                color: "#B593FF",
                image: "/src/assets/smartplan.png",
            },
            {
                name: `Premium Plan - “Total Care”`,
                subHeading: "Premium full-coverage service",
                price: "₹2,999/year",
                color: "#F2F1F3",
                text: "#B593FF",
                image: "/src/assets/totalcare.png",
            },
        ]
    },
    {
        name: "More",
        heading:"Riderhub, Insights and Support",
        subMenus: [
            {
                name: "Track",
                subHeading: "Real-time service updates",
                image: "/src/assets/track.png"
            },
            {
                name: "Dashboard",
                subHeading: "Manage your bike service",
                image: "/src/assets/dashboard.png"
            },
            {
                name: "Service Booking",
                subHeading: "plan your service at your convenience",
                image: "/src/assets/planner.png"
            },
            {
                name: "About",
                subHeading: "Our mission and approach",
                image: "/src/assets/aboutus.png"
            },
            {
                name: "Blog",
                subHeading: "Insights and maintenance tips",
                image: "/src/assets/blog.png"
            },
            {
                name: "Contact",
                subHeading: "Get in touch with us",
                image: "/src/assets/contacts.png"
            }
        ]

    },   
];





const brandList = [
  "Honda",
  "Yamaha",
  "TVS",
  "Hero",
  "Suzuki",
  "Royal Enfield",
  "Bajaj",

  "Honda Activa",
  "TVS Jupiter",
  "Vespa",
  "Aprilia",
  "Suzuki Access",
  "Hero Maestro",

  "Castrol",
  "Motul",
  "Shell",
  "Mobil",
  "Gulf",
  "Valvoline",

  "Bosch",
  "MRF",
  "CEAT",
  "NGK",
  "Delphi",
  "Denso",
  "Exide",
];

export default brandList;