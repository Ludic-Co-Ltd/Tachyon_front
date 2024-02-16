import React, { useState, useEffect } from "react";

import Heading from "../../components/partials/Heading";
import EsCard from "../../features/entry_sheet/EsCard";
import { fetchMyES } from '../../utils/actions';
import { backendUrl } from "../../utils/textDisplay";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';

export default () => {
	const [caseStudies, setCaseStudies] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchMyES()
			.then((res) => {
				setCaseStudies(res.data);
			})
			.catch(err => {
				console.log(err);
			});

	}, []);
	return (
		<section className="mb-32">
			<div className="py-5">
				<button onClick={() => navigate(-1)}>
					<div className="flex text-base py-2">
						<ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
					</div>
				</button>
				<Heading title="ES添削一覧" />
				<div className="py-2">
					{
						caseStudies && caseStudies.length > 0 && caseStudies.map((caseStudy, index) =>
							<EsCard {...caseStudy} key={`event-${index}`} />
						)
					}
				</div>
			</div>
		</section>
	)
}