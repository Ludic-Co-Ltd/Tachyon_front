import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Button from "../../components/button/Button";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import DropzoneFile from "../../components/form/DropzoneFile";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneCase, ShowCaseStudySave, getEventTicket } from "../../utils/actions";
import { Paths } from "../../config/Paths";

export default () => {
	const [todayCase, setTodayCase] = useState({});
	const { id } = useParams();
	const formData = new FormData();
	const navigate = useNavigate();
	const handleFileChange = (name, e) => {

		let file = e.target.files[0];

		if (file) {
			setTodayCase({ ...todayCase, [name]: file });
		}
	};
	useEffect(() => {

		fetchOneCase(id)
			.then(res => {
				if (res.status == 200) {
					setTodayCase(res.data);
				}
			})
			.catch(err => {
				console.log(err);
			});

	}, []);

	const save = () => {
		Object.keys(todayCase).map(key => {
			formData.append(key, todayCase[key]);
		});

		getEventTicket()
			.then(res => {
				if (res.status == 200) {
					if (window.confirm("ケースにチャレンジしますか？")) {
						if (todayCase.file_path == "") {
							alert("添付ファイルを選択する必要があります。");
							return false;
						}
						if (res.data.case_ticket_number < 1) {
							toastr.error('ケースチケットを購入する必要があります。');
							return false
						}

						ShowCaseStudySave(formData)
							.then(res => {
								if (res.status == 200) {
									toastr.success('ケースにチャレンジします。');
									navigate(Paths.selectionSolution);
									return;
								}
							})
							.catch(err => {
								console.log(err);
							});

					}
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<section className="">



			{Object.keys(todayCase).length > 0 &&
				<div className="my-4 bg-white">
					<button onClick={() => navigate(-1)}>
						<div className="flex text-base py-2">
							<ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
						</div>
					</button>
					<h5 className="text-primary font-bold p-2 text-center">{todayCase.question}</h5>
					<div className="mx-5">
						<div className="text-primary font-bold text-sm mt-3">ケース時思考時間</div>
						<p>{todayCase.thinking_time}分</p>
						<div className="text-primary font-bold text-sm mt-3">出題企業</div>
						<p>{todayCase.company.name}</p>
					</div>
					<div className="p-6">
						<DropzoneFile name="file_path" value={todayCase.file_path} handleChange={handleFileChange} />
					</div>
				</div>
			}
			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button title="提出する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={save} />
			</div>

		</section>
	)
}