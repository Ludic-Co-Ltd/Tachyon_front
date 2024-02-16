import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Button from "../../components/button/Button";
import DropzoneFile from "../../components/form/DropzoneFileES";
import Select from "../../components/form/Select";
import { Card } from "../../components/partials/Card";
import AdminInput from "../../components/form/AdminInput";
import { fetchAllCompany, getEventTicket, EsRegister } from "../../utils/actions";
import { Paths } from "../../config/Paths";

export default () => {
	const navigate = useNavigate();
	const [entrySheet, setEntrySheet] = useState({
		company_id: '',
		period: moment().format('YYYY-MM-DD'),
		file_path: ''
	});
	const formData = new FormData();
	const [options, setOptions] = useState([]);


	const handleFileChange = (name, e) => {

		let file = e.target.files[0];

		if (file) {
			setEntrySheet({ ...entrySheet, [name]: file });
		}
	};
	const handleCaseChange = (field, value) => {
		setEntrySheet({ ...entrySheet, [field]: value });
	};

	useEffect(() => {

		fetchAllCompany()
			.then(res => {

				let options1 = [];

				res.forEach(r => {
					let op = {
						name: r.name,
						value: r.id
					};

					options1.push(op)
				});

				setOptions(options1);

			})
			.catch(err => {
				console.log(err);
			});

	}, []);

	const save = () => {

		Object.keys(entrySheet).map(key => {
			formData.append(key, entrySheet[key]);
		});

		getEventTicket()
			.then(res => {
				if (res.status == 200) {
					// toastr.success('イベントが追加されました。');
					// navigate("../dashboard")
					// return;
					console.log(res.data.es_ticket_number);
					if (res.data.es_ticket_number < 1) {
						toastr.error('ESチケットを購入する必要があります。');
						return false
					}
					if (entrySheet.company_id == "") {
						alert("企業を選択する必要があります。");
						return false;
					}
					if (entrySheet.file_path == "") {
						alert("添付ファイルを選択する必要があります。");
						return false;
					}
					if (window.confirm("ESを添削しますか？")) {						

						EsRegister(formData)
							.then(res => {
								if (res.status == 200) {
									toastr.success('ESを添削しました。');
									navigate(Paths.reservation)
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
			<div className="py-2 mt-4">
				<Heading title="ES添削" />
			</div>


			<div className="bg-white m-2 p-4">
				<div className="grid grid-cols-1 my-3">
					<Select name="company_id" label="企業名" options={options} value={entrySheet.company_id} handleChange={handleCaseChange} />
				</div>
				<div className="grid grid-cols-1 my-3">
					<AdminInput name="period" label="提出期限" type="date" value={entrySheet.period} handleChange={handleCaseChange} />
				</div>
				<div className="grid grid-cols-1 my-3 bg-white">
					<DropzoneFile name="file_path" value={entrySheet.file_path} handleChange={handleFileChange} />
				</div>
			</div>

			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button title="提出する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={save} />
			</div>

		</section>
	)
}