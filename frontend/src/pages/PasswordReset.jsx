import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { useViewPort } from '../Hooks/useViewport';
import { Link, replace, useNavigate, useParams } from 'react-router-dom';




const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {width} = useViewPort();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch the password field to validate match
  const password = watch("password");

  const onSubmit = async(data) => {
    console.log("Form Data:", {...data, id: id});
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/reset-password', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...data, id: id}),
        credentials: "include"
      });
      if (!res.ok) throw new Error("unable to reset password")
      const responseData = await res.json();
      if(responseData.success) {
        setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
      }      
      console.log(responseData);      
    } catch (error) {
        console.log(error);      
    }  
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h2>
          <p className="text-gray-500 mb-6">
            Your password has been successfully updated. You can now log in with your new credentials.
          </p>
          <Link 
            to="login"
            className="w-full bg-orange-400 no-underline hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">

      <div className='mb-8'>
        <img src='https://res.cloudinary.com/duxgfwaef/image/upload/v1768487752/logo-LD_oq8nv0.png'/>
      </div>
      <div className="bg-white rounded-2xl shadow-xl  overflow-hidden flex items-center ">
        <div>
          {width >= 648 && (            
              <img 
                src='https://res.cloudinary.com/duxgfwaef/image/upload/v1768658693/cyber_security_password_and_shield_qqif7m.png' 
                alt='Password reset image'
                width={"600px"}
              />          
          )}
        </div>

        <div className='w-[400px] md:w-[600px]'>        
        {/* Header Section */}
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
            <Lock className="w-6 h-6 text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Set New Password</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please enter a new password for your account.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 space-y-6">
          
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              setTimeout(() => {
                  navigate("/login", {replace: true})
              }, 9000)            
            }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-transform active:scale-[0.98] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
           {isSubmitting ? "Reseting..." : "Reset Password"}
          </button>
        </form>
        </div>
      </div>
        
      
    </div>
  );
};

export default PasswordReset;