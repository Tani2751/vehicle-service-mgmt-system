

import {
  Settings,
  MessageCircleQuestionMark,
  Search,  
  ChevronsUpDown 
} from "lucide-react"
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useSelector } from "react-redux";



const sidebarfooterItems = [
  { title: "Settings", icon: Settings },
  {title: "Get Help", icon: MessageCircleQuestionMark },
  {title: "Search", icon: Search }
]


export default function Sidebar({items, setOpen}) {
  const {accessToken} = useAuth();
  const [garageList, setGarageList]  = useState([]);
  const  {data, status, errror} = useSelector((state) => state.user)

  const userInfo = data?.data?.userData

  useEffect(() => {

    const fetchGarages = async() => {
      if(!accessToken) return;
      try {
        const res = await fetch("http://localhost:3000/api/v1/info/sideBarGarargeList", {
          credentials: "include",
          method: "GET",
          headers : {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if (!res.ok) throw new Error("Failed to fetch garage Data");
        const data = await res.json();
        setGarageList(data.data.garageData);
      } catch (error) {
        console.log(error); 
        setGarageList(null);
      }
    }
    fetchGarages();
  }, [accessToken])

   const list = garageList && garageList?.map((g) => {
      return {label: g.name, value: g.name}
    })

  return (
    <aside className=" w-80 h-screen flex flex-col justify-between bg-gray-200 ">
      <div className="">    
        <div className="ml-10 m-4 px-2 rounded-2xl flex items-center justify-between hover:bg-white/20">
          <img className="w-40" src="/src/assets/Logo.svg" />
          {userInfo?.roleName === "super_admin" ?
            <Dropdown
            trigger={
              <button className="cursor-pointer ml-16 ">
                <ChevronsUpDown className="size-5" />
              </button>
            }
              position="right"
              items={list}
              onSelect={(item) => {
              
              }} 
              variant="garage"
          /> : ""
          }
          
          
        </div>
        <ul className="mt-10 flex flex-col items-center">
          {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <NavLink to={item.link} key={i} 
                className={( {isActive} ) => 
                  isActive ? "mb-3 w-full text-orange-400 no-underline"
                  : "mb-3 w-full text-black no-underline"
                }
                onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-5 ml-7" >
                    <Icon className="h-5 w-5 text-orange-500" />
                    <span className="font-sans text-[14px] hover:text-orange-400 ">{item.title}</span>
                  </div>                
                </NavLink>
              );
            })}
        </ul>
      </div>

      <div className="w-full">
        <ul className="mt-10 flex flex-col items-center mb-6">
          {sidebarfooterItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className=" mb-3 w-full">
                  <div className="flex items-center gap-5 ml-7" >
                    <Icon className="h-5 w-5" />
                    <span className="font-sans text-[14px]">{item.title}</span>
                  </div>                
                </li>
              );
            })}
        </ul>

        
          
      </div>
    </aside>
  )
}