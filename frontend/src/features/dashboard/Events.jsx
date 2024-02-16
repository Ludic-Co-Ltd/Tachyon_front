import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import EventCard from "./EventCard";
import EventReservationCard from "./EventReservationCard";
import CompanyCard from "../selection/CompanyCard";
import AdminCompanyCard from "../selection/AdminCompanyCard";
import { displayWeekday } from "../../utils/textDisplay";

export default (props) => {
	const { events, event_reservations, companies, perPage, category, padding } = props;
	return (
		<Splide
			options={{
				perPage: perPage?perPage:1,
				// arrows: category=='reservation'?true:false,
				arrows: false,
				pagination: false,
				type: category=='admin_industry'?'':'loop',
				gap: '1rem',
				drag: true,				
				padding:padding?padding:'5rem'
			}}
			className={`px-2 mt-2 ${category == 'industry'?'bg-transparent':'bg-transparent'}`}
		>
		{category == 'reservation'?
			event_reservations&&event_reservations.map((reservation, index) =>
				<SplideSlide key={`reservation-${index}`}>
					<EventReservationCard {...reservation}/>
				</SplideSlide>
			):category == 'industry'?
			companies&&companies.map((company, index) =>
				<SplideSlide key={`company-${index}`}>
					<CompanyCard {...company}/>
				</SplideSlide>
			):category == 'admin_industry'?
			companies&&companies.map((company, index) =>
				<SplideSlide key={`company-${index}`}>
					<AdminCompanyCard {...company}/>
				</SplideSlide>
			):
			events&&Object.keys(events).length>0&&Object.keys(events).map((key, index) =>{
				return events[key].map((event, index)=>(
					<SplideSlide key={`event-${event.id}`}>
						<EventCard {...event} index={index} weekday={displayWeekday(key)} />
					</SplideSlide>
					))
			})
		}
		</Splide>
	)
}