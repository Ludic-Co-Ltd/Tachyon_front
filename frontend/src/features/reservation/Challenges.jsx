import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import CallengeCard from "./CallengeCard";

export default (props) => {
	const { challenges } = props

	return (
		<Splide  className="p-2"
			options={{
				// perPage: 2,
				arrows: false,
				pagination: false,
				type:'loop',
				gap: '1rem',
				drag: true,
				padding: '5rem'
			}}
		>
			{
				challenges.map((challenge, index) =>
					<SplideSlide key={`event-${index}`}>
						<CallengeCard {...challenge} />
					</SplideSlide>
				)
			}
		</Splide>
	)
}