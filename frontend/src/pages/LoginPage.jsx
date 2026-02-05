import  { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import Header from '../components/Header';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../schemas/auth_schema';
import { useAuth } from '../Hooks/useAuth';
import {toast}  from "react-toastify"


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {setUser, setAccessToken, user} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm({
    resolver: zodResolver(loginSchema)
  })
  
  // Refs for GSAP
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const bgShapeRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Float in the background shape
      gsap.from(bgShapeRef.current, {
        rotate: 15,
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      });

      // 2. Slide up and Fade in the Form Card
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      // 3. Stagger the internal form elements
      gsap.from(".form-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  const onSubmit = async(data) => {
   
        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
                credentials: "include"
            })
            const resObj = await res.json();

            console.log(resObj, '78');
            
    
            if (resObj.success) {
                setUser(resObj.data.user);
                setAccessToken(resObj.data.accessToken);
                toast.success(`Welcom, ${resObj?.data.user.name}!`, {
                    position: "top-center",
                    autoClose: 1000,
                });

                console.log(resObj.data.user, '89');
                
                
                if (resObj.data.user.role === 'super_admin') {
                  navigate("/SuperAdminDashboard", {replace: true}) 
                } else if (resObj.data.user.role === 'garage_admin') {
                  navigate("/garageAdminDashboard", {replace: true}) 
                }

            } else {
              console.log('chal');
              
                toast.error(resObj.message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
        } catch (error) {
          console.log(error);          
        }       
  }

  return (
    <>
   
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]" // Apple-style light gray bg
    >

        <Header />
      
      {/* --- Background Visuals (Subtle Orange Blobs) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
            ref={bgShapeRef}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[100px]" 
        />
        <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] bg-gray-200/60 rounded-full blur-[80px]" />
      </div>

      {/* --- Glassmorphism Login Card (Light Mode) --- */}
      <div 
        ref={formRef}
        className="relative mt-30 z-10 w-full max-w-md mx-4 p-8 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        {/* Header */}
        <div className="text-center mb-8 form-item">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 mb-4 text-orange-600">
            {/* Logo Placeholder */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-sans">
            Enter your details to access Motocare.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email Input */}
          <div className="space-y-1.5 form-item">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                {...register("email")}
                type="email" 
                placeholder="hello@motocare.com"
                className=" input w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"                
              />              
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 form-item">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-orange-600 font-medium hover:text-orange-700 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0  pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full  bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
              />
                          
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute  inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          {/* Sign In Button */}
          <button disabled={isSubmitting} className='bg-orange-400 group w-full py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] h-10 text-white font-bold text-mediumNormal
             hover:bg-orange-500 hover:scale-105 cursor-pointer transition-all duration-300 flex items-center justify-center'>
            {isSubmitting ? "Logging in..." : "Login"}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Divider */}
          <div className="relative form-item py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/50 backdrop-blur-sm text-gray-400 text-xs">Or continue with</span>
            </div>
          </div>

          {/* Social Logins (Light Theme) */}
          <div className="grid grid-cols-1 gap-4 form-item">
            <button className="flexhover:text-orange-400 hover:text-orange-400 cursor-pointer items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md">              
              <span className="text-sm font-medium ">Google</span>
            </button>
          </div>

        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-500 form-item">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
            Sign up now
          </NavLink>
        </p>

      </div>
    </section>
    </>
  );
};

export default LoginPage;