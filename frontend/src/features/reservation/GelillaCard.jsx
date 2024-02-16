import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import Company from "../../assets/images/company.png";
import Button from "../../components/button/Button";
import { backendUrl } from "../../utils/textDisplay";
import { Paths } from "../../config/Paths";
import { Card } from "@mui/material";
import moment from 'moment';
import 'moment/locale/ja';
export default (props) => {
	const navigate = useNavigate();
	const { name, id, image_path, event_date, start_time, end_time } = props

	return (
		<div>
			{/* <div className="p-2 text-red-500">{moment(event_date).format('M月D日')} 
				{moment(start_time).format('H:mm')}-{moment(end_time).format('H:mm')}</div> */}
			<div className="border border-gray-400" onClick={() => navigate(Paths.showEvent.replace(':id', id))}><img src={image_path && (backendUrl + image_path)} alt="" className="company-logo aspect-[16/9]" /></div>
			<div className="text-base elp-title2 text-primary">{name}</div>
			{/* <div className="text-center my-2">
				<Button title="イベント登録" bgColor="bg-orange-400" bgColorHover="bg-orange-700"
					handleClick={() => navigate(Paths.showEvent.replace(':id', id))} />
			</div> */}
		</div>
	)
}