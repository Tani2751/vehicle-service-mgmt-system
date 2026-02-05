import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Bell, LogOut, PanelRight, CircleUser  } from 'lucide-react';
import gsap from "gsap";
import { Outlet } from "react-router-dom";
import { useViewPort } from "../Hooks/useViewport";
import Sidebar from "../components/Sidebar";
import { superAdminSidebarItems } from "../utilities";
import Dropdown from "../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";




export function DashboardLayout() {

    const [data1, setData] = useState(null);
    const {accessToken, logout, user} = useAuth();
    const [open, setOpen] = useState(true);
    const sideBarRef = useRef(null);
    const headerRef = useRef(null);
    const size = useViewPort();
    const isMobileSize = size.width < 1024
    const disptach = useDispatch();
    const {data} = useSelector((state) => state?.user);
    const items = [
        {icon: <CircleUser  className="size-4" />, label: "Account", value: "Account" },
        { icon: <LogOut className="size-4" />, label: "Logout", value: "Logout" },
    ];
     

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/v1/SupAdminDashboard", {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                const resObj = await res.json();
                if (resObj.success) {
                    setData(resObj.data.users)
                } else {
                    setData(null)
                }
            } catch (error) {
                console.log(error);
                setData(null);
            }            
        };

        getData();
    }, [accessToken])

    useLayoutEffect(() => {
        if (!sideBarRef.current) return;

        gsap.to(sideBarRef.current, {
            x: open ? 0 : -320, // (w-80)
            duration: 0.6,
            ease: "power3.inOut",
        });

        if (!isMobileSize) {
            gsap.to(headerRef.current, {
            left: open ? "20rem" : "1rem",
            duration: 0.6,
            ease: "power3.inOut",
        }) 
        } else {
            gsap.set(headerRef.current, {left: "1rem"})
        }
        
    }, [open, isMobileSize])

    const userInfo = data?.data?.userData

    
    return (
      <main className="flex min-h-screen bg-gray-200">
         <div ref={sideBarRef} className={`fixed z-50 h-screen w-80 `}>
            <Sidebar items={superAdminSidebarItems} open={open} setOpen= {setOpen}/>
         </div>
        {size.width < 1024 && open && (
            <div 
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setOpen(false)}
            />
        )}
        
        
         <div
            ref={headerRef}
            className="fixed right-3 left-3 top-3 bottom-3 bg-gray-100 z-10 rounded-2xl flex flex-col"
            >
            {/* Header */}
            <header className="flex items-center justify-between p-3 h-16 shrink-0">
                <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                    <PanelRight />
                </div>
                <div className="flex items-center gap-6">
                    <Bell />
                    <Dropdown 
                        trigger={
                            <button className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center">
                                <div className="font-bold rounded-full flex items-center justify-center h-10 w-10 bg-gray-300">
                                    {`${userInfo?.username?.slice(0,1).toUpperCase()}`}
                                </div>
                            </button>
                        }
                    items={items}
                    variant="profile"
                    position="left"
                    onSelect={(item) => {
                        if (item.value === "Logout") {    
                            disptach(clearUser());
                            logout(user.userId);
                        }
                    }}
                        underline={true}
                    />
                </div>
            </header>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <Outlet />
            </div>
        </div>                    
      </main>
    )
}


        