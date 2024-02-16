import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from '../../config/Paths';
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import InputFileUpload from "../../components/form/InputFileUpload";
import TextArea from "../../components/form/TextArea";
import { fetchOneCompany, fetchAllIndustries, updateOneCompany, createCompany, deleteOneCompany } from "../../utils/actions";
import { backendUrl } from "../../utils/textDisplay";

const SelInfoEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const formData = new FormData();

	const [company, setCompany] = useState({
		id: '',
		industry_id: 1,
		name: '',
		overview: '',
		logo_path: '',
	});	
	const [initialCompany, setInitialCompany] = useState({
		id: '',
		industry_id: 1,
		name: '',
		overview: '',
		logo_path: '',
	});
	const [industryOptions, setIndustryOptions] = useState([]);
	const [image, setImage] = useState(null);
	
	const handleMainChange = (field, value) => {
		setCompany({ ...company, [field]: value });
	};

	const handleSelect = (name, value) => {
		setCompany({...company, [name]: value});
	};

	const handleFileChange = (e) => {

		let file = e.target.files[0];

		if (file) {
			formData.append('logo', file);
			setCompany({ ...company, logo: file });

			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		} else {

		}
	}
		
	const handleUpdate = () => {
		Object.keys(company).map(key => {
			formData.append(key, company[key]);
		});

		if (id) {
			updateOneCompany(id, formData)
			.then(res => {
				if (res.status && res.status == 200) {
					toastr.success('企業情報が正常に更新されました。');
					navigate(Paths.adminSIs);
					return;
				}
				toastr.error('企業情報の更新に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('企業情報の更新に失敗しました。');
			});
		} else {
			createCompany(formData)
			.then(res => {
				if (res.status && res.status == 200) {
					toastr.success('企業情報が正常に更新されました。');
					navigate(Paths.adminSIs);
					return;
				}
				toastr.error('企業情報の更新に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('企業情報の更新に失敗しました。');
			});
		}
	};

	const handleDelete = () => {
		window.confirm('本当に削除しますか？') && deleteOneCompany(id)
		.then(res => {
			console.log('res', res);
			if (res.status && (res.status === 200 || res.status === 204)) {
				toastr.success('カンパニー情報が削除されました。');
				navigate(Paths.adminMentors);
				return;
			}
			toastr.error('メンター情報の削除に失敗しました。');
		})
		.catch(err => {
			console.log('err', err);
			toastr.error('メンター情報の削除に失敗しました。');
		});
	};

	useEffect(() => {

		id && fetchOneCompany(id)
			.then(companyRes => {
				if(companyRes.status == 200) {
					setCompany(companyRes.data);
					setInitialCompany(companyRes.data);
				}
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllIndustries()
			.then(industriesRes => {
				if(industriesRes.status == 200) {
					let industryData = industriesRes.data.map((item) => (
						{value:item.id, name: item.name}
					));
					setIndustryOptions(industryData);
				}
			})
			.catch(err => {
				console.log(err);
			});
			
	}, [id]);

	return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-12">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<Select
							name="industry_id"
							label="業界"
							options={industryOptions}
							selectedValue={company.industry_id}
							handleChange={handleSelect}
						/>
						<AdminInput
							name="name"
							label="会社名"
							type="text"
							value={company.name}
							handleChange={handleMainChange}
						/>
					</div>
					<div className="my-3 flex gap-10 items-end">
						<InputFileUpload 
							name="logo_path" 
							label="企業ロゴ" 
							type="file" 
							value={company.logo_path} 
							handleChange={handleFileChange} 
						/>
						{image &&
							<img src={image} className='border border-slate-300 w-32 h-32 p-1 mb-4' />
						}
						{!image && id && company.logo_path &&
							<img src={backendUrl + company.logo_path} className='border border-slate-300 w-32 h-32 p-1 mb-4' />
						}
					</div>
					<div className="my-3">
						<TextArea 
							name="overview" 
							label="企業概要" 
							value={company.overview} 
							handleChange={handleMainChange} 
						/>
					</div>					
					<div className="flex flex-wrap justify-end gap-5 my-5">
						<Button
							title="保存"
							bgColor="bg-blue-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleUpdate}
						/>
						{/* <Button
							title="削除"
							bgColor="bg-red-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleDelete}
						/> */}
						<Button
							title="キャンセル"
							bgColor="bg-orange-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={()=>{setCompany(initialCompany);setImage(null);}}
						/>
					</div>
				</Card>
			</div>
		</div>
	)
};

export default SelInfoEdit;