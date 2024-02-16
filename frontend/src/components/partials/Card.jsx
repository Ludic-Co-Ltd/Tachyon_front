import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';

export const Card = ({ children }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
			{children}
    </div>
  )
}

export const CardTitle = ({ title }) => {
  return (
		<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white border-l-4 border-primary px-3">{title}</h5>
  )
}