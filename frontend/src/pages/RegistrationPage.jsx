

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome } from 'lucide-react';
import Header from '../components/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { registerSchema } from '../schemas/auth_schema';
import { getPasswordStrength } from '../utilities';
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";



const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  // Refs for GSAP
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const bgShapeRef = useRef(null);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });


  const password = watch("password", "");
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    console.log("Register Data:", data);
    
      try {
          const res = await fetch('http://localhost:3000/api/v1/auth/register', {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              cedentials: "include",
              body: JSON.stringify(data)
          })
          const reqObj = await res.json();
          console.log(reqObj);
            
          if (reqObj.success) {
              toast.success(`User created successfully, Welcom ${reqObj?.data.user.name}!`, {
                  position:"top-center",
                  autoClose: 3000,                    
              });
              navigate('/dashboard', {replace: true});
            } else {
              toast.error(`${reqObj.message}`, {
                position:"top-center",
                autoClose: 3000,                    
              })
            }
      } catch (error) {
        console.log(error);
    };
  }

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Float in the background shape
      gsap.from(bgShapeRef.current, {
        rotate: -15, // Rotate opposite way for variety
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
        stagger: 0.08, // Slightly faster stagger for more fields
        delay: 0.5,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]"
    >

        <Header />
      
      {/* --- Background Visuals --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
            ref={bgShapeRef}
            // Positioned slightly differently than Login for visual variety
            className="absolute bottom-[10%] -left-[5%] w-[45vw] h-[45vw] bg-orange-200/40 rounded-full blur-[100px]" 
        />
        <div className="absolute -top-[10%] right-[10%] w-[35vw] h-[35vw] bg-gray-200/60 rounded-full blur-[80px]" />
      </div>

      {/* --- Glassmorphism Registration Card --- */}
      <div 
        ref={formRef}
        className="relative z-10 mt-40 w-full max-w-md mx-4 p-8 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        {/* Header */}
        <div className="text-center mb-6 form-item">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 mb-4 text-orange-600">
             <User className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-sans">
            Join Motocare to manage your services.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} method="Post">
          
          {/* Full Name Input (New) */}
          <div className="space-y-1.5 form-item">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type="text"
                {...register("name")} 
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
              />
            </div>
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          

          {/* Email Input */}
          <div className="space-y-1.5 form-item">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                {...register("email")}
                type="email" 
                placeholder="jhon@gmail.com"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
              />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          

          {/* Password Input */}
          <div className="space-y-1.5 form-item">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Create a password"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
             {/* Password Strength Micro-interaction */}
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded transition-colors
                    ${

                      strength >= level
                      ? strength >= 3 
                        ? "bg-green-400"
                        : strength >= 2
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      : "bg-gray-400"
                    }
                  `}
                />
              ))}
              <p className="text-sm">
                {strength === 0 && "Enter a password"}
                {strength === 1 && "Weak password"}
                {strength === 2 && "Medium password"}
                {strength === 3 && "Strong password"}
                {strength === 4 && "Very strong password"}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 form-item">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
             Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")} 
                placeholder="Create a password"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (<p className="error">{errors.confirmPassword.message}</p>)}
          </div>



          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 form-item py-1">
              <input type="checkbox" id="terms" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
              <label htmlFor="terms" className="text-xs text-gray-500">
                  I agree to the <a href="#" className="text-gray-700 underline">Terms of Service</a> and <a href="#" className="text-gray-700 underline">Privacy Policy</a>
              </label>
          </div>

          {/* Sign Up Button */}
          <button disabled={isSubmitting} className='bg-orange-400 group w-full py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] h-10 text-white font-bold text-mediumNormal
             hover:bg-orange-500 hover:scale-105 cursor-pointer transition-all duration-300 flex items-center justify-center'>
            {isSubmitting ? "Creating" : "Create Account"}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Divider */}
          <div className="relative  py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/50 backdrop-blur-sm text-gray-400 text-xs">Or register with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md">
              <Chrome className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-medium">Google</span>
            </button>

          </div>

        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-500 form-item">
          Already have an account?{' '}
          <NavLink to="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
            Sign In
          </NavLink>
        </p>

      </div>
    </section>
  );
};

export default RegisterPage;