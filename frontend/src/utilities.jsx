
import { LiaTruckPickupSolid } from "react-icons/lia";
import { FaTruckPickup } from "react-icons/fa";
import { CalendarDays, ClipboardCheck, SearchCheck, Wrench, ShieldCheck, Handshake } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  BarChart,
  Settings,
  MessageCircleQuestionMark,
  Search,  
  EllipsisVertical,
  WalletCards,
  Cylinder ,
  UserStar,
  ChevronsUpDown 
} from "lucide-react"


export const menus = [
    {
        name: "Services",
        link: "/service"
        // heading:"Comprehensive bike care solutions",
        // subMenuHeadings: ["Regular / Periodic Maintenance Services", "Repair / Issue-Based Services", "Optional / Custom Add-ons", "Pick-Up & Drop Service", "Roadside Assistance", "Loyalty Points", "Service Booking", "Customer Portal"],
        // subMenus: [
        //     {
        //         name: "Regular / Periodic Services",
        //         color: "#00B2FF",
        //         image: "/src/assets/wrench.png",
                
        //     },
        //     {
        //         name: "Repair / Issue-Based Services",
        //         image: "/src/assets/screwdriverman.png",
        //         color: "#B593FF",

        //     },
        //     {
        //         name: "Optional / Custom Add-ons",
        //         image: "/src/assets/add-on.png",
        //         color: "#F2F1F3",
        //         text: "#B593FF",
        //     },
        //     {
        //         text: "#B593FF",
        //         otherfeatures: [
        //             {
        //             name: "Pick-Up & Drop Service",
        //             subHeading: "a rider picks up and delivers the vehicle after servicing",
        //             icon: <LiaTruckPickupSolid  />
        //         },
        //         {
        //             name: "Roadside Assistance",
        //             icon: <FaTruckPickup  />
        //         },
        //         ]
        //     },
        // ],
    },
    {
        name: "Plans",
        link: "/plans"
        // heading:"Flexible maintenance packages",
        // subMenuHeadings: [`Basic Plan - “Essential Care”`, `Plus Plan - “Smart Care”`, `Premium Plan - “Total Care”`],
        // subMenus: [
        //     {
        //         name: `Basic Plan - “Essential Care”`,
        //         subHeading: "Basic bike maintenance services",
        //         price: "₹999/year",
        //         color: "#00B2FF",
        //         image: "/src/assets/basicplan.png",
        //         link: "/#pricing"
        //     },
        //     {
        //         name: `Plus Plan - “Smart Care”`,
        //         subHeading: "Comprehensive maintenance package",
        //         price: "₹1,999/year",
        //         color: "#B593FF",
        //         image: "/src/assets/smartplan.png",
        //     },
        //     {
        //         name: `Premium Plan - “Total Care”`,
        //         subHeading: "Premium full-coverage service",
        //         price: "₹2,999/year",
        //         color: "#F2F1F3",
        //         text: "#B593FF",
        //         image: "/src/assets/totalcare.png",
        //     },
        // ]
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
                image: "/src/assets/dashboard.png",
                link: "/dashboard"
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


export const benefitsList = [
    {
        heading: "Cost-effective service",
        subHeading: "Save money with predictive maintenance that prevents expensive repairs and extends your two-wheeler's life.",
        image: "src/assets/section2-benefits/calculator.png"
    },
    {
        heading: "Unmatched convenience",
        subHeading: "Book services online, choose flexible time slots, and receive professional maintenance without disrupting your daily schedule.",
        image: "src/assets/section2-benefits/convenience.png"
    },
    {
        heading: "Complete transparency",
        subHeading: "Save money with predictive maintenance that prevents expensive repairs and extends your two-wheeler's life.",
        image: "src/assets/section2-benefits/transparency.png"
    },
    {
        heading: "Cost-effective service",
        subHeading: "Save money with predictive maintenance that prevents expensive repairs and extends your two-wheeler's life.",
        image: "src/assets/section2-benefits/support.png"
    }
];



export const section3Steps = [
    {
        image: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632753/Gemini_Generated_Image_at12zuat12zuat12_-_Copy_jckjay.png",
        heading: "Comprehensive Vehicle Servicing",
        subHeading: `End-to-end maintenance services including general inspection, oil changes, brake checks, engine diagnostics, tire rotation, and fluid refills. 
                    Users can choose from multiple service packages tailored to their vehicle type and usage.`
    },
    {
        image: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632818/Gemini_Generated_Image_isbq34isbq34isbq_-_Copy_yt3wey.png",
        heading: "Online Service Booking",
        subHeading: `A seamless appointment-booking system that allows customers to schedule services at their convenience. Includes slot availability, service center selection, and instant booking confirmation`
    },
    {
        image: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632757/Gemini_Generated_Image_dshw9edshw9edshw_-_Copy_snjzqu.png",
        heading: "Real-Time Service Updates",
        subHeading: `Live status tracking of ongoing vehicle services—such as “In Inspection,” “Service in Progress,” “Quality Check,” and “Ready for Delivery.” Users receive instant notifications through SMS, email, or in-app alerts.`
    },
    {
        image: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632822/Gemini_Generated_Image_yhzl18yhzl18yhzl_-_Copy_xfckiz.png",
        heading: "Roadside Assistance",
        subHeading: `24/7 emergency support for breakdowns. Offers instant tow-truck requests, on-spot minor repair help (battery jump-start, tire replacement, fuel delivery), and live tracking of assistance vehicles.`
    },
    {
        image: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632817/Gemini_Generated_Image_z8mxi9z8mxi9z8mx_-_Copy_nsge8j.png",
        heading: "Pick-Up & Drop Subscription Service",
        subHeading: `Premium subscription plans offering doorstep vehicle pick-up and drop for scheduled maintenance or repairs. Includes priority slots, discounted rates, and faster turn-around time for subscribers.`
    },
   

]


export const process = [
    {   
        icon: <CalendarDays className="size-10 md:size-12"  />,
        heading: "1. Service Booking",
        description: "Choose your preferred date, time, and service package through a simple online booking flow. Instantly receive confirmation and reminders."
    },
    {   
        icon: <ClipboardCheck className="size-10 md:size-12 " />,
        heading: "2. Vehicle Check-In",
        description: "Your vehicle is logged into the system with details like mileage, issues reported, and service requirements. You get a notification once check-in is complete."
    },
    {   
        icon: <SearchCheck  className="size-10 md:size-12 "/>,
        heading: "3. Detailed Inspection",
        description: "Technicians perform a full diagnostic check of engine, brakes, fluids, battery, and overall condition. A digital inspection report is generated for transparency."
    },
    {   
         icon: <Wrench  className="size-10 md:size-12"/>,
        heading: "4. Service & Repairs",
        description: "Approved services are carried out by certified technicians. Real-time updates keep the customer informed of progress at every important stage."
    },
    {   
         icon: <ShieldCheck  className="size-10 md:size-12 "/>,
        heading: "5. Quality Check",
        description: "A final multi-point quality inspection ensures the vehicle is fully serviced, tested, and safe before delivery."
    },
    { 
         icon: <Handshake  className="size-10 md:size-12 "/>,
        heading: "6. Delivery & Handover",
        description: "Once everything is complete, the vehicle is ready for pick-up or doorstep drop-off. All invoices and service reports are available digitally."
    }
]


export const testimonals = [
    {
        name: "Rajesh Kumar",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632756/naim-ahmed-8BcVHmAHtlw-unsplash_c6btwf.jpg",
        type: "Commuter",
        place: "Delhi",
        comment: `"I stopped worrying about when to service my bike. MotoCare reminds me, books it, and I get it back running better than before."`
    },
    {
        name: "Priya Sharma",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765451133/dhruv-kadam--cFEBbptadk-unsplash_rohumv.jpg",
        type: "Weekend rider",
        place: "Mumbai",
        comment: `"The transparency is what sold me. I see exactly what's wrong before they touch anything, and the prices never change."`
    },
    {
        name: "Arjun Singh",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765632631/naim-ahmed-Hkq79IlzegU-unsplash_piox8z.jpg",
        type: "Long-distance rider",
        place: "Bangalore",
        comment: `"Roadside assistance saved me twice already. Worth every rupee of the subscription."`
    },
    {
        name: "Vikram Patel",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765449991/samples/man-portrait.jpg",
        type: "Daily commuter",
        place: "Pune",
        comment: `"The subscription paid for itself in the first service. No more guessing what my bike needs."`
    },
    {
        name: "Meera Desai",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765449993/samples/woman-on-a-football-field.jpg",
        type: "Adventure rider",
        place: "Goa",
        comment: `"I ride across states. Having roadside help everywhere gives me peace of mind I didn't have before."`
    },
    {
        name: "Anil Verma",
        photo: "https://res.cloudinary.com/duxgfwaef/image/upload/v1765449989/samples/smile.jpg",
        type: "Fleet operator,",
        place: "Hyderabad",
        comment: `"Fixed costs mean I can budget properly. No surprises, no stress, just reliable service."`
    },
    
]


export const questions = [
    {
        question: "How many services yearly?",
        answer: "All subscription plans include four scheduled services spread across the year. You control the timing and can book additional services anytime at standard rates.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes. Cancel your subscription with no penalties. Unused services remain available through the end of your billing period.",
    },
    {
        question: "What does roadside assistance cover?",
        answer: "We dispatch help for breakdowns, flat tires, fuel delivery, and jump starts. Premium plans include towing to our service center or your preferred location.",
    },
    {
        question: "Is there a booking limit?",
        answer: "No limit on emergency services. Scheduled maintenance slots fill based on availability, but we keep capacity open for subscribers.",
    },
    {
        question: "What if I need urgent service?",
        answer: "Smart and Total Care subscribers get priority slots. Emergency repairs are handled same-day when possible. Call our support line for immediate assistance.",
    },
]



export const footerLinks = [
    {
        name: "Services",
        subLinks: [
            "Book Service",
            "Service plans",
            "Track status",
            "Roadside help",
            "Support"
        ]
    },
    {
        name: "Company",
        subLinks: [
            "About us",
            "Contact us",
            "Service centers",
            "Careers",
            "Blog"
        ]
    },
    {
        name: "Follow us",
        subLinks: [
            "Facebook",
            "Instagram",
            "X",
            "LinkedIn",
            "YouTube"
        ]
    }
]



export const pricingPlans = [
    {
      title: "Basic Plan – Essential Care",
      idealFor: "Regular commuters who want timely servicing at minimum cost.",
      price: "₹999/year",
      features: [
        "4 Standard Services / Year",
        "Basic Washing & Cleaning",
        "Engine Oil Change",
        "General Checkup",
        "Service Reminders (SMS/Email)",
        "Service History Tracking (view-only)",
      ],
      Goal: "Keep bikes healthy with affordable periodic maintenance."
    },
    {
      title: "Plus Plan – Smart Care",
      idealFor: "Busy riders who prefer convenience and extra support.",
      price: "₹1,999/year",
      features: [
        "Everything in Basic",
        "Pick-Up & Drop (within 5 km)",
        "Roadside Assistance (1 free call/year)",
        "Spare Parts Discount (5%)",
        "Before/After Photos of Service",
        "Priority Slot Booking",
        "Full Digital Service Report (view/download)",
      ],
      Goal: "Offer convenience and transparency without heavy cost."
    },
    {
      title: "Premium Plan – Total Care",
      idealFor: "Regular commuters who want timely servicing at minimum cost.",
      price: "₹2,999/year",
      features: [
        "Everything in Plus",
        "Unlimited Roadside Assistance",
        "Free Chain Lubrication (every visit)",
        "Fuel Delivery (breakdown situations)",
        "Loyalty Points on Each Service",
        "Extended Pickup Radius (up to 10 km)",
        "Free Polishing Once a Year",
        "Referral Rewards",        
      ],
      Goal: "Deliver a hands-off ownership experience."
    },
  ];

 export  const comparisonData = [
    { feature: "4 Standard Services / Year", basic: true, standard: true, premium: true },
    { feature: "Basic Washing & Cleaning", basic: true, standard: true, premium: true },
    { feature: "Engine Oil Change", basic: true, standard: true, premium: true },
    { feature: "General Checkup", basic: true, standard: true, premium: true },
    { feature: "Service Reminders", basic: true, standard: true, premium: true },
    { feature: "Service History Tracking", basic: true, standard: true, premium: true },

    { feature: "Pick-Up & Drop (5 km)", basic: false, standard: true, premium: true },
    { feature: "Roadside Assistance", basic: false, standard: true, premium: true },
    { feature: "Spare Parts Discount (5%)", basic: false, standard: true, premium: true },
    { feature: "Before/After Photos", basic: false, standard: true, premium: true },
    { feature: "Priority Slot Booking", basic: false, standard: true, premium: true },
    { feature: "Digital Service Report", basic: false, standard: true, premium: true },

    { feature: "Unlimited Roadside Assistance", basic: false, standard: false, premium: true },
    { feature: "Free Chain Lubrication", basic: false, standard: false, premium: true },
    { feature: "Fuel Delivery", basic: false, standard: false, premium: true },
    { feature: "Loyalty Points", basic: false, standard: false, premium: true },
    { feature: "Extended Pickup Radius (10 km)", basic: false, standard: false, premium: true },
    { feature: "Free Polishing Once a Year", basic: false, standard: false, premium: true },
    { feature: "Referral Rewards", basic: false, standard: false, premium: true },
  ];



  export function getPasswordStrength(password = "") {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score; // 0 → 4
}


export const serviceRequests = [
  {
    serviceId: "SR-201",
    customer: "John Doe",
    vehicle: "Toyota Camry",
    serviceType: "Regular",
    status: "Completed",
    mechanic: "Mike",
  },
  {
    serviceId: "SR-202",
    customer: "Sarah Smith",
    vehicle: "Honda Civic",
    serviceType: "Repair",
    status: "In Service",
    mechanic: "Alex",
  },
  {
    serviceId: "SR-203",
    customer: "David Johnson",
    vehicle: "Ford F-150",
    serviceType: "Add-ons",
    status: "Inspection",
    mechanic: "Chris",
  },
  {
    serviceId: "SR-204",
    customer: "Emily Brown",
    vehicle: "Hyundai Elantra",
    serviceType: "Add-ons",
    status: "Checked In",
    mechanic: "Mike",
  },
  {
    serviceId: "SR-205",
    customer: "Michael Lee",
    vehicle: "BMW 3 Series",
    serviceType: "Repair",
    status: "Waiting for Parts",
    mechanic: "Daniel",
  },
  {
    serviceId: "SR-206",
    customer: "Olivia Wilson",
    vehicle: "Tesla Model 3",
    serviceType: "Regular",
    status: "In Service",
    mechanic: "Alex",
  },
  {
    serviceId: "SR-207",
    customer: "James Anderson",
    vehicle: "Chevrolet Malibu",
    serviceType: "Add-ons",
    status: "Completed",
    mechanic: "Chris",
  },
  {
    serviceId: "SR-208",
    customer: "Sophia Martinez",
    vehicle: "Nissan Altima",
    serviceType: "Repair",
    status: "Checked In",
    mechanic: "Mike",
  },
  {
    serviceId: "SR-209",
    customer: "William Taylor",
    vehicle: "Audi A4",
    serviceType: "Add-ons",
    status: "In Service",
    mechanic: "Daniel",
  },
  {
    serviceId: "SR-210",
    customer: "Isabella Thomas",
    vehicle: "Kia Sportage",
    serviceType: "Regular",
    status: "Completed",
    mechanic: "Alex",
  },
];



export const appointments = [
  {
    appointmentId: "APT-1001",
    customer: "Amit Kumar",
    phone: "9876543210",
    vehicleNumber: "KA-05-MB-2345",
    serviceType: "Regular Service",
    appointmentDate: "2025-01-05",
    timeSlot: "09:00 - 09:45",
  },
  {
    appointmentId: "APT-1002",
    customer: "Rahul Sharma",
    phone: "9123456780",
    vehicleNumber: "MH-12-AB-6789",
    serviceType: "Oil Change",
    appointmentDate: "2025-01-05",
    timeSlot: "10:00 - 10:30",
  },
  {
    appointmentId: "APT-1003",
    customer: "Sneha Patel",
    phone: "9988776655",
    vehicleNumber: "GJ-01-KL-4321",
    serviceType: "General Inspection",
    appointmentDate: "2025-01-05",
    timeSlot: "10:45 - 11:25",
  },
  {
    appointmentId: "APT-1004",
    customer: "Vikram Singh",
    phone: "9090909090",
    vehicleNumber: "DL-03-XY-8899",
    serviceType: "Brake Service",
    appointmentDate: "2025-01-06",
    timeSlot: "09:30 - 10:30",
  },
  {
    appointmentId: "APT-1005",
    customer: "Neha Verma",
    phone: "9012345678",
    vehicleNumber: "RJ-14-ZZ-5566",
    serviceType: "Battery Check",
    appointmentDate: "2025-01-06",
    timeSlot: "11:00 - 11:20",
  },
  {
    appointmentId: "APT-1006",
    customer: "Arjun Mehta",
    phone: "9345678901",
    vehicleNumber: "TN-09-QW-7788",
    serviceType: "Engine Tuning",
    appointmentDate: "2025-01-06",
    timeSlot: "01:00 - 02:30",
  },
]




export const inventories = [
  {
    partId: "INV-001",
    partName: "Engine Oil (10W-30)",
    category: "Lubricants",
    availableStock: 8,
    threshold: 20,
    unitPrice: 420,
    supplier: "Castrol India",
    lastRestocked: "2024-12-28",
    status: "Out of Stock",
  },
  {
    partId: "INV-002",
    partName: "Air Filter",
    category: "Filters",
    availableStock: 5,
    threshold: 15,
    unitPrice: 180,
    supplier: "Bosch",
    lastRestocked: "2024-12-22",
    status: "Low Stock",
  },
  {
    partId: "INV-003",
    partName: "Brake Pads (Front)",
    category: "Brakes",
    availableStock: 4,
    threshold: 10,
    unitPrice: 650,
    supplier: "TVS Parts",
    lastRestocked: "2024-12-18",
    status: "Critical",
  },
  {
    partId: "INV-004",
    partName: "Spark Plug",
    category: "Engine",
    availableStock: 12,
    threshold: 25,
    unitPrice: 120,
    supplier: "NGK",
    lastRestocked: "2024-12-30",
    status: "Low Stock",
  },
  {
    partId: "INV-005",
    partName: "Drive Chain Kit",
    category: "Transmission",
    availableStock: 2,
    threshold: 6,
    unitPrice: 2100,
    supplier: "Rolon",
    lastRestocked: "2024-12-10",
    status: "Out of Stock",
  },
  {
    partId: "INV-006",
    partName: "Battery (Two-Wheeler)",
    category: "Electrical",
    availableStock: 1,
    threshold: 5,
    unitPrice: 1650,
    supplier: "Exide",
    lastRestocked: "2024-12-05",
    status: "Out of Stock",
  },
];



export const serviceTypeData = [
  { name: "Regular / Periodic Maintenance", value: 320 },
  { name: "Repair / Issue-based Services", value: 175 },
  { name: "Optional / Custom Add-ons", value: 90 },
];


export const superAdminSidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, link: "/superAdminDashboard" },
  { title: "User Management", icon: Users, link: "/superAdminDashboard/users" },
  { title: "Appointments", icon: Calendar, link: "/superAdminDashboard/users"   },
  { title: "Vehicles", icon: Car },
  { title: "Job Cards", icon: Wrench },
  { title: "Reports & Analytics", icon: BarChart },
  {title: "Billing & Payments", icon: WalletCards },
  {title: "Inventory", icon: Cylinder },
]

export const actionItems= [
  {value: "View", label: "View"},
  {value: "Edit", label: "Edit"},
  {value: "Reset Password", label: "Reset Password"},
  {value: "Deactivate", label: "Deactivate"},  
]