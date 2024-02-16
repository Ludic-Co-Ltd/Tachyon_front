import React, { useState, useEffect } from "react";
import Company from "../../assets/images/company.png";
import Button from "../../components/button/Button";

export default (props) => {
	const { name, id } = props

	return (
		<div className="">
			<img src={Company} alt="" className="company-logo" />
			<div className="">{name}</div>
			<div className="text-center font-bold text-lg">{name}</div>
			<div className="text-center my-2">
				<Button title="イベント登録" bgColor="bg-orange-400" bgColorHover="bg-orange-700" />
			</div>
		</div>
	)
}