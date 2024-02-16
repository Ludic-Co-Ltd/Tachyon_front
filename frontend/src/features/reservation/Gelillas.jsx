import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import GelillaCard from "./GelillaCard";

export default (props) => {
	const { events } = props

	return (
		<Splide className="p-2"
			options={{
				perPage: 1.5,
				arrows: false,
				pagination: false,
				type: 'loop',
				gap: '1rem',
				drag: true,
				padding: '1rem'
			}}
		>
			{
				events.map((event, index) =>
					<SplideSlide key={`event-${index}`} >
						<GelillaCard {...event} />
					</SplideSlide>
				)
			}
		</Splide>
	)
}