import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/partials/Heading";
import AddButton from '../../components/partials/AddButton';
import { Paths } from "../../config/Paths";
import Footer from '../../components/partials/Footer';
import { fetchAllIndustries } from "../../utils/actions";
import Events from "../../features/dashboard/Events";

export default function SelectionStatus() {

	const [industries, setIndustries] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetchAllIndustries()
			.then(res => {
				if (res.status == 200) setIndustries(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="選考情報" />
					<AddButton href={Paths.adminCreateSI} />
				</div>
			</div>
			<div className="px-16">
				{
					industries.length && industries.map(industry => {
						if (industry.companies.length)
							return (<div className="my-4 pb-5" key={industry.id}>
								<h5 className="ml-5">{industry.name}</h5>
								<Events companies={industry.companies} category='admin_industry' perPage={9} />
							</div>)
					}
					)
				}
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
}