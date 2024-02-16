import * as React from 'react';

const Button = (props) => {
	const { title, bgColor, bgColorHover, className, handleClick, ...otherProps } = props

	return (
		<button
			className={`${className ? className : "py-1 px-4 rounded-full text-xs"} ${bgColor} hover:${bgColorHover} text-white font-bold`}
			onClick={handleClick}
			{...otherProps}
		>
			{title}
		</button>
	)
}

export default Button;