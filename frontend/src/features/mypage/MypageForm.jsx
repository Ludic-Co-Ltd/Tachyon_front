import React, { useState, useEffect } from "react";
import Input from "../../components/form/Input";

export default (props) => {
	const { name, placeholder, label, type, onChange, value } = props

  return (
    <div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
			<Input name={name} placeholder={placeholder} label={label} type={type} handleChange={onChange} value={value}/>
		</div>
  )
}