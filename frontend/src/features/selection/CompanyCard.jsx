import React from "react";
import { Paths } from "../../config/Paths";
import { Link } from "react-router-dom";
import { backendUrl } from "../../utils/textDisplay";

export default (props) => {
	const { name, id, logo_path } = props;
	const currentUrl = window.location.href;
	const link = currentUrl.includes('admin')? 
		Paths.adminEditSI.replace(':id', id):Paths.showCompany.replace(':id', id);

  return (
		<div className="">
			<Link to={link}>
				<img src={logo_path&&(backendUrl+logo_path)}  alt="company logo" className="company-logo aspect-[4/4] rounded-lg border border-gray-400"  style={{borderRadius:100}}/>
				{/* <p className="text-black mt-2 text-center elp-title text-primary">{name}</p> */}
			</Link>
		</div>
  )
}