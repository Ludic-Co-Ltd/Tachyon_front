import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import MentorCard from "./MentorCard";

export default (props) => {
	const { mentors } = props

  return (
    <Splide
      options={{		

				perPage: 2,
				arrows: false,
				pagination: false,
				gap: '1rem',
				type:'loop',
				drag: true,
				padding:'3rem'
      }}
			className="bg-slate-50 py-4 px-2 mt-2"
    >
			{
				mentors.map((mentor, index) =>
					<SplideSlide key={`mentor-${index}`}>
						<MentorCard {...mentor} />
					</SplideSlide>
				)
			}
		</Splide>
  )
}