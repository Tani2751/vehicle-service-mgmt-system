import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async(data) => {
    console.log("Form Data:", {data});
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/forgot-password', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
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

  // SUCCESS STATE: Shown after user submits email
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your mail</h2>
          <p className="text-gray-500 mb-8">
            We have sent a password recover instructions to your email.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Open Email App
          </button>
          
          <div className="mt-6">
             <p className="text-sm text-gray-500">
               Did not receive the email? <button className="text-orange-400 font-medium hover:text-orange-500">Click to resend</button>
             </p>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT STATE: Input Form
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        
        <div className="p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
              <Mail className="w-6 h-6 text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Forgot Password?</h1>
            <p className="text-gray-500 mt-2 text-sm">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 pl-10 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;