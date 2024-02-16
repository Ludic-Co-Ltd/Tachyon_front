import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import EventCard from "./EventCard";

export default (props) => {
	const { events } = props

  return (
    <Splide className="p-3"
      options={{
				perPage: 1,
				arrows: false,
				pagination: false,
				gap: '1rem',
				drag: true,
				type:'loop',
				padding:'5rem'

      }}
    >
			{
				events.map((event, index) =>
					<SplideSlide key={`event-${index}`}>
						<EventCard {...event} />
					</SplideSlide>
				)
			}
		</Splide>
  )
}