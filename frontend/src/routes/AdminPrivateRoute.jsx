import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/partials/AdminHeader";

export const AdminPrivateRoute = ({ children }) => {
	const navigate = useNavigate();
	
	useEffect(()=>{
		if(!localStorage.getItem('admin')){
			navigate('/admin/login');
		}
	}, [navigate])
	return (localStorage.getItem('admin')?
		<>
			<AdminHeader />
			{children}
		</>:null
	)
}