import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/TextArea";
import { fetchOneCase } from "../../utils/actions";
import { fetchAllCompany, fetchAllMentors } from "../../utils/actions";
import { caseCreate } from "../../utils/actions";
import { useParams } from 'react-router-dom';
import { Paths } from "../../config/Paths";
import InputFileUpload from "../../components/form/InputFileUpload";


export default function CaseStudyEdit() {
	const navigate = useNavigate();
	const [casestudy, setCasestudy] = useState({});
	const [companyOptions, setCompanyOptions] = useState([]);
	const [mentorOptions, setMentorOptions] = useState([]);
	const formData = new FormData();

	const handleCaseChange = (field, value) => {
		setCasestudy({ ...casestudy, [field]: value });
	};

	const { id } = useParams();

	const caseSave = () => {
		
		if(casestudy.start_date == ""){
			alert("公開日時を入力する必要があります。");
			return false;
		}
		if(casestudy.end_date == ""){
			alert("終了日時を入力する必要があります。");
			return false;
		}
		if(casestudy.thinking_time == ""){
			alert("思考時間を入力する必要があります。");
			return false;
		}
		if(casestudy.company_id == ""){
			alert("企業名を入力する必要があります。");
			return false;
		}
		if(casestudy.question == ""){
			alert("ケースお題を入力する必要があります。");
			return false;
		}
		if(casestudy.content == ""){
			alert("備考を入力する必要があります。");
			return false;
		}

		Object.keys(casestudy).map(key => {
			formData.append(key, casestudy[key]);
		});

		caseCreate(id, casestudy)
			.then(res => {
				if (res.status && res.status == 200) {
					toastr.success('ケース情報が正常に更新されました。');
					navigate(Paths.adminCaseStudies);
					return;
				}
				toastr.error('ケース情報の更新に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('ケース情報の更新に失敗しました。');
			});
	}

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

				setCompanyOptions(options1);				

			})
			.catch(err => {
				console.log(err);
			});

		fetchAllMentors()
			.then(( mentorRes) => {
				if(mentorRes.status == 200){
					let mentorData = mentorRes.data.map(item => {
						return {
							value : item.id,
							name : item.user_name
						}
					});
					setMentorOptions(mentorData);
				}
			})
			.catch(err => {
				console.log(err);
			});

		if (id > 0) {
			
			fetchOneCase(id)
				.then(res => {
					if(res.status == 200){
						setCasestudy({
							id:res.data.id,
							company_id:res.data.company_id,
							mentor_id:res.data.mentor_id,
							start_date:res.data.start_date,
							end_date:res.data.end_date,
							question:res.data.question,
							content:res.data.content,
							thinking_time:res.data.thinking_time,
							materials_path:res.data.materials_path,
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const currentDate = moment().format('YYYY-MM-DD');
			const nextDate = moment().add(1, 'days').format('YYYY-MM-DD');

			setCasestudy({
				start_date: currentDate,
				end_date: nextDate,
				thinking_time: 1,
				company_id: '',
				mentor_id:'',
				question: '',
				content: '',
				materials_path: '',
				material: null,
			});
		}
	}, []);

	const handleFileChange = (e, category) => {

		let file = e.target.files[0];

		if (file) {
			// const allowedTypes = ['application/jpg'];

			// if (allowedTypes.includes(file.type)) {
				formData.append('material', file);
				setCasestudy({ ...casestudy, material: file, materials_path: file.name });
			// } else {
			// 	toastr.error('PDFファイルを選択してください。');
			// }
		}
	};

	return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-12">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="start_date" label="公開日時" type="date" value={casestudy.start_date} handleChange={handleCaseChange} />
						<AdminInput name="end_date" label="終了日時" type="date" value={casestudy.end_date} handleChange={handleCaseChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<Select name="company_id" label="企業名" options={companyOptions}  selectedValue={casestudy.company_id} handleChange={handleCaseChange}/>
						<Select name="mentor_id" label="メンター名" options={mentorOptions}  selectedValue={casestudy.mentor_id} handleChange={handleCaseChange}/>
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="thinking_time" label="思考時間" type="number" value={casestudy.thinking_time} handleChange={handleCaseChange} />
						<AdminInput name="question" label="ケースお題" type="text" value={casestudy.question} handleChange={handleCaseChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<InputFileUpload name="materials_path" label="ロゴ" type="file" value={casestudy.materials_path} handleChange={(e) => handleFileChange(e, 'image')} />
						<TextArea name="content" label="備考" value={casestudy.content} handleChange={handleCaseChange}/>
					</div>
					<div className="flex flex-wrap justify-end gap-5 my-5">
						<Button
							title="保 存"
							bgColor="bg-blue-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={caseSave}
						/>
					</div>
				</Card>
			</div>
		</div>
	)
}