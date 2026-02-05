import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export function InviteUserPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!token) return;    
    const fetchToken = async() => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/v1/auth/verify-invite?token=${token}`)
        if(!res.ok) throw new Error("Invalid token");
        if(res.ok) setLoading(false);
        const responseData = await res.json();
        setValid(responseData?.success)
        setId(responseData?.data.userId)
        console.log(responseData);
        
      } catch (error) {
        setLoading(false);
        console.log(error);       
      }
    }
    fetchToken()
  }, [token]);

  if (loading) return <p>Verifying link...</p>;
  if (!valid) return <p>Invalid or expired link</p>;
  if (valid) {
    navigate(`/password-reset/${id}`, {replace: true})
  }  
}
