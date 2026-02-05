import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { fetchUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRoles } from "../store/rolesSlice";
import { fetchGarages } from "../store/garageSlice";


export function ProtectedRoute({role}) {

   const { accessToken, loading, user } = useAuth();
   const data = {accessToken, user}

  const dispatch = useDispatch();

  useEffect(() => {
        if(!accessToken) return;
        dispatch(fetchUser(data));
        dispatch(fetchRoles(accessToken));
        dispatch(fetchGarages(accessToken))
    }, [accessToken, dispatch, user]);

 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken && role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
}
