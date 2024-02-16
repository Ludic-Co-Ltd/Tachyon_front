import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/TextArea";
import { registerMentor, fetchOneMentor, updateOneMentor, deleteOneMentor } from "../../utils/actions";
import { genderOptions } from "../../utils/textDisplay";


const MentorEdit = () => {

	const [mentor, setMentor] = useState({
		id: '',
		email: '',
		password: '',
		first_name: '',
		last_name: '',
		birth_date: '2000-01-01',
		gender: 1,
		university: '',
		faculty: '',
		zoom_url: '',
		department:	'',
		job_offer_1:	'',
		job_offer_2:	'',
		user_name: '',
		line_url: '',
		timerex_url: '',
		timerex_url_short: '',
		self_introduction: '',
	});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
	
		id && fetchOneMentor(id)
			.then((res) => {
				setMentor(res);
			})
			.catch(err => {
				console.log(err);
			});
	}, [id]);

	const handleChange = (name, value) => {
		setMentor({ ...mentor, [name]: value });
	};

	const handleSelect = (name, value) => {
		setMentor({ ...mentor, [name]: value });
	};

	const handleSave = () => {
		if (id) {
			delete mentor.password_confirm
			updateOneMentor(id, mentor)
				.then(res => {
					console.log('udpate res', res);
					if (res.status && res.status == 200) {
						toastr.success('メンター情報が正常に更新されました。');
						navigate(Paths.adminMentors);
						return;
					}
					toastr.error('メンター情報の更新に失敗しました。');
				})
				.catch(err => {
					console.log('update err', err);
					toastr.error('メンター情報の更新に失敗しました。');
				});
			
		} else {
			registerMentor(mentor)
				.then(res=>{
					console.log('register res', res);
					if (res.status && res.status == 200) {
						toastr.success('メンター情報が正常に登録されました。');
						navigate(Paths.adminMentors);
						return;
					}
					toastr.error('メンター情報の登録に失敗しました。');
				})
				.catch(err => {
					console.log('register err', err);
					toastr.error('メンター情報の登録に失敗しました。');
				});
		}
	};

	const handleDelete = () => {
		window.confirm('本当に削除しますか？') && deleteOneMentor(id)
		.then(res => {
			console.log('res', res);
			if (res.status && (res.status === 200 || res.status === 204)) {
				toastr.success('メンター情報が削除されました。');
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

	const handleCancel = () => {
		console.log(id);
		fetchOneMentor(id)
			.then((res) => {
				setMentor(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-6">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="last_name" label="姓" type="text" value={mentor.last_name} handleChange={handleChange} />
						<AdminInput name="first_name" label="名" type="text" value={mentor.first_name} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="birth_date" label="生年月日" type="date" value={mentor.birth_date} handleChange={handleChange} />
						<Select name="gender" label="性別" options={genderOptions} selectedValue={mentor.gender} handleChange={handleSelect} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="email" label="メールアドレス" type="email" value={mentor.email} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="password" label="パスワード" type="password" handleChange={handleChange} />
						<AdminInput name="password_confirm" label="確認パスワード" type="password" handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-3 gap-10 my-3">
						<AdminInput name="university" label="所属大学" type="text" value={mentor.university} handleChange={handleChange} />
						<AdminInput name="faculty" label="学部" type="text" value={mentor.faculty} handleChange={handleChange} />
						<AdminInput name="department" label="学科" type="text" value={mentor.department} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-3 gap-10 my-3">
						<AdminInput name="graduation_year" label="卒業年度" type="number" value={mentor.graduation_year} handleChange={handleChange} />
						<AdminInput name="job_offer_1" label="内定先1" type="text" value={mentor.job_offer_1} handleChange={handleChange} />
						<AdminInput name="job_offer_2" label="内定先2" type="text" value={mentor.job_offer_2} handleChange={handleChange} />
					</div>
				</Card>
			</div>
			<div className="col-span-6">
				<Card>
					<CardTitle title="詳細情報" />
					<div className="my-3">
						<div className="grid grid-cols-2 gap-10 my-3">
							<AdminInput name="user_name" label="ユーザー名" type="text" value={mentor.user_name} handleChange={handleChange} />
							<AdminInput name="line_url" label="LINE URL" type="text" value={mentor.line_url} handleChange={handleChange} />
						</div>
						<div className="grid grid-cols-2 gap-10 my-3">
							<AdminInput name="timerex_url" label="TimeRexURL(60分)" type="text" value={mentor.timerex_url} handleChange={handleChange} />
							<AdminInput name="timerex_url_short" label="TimeRexURL(20分)" type="text" value={mentor.timerex_url_short} handleChange={handleChange} />
						</div>
						<div className="grid grid-cols-1 gap-10 my-3">
							<AdminInput name="zoom_url" label="ZOOM URL" type="text" value={mentor.zoom_url} handleChange={handleChange} />							
						</div>
						<div className="grid grid-cols-1 gap-10 my-3">
							<TextArea name="self_introduction" label="自己紹介" rows={7} value={mentor.self_introduction} handleChange={handleChange} />
						</div>
					</div>
				</Card>
				<div className="flex flex-wrap justify-end gap-5 my-5">
					<Button title="保存" bgColor="bg-blue-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleSave} />
					{
						id &&
						<>
							<Button title="削除" bgColor="bg-red-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleDelete} />
							<Button title="キャンセル" bgColor="bg-green-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleCancel} />
						</>	
					}
				</div>
			</div>
		</div>
	)
}

export default MentorEdit;