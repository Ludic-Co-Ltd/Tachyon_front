import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import CompanyCard from "../../components/card/CompanyCard";

export default (props) => {
	const { companies } = props

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
				companies.map((company, index) =>
					<SplideSlide key={`company-${index}`}>
						<CompanyCard {...company} />
					</SplideSlide>
				)
			}
		</Splide>
  )
}