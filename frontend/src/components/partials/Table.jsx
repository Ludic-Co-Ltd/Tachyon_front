import React, { useState, useEffect } from "react";

export const Table = ({ children }) => {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				{children}
			</table>
		</div>
	)
}

export const Thead = ({ children }) => {
	return (
		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			{children}
		</thead>
	)
}