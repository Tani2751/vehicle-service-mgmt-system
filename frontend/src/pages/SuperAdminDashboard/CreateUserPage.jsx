import { useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link  } from "react-router-dom"
import { STORAGE_KEY } from "../../../../backend/constants/browerStorageKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import {createUserSchema} from "../../schemas/SuperAdmin_dashboard_schema"


export function CreateUserPage() {

    const {data} = useSelector((state) => state.user);
    const {data: roles} = useSelector((state) => state.roles);
    const {data: garages} = useSelector((state) => state.garages);
    const {accessToken} = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm({
            defaultValues: JSON?.parse(localStorage.getItem(STORAGE_KEY)) || {},
            resolver: zodResolver(createUserSchema)
    });

    useEffect(() => {
        const sub = watch((values) => {
            console.log(values);
            if (values && Object.keys(values).length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
            }        
        });

        return () => sub.unsubscribe();
    }, [watch])


 

    console.log(garages?.data?.garageData, 'roles');
    console.log(data?.data?.userData, '39');
  
    const userInfo = data?.data?.userData;
    const rolesInfo = roles?.data?.rolesData;
    const garageInfo = garages?.data?.garageData;


       useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        if (rolesInfo && garageInfo) {
            reset(JSON.parse(stored));
        }
        }, [rolesInfo, garageInfo, reset]);

    async function onSubmit(data) {
        console.log(data);
        
        try {
            const res = await fetch("http://localhost:3000/api/v1/SupAdminDashboard/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${accessToken}`
                },
                credentials: "include",
                body: JSON.stringify(data)                                
            });
            if (!res.ok) throw new Error("Failed to send data");
            localStorage.removeItem(STORAGE_KEY);
            reset();
            toast.success("User created successfully", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
             toast.error(error.message || "Something went wrong", {
                position: "top-center",
                autoClose: 3000,
            });           
        }
    }

    return (
        <main>
            <header className="bg-gray-200 px-4  py-3 rounded-2xl flex items-center justify-between">
                <h2 className="text-4xl md:text-6xl">
                    Create User
                </h2>
            </header>

            <section className="mt-22">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                        <div>
                            <div className="flex items-center justify-start  gap-6">
                            <label className="text-xs text-nowrap font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                User Name
                            </label>
                            <input
                                {...register("username")}
                                type="text" 
                                className=" input w-full lg:w-[600px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black focus:ring-0.5 transition-all duration-300 placeholder:text-gray-400"                
                            />                                 
                            </div>
                            {errors.username && <p className="error mt-4 ml-26">{errors.username.message}</p>}
                        </div>
                        
                        
                        <div>
                            <div className="flex items-center justify-start gap-6">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    type="email" 
                                    className=" input w-full  lg:w-[600px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black focus:ring-0.5 transition-all duration-300 placeholder:text-gray-400"                
                                />     
                            </div>
                            {errors.email && <p className="error mt-4 ml-20">{errors.email.message}</p>}  
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-start  gap-6">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Phone
                                </label>
                                <input
                                    {...register("phone")}
                                    type="text" 
                                    className=" input w-full  lg:w-[600px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black focus:ring-0.5 transition-all duration-300 placeholder:text-gray-400"                
                                />     
                            </div>
                            {errors.phone && <p className="error mt-4 ml-20">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-start n gap-6">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Address
                                </label>
                                <input
                                    {...register("address")}
                                    type="text" 
                                    className=" input w-full  lg:w-[600px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black focus:ring-0.5 transition-all duration-300 placeholder:text-gray-400"                
                                />     
                            </div>
                            {errors.address && <p className="error mt-4 ml-20">{errors.address.message}</p>}
                        </div>
                        
                        <div>                       
                            <div className="flex items-center justify-start  gap-6">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                City
                                </label>
                                <input
                                    {...register("city")}
                                    type="text" 
                                    className=" input w-full  lg:w-[600px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black focus:ring-0.5 transition-all duration-300 placeholder:text-gray-400"                
                                />     
                            </div>
                            {errors.city && <p className="error mt-4 ml-20">{errors.city.message}</p>}
                        </div>

                        
                        <div className="flex flex-col lg:flex-row items-start justify-start gap-10">
                            <div>
                                <div className="flex items-center justify-start gap-6">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                        Role
                                    </label>

                                    <select
                                        {...register("roleId", { required: true })}
                                        className="border p-2 rounded"
                                    >
                                        <option value="">Select role</option>
                                        {rolesInfo?.map(role => (
                                            <option key={role.id} value={role.id}>
                                            {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.roleId && <p className="error mt-4 ml-20">{errors.roleId.message}</p>}
                            </div>
                            
                            <div>
                                <div className="flex items-center justify-start gap-6">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                        Garage Name
                                    </label>
                                    <select
                                        {...register("garageId", { required: true })}
                                        className="border p-2 rounded"
                                    >
                                        <option value="">Select garage</option>
                                        {garageInfo?.map(garage => (
                                            <option key={garage.id} value={garage.id}>
                                            {garage.name}
                                            </option>
                                        ))}
                                    </select>  
                                </div>
                                {errors.garageId && <p className="error mt-4 ml-20">{errors.garageId.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10  md:mt-20 w-full flex items-center justify-center md:justify-end md:pr-60">
                        <button className="bg-orange-400/60  font-semibold  px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-400 transition-colors duration-200 ">
                           + Create User
                        </button>
                        <Link 
                            to={-1}
                            onClick={() =>{
                                reset() 
                                localStorage.removeItem(STORAGE_KEY)
                            }}
                            className="bg-orange-400/60 text-black no-underline font-semibold px-4 py-2 ml-10 rounded-xl cursor-pointer hover:bg-orange-400 transition-colors duration-200 "
                        >
                            Cancel
                        </Link >                        
                    </div>
                </form>
            </section>
        </main>
    )
}