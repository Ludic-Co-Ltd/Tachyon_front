import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { backendUrl } from "../../utils/textDisplay";
import { Paths } from "../../config/Paths";
import StarRating from "../../components/partials/StarRating";

export default (props) => {
	const { name, id, image_path, company, rating } = props
	const navigate = useNavigate();
	return (
		<div className="">
			<div className="p-4">
				<img src={image_path && (backendUrl + image_path)} alt="" className="company-logo  aspect-[16/9] " />
			</div>
			<div className="elp-title text-sm mt-2">{company && company.name}</div>
			<div className="text-center font-bold text-lg elp-title text-primary">{name}</div>
			<div className="text-right">{rating && <StarRating rating={rating} />}</div>
			<div className="text-center my-2">
				<Button title="イベント登録" bgColor="bg-orange-400" bgColorHover="bg-orange-700"
					handleClick={() => navigate(Paths.showEvent.replace(':id', id))} />
			</div>
		</div>
	)
}