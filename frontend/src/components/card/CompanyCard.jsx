import React, { useState, useEffect } from "react";
import Company from './../../assets/images/company.png';

export default (props) => {
	const { name } = props

  return (
    <div className="">
			<img src={Company} alt="" className="company-logo" />
      <div className="font-bold text-lg">{name}</div>
		</div>
  )
}