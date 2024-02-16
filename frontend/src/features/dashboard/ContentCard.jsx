import React, { useState, useEffect } from "react";

export default (props) => {
	const { title, content } = props

	return (
		<div className="mx-auto w-1/5 border border-gray-300 bg-white shadow">
			<div className="p-2 text-center">
				<h3 className="text-md font-bold text-gray-900">{title}</h3>
				<p className="text-md font-bold text-gray-500">{content}</p>
			</div>
		</div>
	)
}