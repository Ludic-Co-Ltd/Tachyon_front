import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Button from "../../components/button/Button";
import { useParams } from 'react-router-dom';
import DropzoneFile from "../../components/form/DropzoneFile";
import AdminInput from "../../components/form/AdminInput";
import Select from "../../components/form/Select";
import { fetchOneCompany, fetchAllCompany } from "../../utils/actions";


export default () => {
	const { id } = useParams();
	const [correction, setCorrection] = useState({});
	const [options, setOptions] = useState([]);

	const handleCaseChange = (field, value) => {
		setCorrection({ ...correction, [field]: value });
	};
	useEffect(() => {
		fetchAllCompany()
			.then(res => {
				console.log(">>>", res);

				let options1 = [{ name: '', value: 0 }];

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
		fetchOneCompany(id)
			.then(res => {
				//alert(res.name);
				if(res.status == 200)
				setCorrection({
					question: '',
					company_id: res.data.id,
					add_file: ''
				});

			})
			.catch(err => {
				console.log(err);
			});



	}, []);
	const esAddFunc = () => {

		if (window.confirm("ES添削を参加しますか？")) {
			
			console.log(">>>>>>", correction);
			if (correction.question == "") {
				alert("期間を入力する必要があります。");
				return false;
			}
			if (correction.add_file == "") {
				alert("添付ファイルを入力する必要があります。");
				return false;
			}

			//   eventAdd(id)
			// 	.then(res => {

			// 	})
			// 	.catch(err => {
			// 	  console.log(err);
			// 	});
		}
	};
	return (
		<section className="">
			<div className="">
				<Heading title="ES添削" />
			</div>
			<div className="my-4 bg-white">
				<div className="p-5">
					{/* <AdminInput name="name" label="企業名" type="text" value={correction.name} handleChange={handleCaseChange} /> */}
					<Select name="company_id" label="企業名" options={options} value={correction.company_id} handleChange={handleCaseChange} />
					<AdminInput name="question" label="期間" type="text" value={correction.question} handleChange={handleCaseChange} />
					<div className="">
						<DropzoneFile name="add_file" value={correction.add_file} handleChange={handleCaseChange} />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button title="提出する" label="添付ファイル"  bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={() => esAddFunc()} />
			</div>
		</section>
	)
}