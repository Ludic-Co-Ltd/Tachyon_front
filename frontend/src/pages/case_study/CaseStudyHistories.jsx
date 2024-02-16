import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import companyData from "../../data/company/companies.json";
import CaseStudyEditCard from "../../features/case_study/CaseStudyEditCard";
import { fetchMyEditCases } from '../../utils/actions';
import { backendUrl } from "../../utils/textDisplay";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';

export default () => {
	const [caseStudies, setCaseStudies] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchMyEditCases()
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
				<Heading title="ケース添削一覧" />
				<div className="my-2">
					{
						caseStudies && caseStudies.length > 0 && caseStudies.map((caseStudy, index) =>
							<CaseStudyEditCard {...caseStudy} key={`case-study-${index}`} />
						)
					}
				</div>
			</div>
		</section>
	)
}