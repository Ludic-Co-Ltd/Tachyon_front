import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import CaseStudyCard from "./CaseStudyCard";

export default (props) => {
	const { caseStudies } = props

  return (
    <Splide
      options={{
				perPage: 2.5,
				arrows: false,
				pagination: false,
				gap: '1rem',
				drag: true
      }}
    >
			{
				caseStudies.map((event, index) =>
					<SplideSlide key={`event-${index}`}>
						<CaseStudyCard {...event} />
					</SplideSlide>
				)
			}
		</Splide>
  )
}