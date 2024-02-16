import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';

export default (props) => {
	const { title } = props

  return (
    <h1 className={`text-primary text-lg ml-2 font-bold ${props.className}`}>{title}</h1>
  )
}