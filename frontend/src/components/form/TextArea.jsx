import React, { useState, useEffect } from "react";

export default (props) => {
	const { name, label, className, rows, value, handleChange } = props;

	return (
		<div className={`mb-4 ${className}`}>
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
				{label}
			</label>
			<textarea 
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
				id={name}
				placeholder={label}
				rows={rows ?? 4}
				// defaultValue={value}
				value={value}
				onChange={(ev) => handleChange(name, ev.target.value)}
			/>
		</div>
	)
}
