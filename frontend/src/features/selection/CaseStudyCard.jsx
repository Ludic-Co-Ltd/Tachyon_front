import React, { useState, useEffect } from "react";
import Company from "../../assets/images/company.png";
import Button from "../../components/button/Button";

export default (props) => {
	const { name, id } = props

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white shadow">
			<div className="p-3">
				<img src={Company} alt="" className="company-logo" />
				<div className="text-lg">{name}</div>
				<div className="text-lg break-words whitespace-pre-wrap">
				{name}{name}{name}{name}{name}{name}{name}{name}{name}{name}{name}{name}{name}{name}
				</div>
			</div>
		</div>
  )
}