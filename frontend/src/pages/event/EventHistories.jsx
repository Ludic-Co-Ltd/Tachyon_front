import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Heading from "../../components/partials/Heading";
import EventCard from "../../features/event/EventCard";
import { fetchMyEvents } from '../../utils/actions';
import { backendUrl } from "../../utils/textDisplay";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';

export default () => {
	const [caseStudies, setCaseStudies] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchMyEvents()
			.then((res) => {
				setCaseStudies(res.data);
			})
			.catch(err => {
				console.log(err);
			});

	}, []);
	return (
		<section className="mt-4">
			<div className="">
				<button onClick={() => navigate(-1)}>
					<div className="flex text-base py-2">
						<ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
					</div>
				</button>
				<Heading title="おすすめイベント" />
				<div className="mt-2">
					{
						caseStudies && caseStudies.length > 0 && caseStudies.map((caseStudy, index) =>
							<EventCard {...caseStudy} key={`event-${index}`} />
						)
					}
				</div>
			</div>
		</section>
	)
}