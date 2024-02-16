import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Heading from "../../components/partials/Heading";
import MypageForm from "../../features/mypage/MypageForm";
import MypageFormGrid from "../../features/mypage/MypageFormGrid";
import Select from "../../components/form/Select";
import Button from "../../components/button/Button";
import { genderOptions } from "../../utils/textDisplay";
import { Paths } from "../../config/Paths";
import { fetchAllMentors, fetchAllIndustries, updateMyInfo, fetchMyInfo } from "../../utils/actions";


export default () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirm: '',
		birth_date: '2000-01-01',
		gender: 1,
		university: '',
		faculty: '',
		department: '',
		graduation_year: '',
		industry_id_1: null,
		industry_id_2: null,
		mentor_id: null,
	});
	const [mentors, setMentors] = useState([]);
	const [industries, setIndustires] = useState([]);

	const [graduations, setGraduations] = useState([]);

	const [pageError, setPageError] = useState('');
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		birth_date: '',
		industry_id_1: '',
		industry_id_2: '',
		gender: '',
		mentor: ''
	})

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value })
	};

	const handleSubmit = async () => {
		setPageError('');
		setErrors({});
		// errorData={};
		if ('' === data.first_name || '' === data.last_name) {
			// setErrors({...errors, name:'名前は必須です。'});
			setErrors({ name: '名前は必須です。' });
			return;
		}

		if ('' === data.email) {
			// setErrors({...errors, email:'メールは必須です。'});
			setErrors({ email: 'メールは必須です。' });
			return;
		}

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
			// setErrors({...errors, email:'無効なメールです。'});
			setErrors({ email: '無効なメールです。' });
			return;
		}

		// if ("" === data.password || "" === data.password_confirm) {
		// 	// setErrors({...errors, email:'パスワードは必須です。'});
		// 	setErrors({ password: 'パスワードは必須です。' });
		// 	return;
		// }

		if ((data.password && data.password.length < 7) || (data.password_confirm && data.password_confirm.length < 7)) {
			// setErrors({...errors, email:'パスワードは8文字以上である必要があります。'});
			setErrors({ password: 'パスワードは8文字以上である必要があります。' });
			return;
		}

		if (data.password !== data.password_confirm) {
			// setErrors({...errors, email:'パスワードは8文字以上である必要があります。'});
			setErrors({ password: 'パスワードが一致しません。' });
			return;
		}

		if ('' === data.birth_date) {
			// setErrors({...errors, birth_date:'生年月日は必須です。'});
			setErrors({ birth_date: '生年月日は必須です。' });
			return;
		}

		if ('' === data.gender || !data.gender) {
			// setErrors({...errors, gender:'性別は必須です。'});
			setErrors({ gender: '性別は必須です。' });
			return;
		}

		if ('' === data.industry_id_1 || null === data.industry_id_1) {
			// setErrors({...errors, mentor:'専属メンターは必須です。'});
			setErrors({ industry_id_1: '第一志望業界は必須です。' });
			return;
		}

		if ('' === data.industry_id_2 || null === data.industry_id_2) {
			// setErrors({...errors, mentor:'専属メンターは必須です。'});
			setErrors({ industry_id_2: '第二志望業界は必須です。' });
			return;
		}

		if ('' === data.mentor_id || null === data.mentor_id) {
			// setErrors({...errors, mentor:'専属メンターは必須です。'});
			setErrors({ mentor: '専属メンターは必須です。' });
			return;
		}

		await updateMyInfo(data).then(res => {
			if (res.status && res.status == 200) {
				toastr.success('プロフィール情報が正常に更新されました。');
				navigate(Paths.mypage);
				return;
			}
			toastr.error('プロフィール情報の更新に失敗しました。');
		})
			.catch(err => {
				console.log('err', err);
				toastr.error('プロフィール情報の更新に失敗しました。');
			});
	}

	useEffect(() => {

		fetchMyInfo()
			.then((res) => {
				if (res.status == 200) {
					setData(JSON.parse(res.data.user))
				}
				else setPageError(res.response.data.error);
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllMentors()
			.then((res) => {
				if (res.status == 200) {
					let mentorData = [];
					res.data.map(item => {
						mentorData = [...mentorData, { value: item.id, name: item.last_name + ' ' + item.first_name }];
					})
					setMentors(mentorData)
				}
				else setPageError(res.response.data.error);
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllIndustries()
			.then((res) => {
				if (res.status == 200) {
					let industryData = [];
					res.data.map(item => {
						industryData = [...industryData, { value: item.id, name: item.name }];
					})
					setIndustires(industryData)
				}
				else setPageError(res.response.data.error);
			})
			.catch(err => {
				console.log(err);
			});

		let setGraduationsData = [];
		for (let y = 2026; y > 2023; y--) {
			setGraduationsData = [...setGraduationsData, { value: y, name: y }];
		}
		setGraduations(setGraduationsData)

	}, []);
	return (
		<section className="">
			<div className="grid h-screen max-w-lg grid-cols-1 mx-auto">
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-auto">
					<div className="">
						<Heading title="プロフィールの編集" />
					</div>
					<div className="">
						<div className="py-5">
							<div className="flex">
								<div className="my-4 pe-2 w-full">
									<MypageFormGrid
										name1="last_name"
										name2="first_name"
										placeholder1="姓"
										placeholder2="名"
										label="名前"
										type="text"
										value1={data.last_name}
										value2={data.first_name}
										onChange1={handleChange}
										onChange2={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.name}</label>
									<MypageForm
										name="email"
										label="メール"
										type="text"
										placeholder="メール"
										value={data.email}
										onChange={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.email}</label>
									<MypageFormGrid
										name1="password"
										name2="password_confirm"
										label="パスワード"
										placeholder1="パスワード"
										placeholder2="確認パスワード"
										type="password"
										onChange1={handleChange}
										onChange2={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.password}</label>
									<MypageForm
										name="birth_date"
										label="生年月日"
										type="date"
										onChange={handleChange}
										value={data.birth_date}
									/>
									<label className="text-sm text-red-700">{errors.birth_date}</label>
									<Select
										name="gender"
										label="性別"
										options={genderOptions}
										handleChange={handleChange}
										selectedValue={data.gender}
									/>
									<label className="text-sm text-red-700">{errors.gender}</label>
									<MypageFormGrid
										name1="university"
										name2="faculty"
										label="大学・学部"
										type="text"
										placeholder1="大学"
										placeholder2="学部"
										value1={data.university}
										value2={data.faculty}
										onChange1={handleChange}
										onChange2={handleChange}
									/>
									<div className="grid grid-cols-2 gap-5">
										<MypageForm
											name="department"
											label="学科"
											type="text"
											value={data.department}
											onChange={handleChange}
										/>
										{/* <MypageForm
											name="graduation_year"
											label="卒業年度"
											type="number"
											value={data.graduation_year}
											onChange={handleChange}
										/> */}
										<Select
											name="graduation_year"
											label="卒業年度"
											options={graduations}
											selectedValue={data.graduation_year}
											handleChange={handleChange}
										/>
									</div>
									<Select
										name="industry_id_1"
										label="第一志望業界"
										options={industries}
										selectedValue={data.industry_id_1}
										handleChange={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.industry_id_1}</label>
									<Select
										name="industry_id_2"
										label="第二志望業界"
										options={industries}
										selectedValue={data.industry_id_2}
										handleChange={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.industry_id_2}</label>
									<Select
										name="mentor_id"
										label="専属メンター"
										options={mentors}
										selectedValue={data.mentor_id}
										handleChange={handleChange}
									/>
									<label className="text-sm text-red-700">{errors.mentor}</label>
								</div>
							</div>
							<div className="flex flex-wrap justify-center gap-5 my-4">
								<Button
									title="編 集"
									bgColor="bg-blue-400"
									className="px-5 py-2.5 rounded-lg"
									handleClick={handleSubmit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}