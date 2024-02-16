import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from '../../config/Paths';
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import { fetchOneMentee, updateOneMentee, deleteOneMentee, fetchAllIndustries, fetchAllMentors, createUser, updateMenteeTicket } from "../../utils/actions";
import { genderOptions } from "../../utils/textDisplay";

const MenteeEdit = () => {

	const [userMain, setUserMain] = useState({
		id: '',
		last_name: '',
		first_name: '',
		birth_date: '2000-01-01',
		gender: 1,
		email: '',
		password: '',
		confirm_password: '',
		plan_id: 1,
		mentor_id: '',
		university: '',
		faculty: '',
		department: '',
		graduation_year: '',
		industry_id_1: 1,
		industry_id_2: 2,
	});

	const [userTicket, setUserTicket] = useState({
		rest_es_ticket_number: 0,
		rest_case_ticket_number: 0,
		rest_event_ticket_number: 0,
		rest_short_interview_ticket_number: 0,
		rest_interview_ticket_number: 0,
		es_ticket_number: 0,
		case_ticket_number: 0,
		event_ticket_number: 0,
		short_interview_ticket_number: 0,
		interview_ticket_number: 0,
	});

	const [mentorOptions, setMentorOptions] = useState([]);
	const [industryOptions, setIndustryOptions] = useState([]);
	const [error, setError] = useState('')

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {

		id && fetchOneMentee(id)
			.then((menteeRes) => {
				setUserMain({
					id: menteeRes.id,
					last_name: menteeRes.last_name,
					first_name: menteeRes.first_name,
					birth_date: menteeRes.birth_date,
					gender: menteeRes.gender,
					email: menteeRes.email,
					password: '',
					confirm_password: '',
					plan_id: menteeRes.plan_id,
					mentor_id: menteeRes.mentor_id,
					university: menteeRes.university,
					faculty: menteeRes.faculty,
					department: menteeRes.department,
					graduation_year: menteeRes.graduation_year,
					industry_id_1: menteeRes.industry_id_1,
					industry_id_2: menteeRes.industry_id_2
				});

				var user_tickets = menteeRes.user_tickets;
				setUserTicket({
					rest_interview_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.interview_ticket_number, 0) : 0,
					rest_event_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.event_ticket_number, 0) : 0,
					rest_es_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.es_ticket_number, 0) : 0,
					// rest_short_interview_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.short_interview_ticket_number, 0) : 0,
					rest_case_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.case_ticket_number, 0) : 0,
				});
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllIndustries()
			.then((industriesRes) => {
				let industryData = industriesRes.data.map((item) => (
					{ value: item.id, name: item.name }
				));
				setIndustryOptions(industryData);
			})
			.catch(err => {
				console.log(err);
			});
		fetchAllMentors()
			.then((mentorsRes) => {
				mentorsRes.data.map((item) => {
					item.value = item.id;
					item.name = item.user_name;
				});
				setMentorOptions([...mentorsRes.data]);
			})
			.catch(err => {
				console.log(err);
			});
	}, [id]);

	const handleMainChange = (field, value) => {
		setUserMain({ ...userMain, [field]: value });
	};

	const handleTicketChange = (field, value) => {
		setUserTicket({ ...userTicket, [field]: value });
	};

	const handleSelect = (name, value) => {
		setUserMain({ ...userMain, [name]: value });
	};

	const handleCancel = () => {
		fetchOneMentee(id)
			.then(res => {
				setUserMain({
					id: res.id,
					last_name: res.last_name,
					first_name: res.first_name,
					birth_date: res.birth_date,
					gender: res.gender,
					email: res.email,
					password: '',
					confirm_password: '',
					plan_id: res.plan_id,
					mentor_id: res.mentor_id,
					university: res.university,
					faculty: res.faculty,
					department: res.department,
					graduation_year: res.graduation_year,
					industry_id_1: res.industry_id_1,
					industry_id_2: res.industry_id_2
				});
				setUserTicket({ ...res.user_tickets[0] });
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleCancelTicket = () => {
		// fetchOneMentee(id)
		// 	.then(menteeRes => {
		// 		var user_tickets = menteeRes.user_tickets;
		// 		setUserTicket({
		// 			rest_interview_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.interview_ticket_number, 0) : 0,
		// 			rest_event_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.event_ticket_number, 0) : 0,
		// 			rest_es_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.es_ticket_number, 0) : 0,
		// 			rest_short_interview_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.short_interview_ticket_number, 0) : 0,
		// 			rest_case_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.case_ticket_number, 0) : 0,
		// 			es_ticket_number: 0,
		// 			case_ticket_number: 0,
		// 			event_ticket_number: 0,
		// 			short_interview_ticket_number: 0,
		// 			interview_ticket_number: 0
		// 		});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	};

	const handleUpdate = () => {
		if (id != undefined && id > 0) {
			if(userMain.password.length>0&&(userMain.password.length<8 || userMain.password != userMain.confirm_password)){
				toastr.error('パスワードを正しく入力してください。');
				return;
			}
			delete userMain.confirm_password;
			updateOneMentee(id, userMain)
				.then(res => {
					console.log('update res', res);
					if (res.status && res.status == 200) {
						toastr.success('メンティー情報が正常に更新されました。');
						navigate(Paths.adminMentees);
						return;
					}
					toastr.error('メンティー情報の更新に失敗しました。');
				})
				.catch(err => {
					console.log('update err', err);
					toastr.error('メンティー情報の更新に失敗しました。');
				});
		} else {
			
			delete userMain.id;

			createUser(userMain)
				.then(res => {
					console.log('update res', res);
					if (res.status && res.status == 200) {
						toastr.success('メンティー情報が正常に更新されました。');
						navigate(Paths.adminMentees);
						return;
					}
					toastr.error('メンティー情報の更新に失敗しました。');
				})
				.catch(err => {
					console.log('update err', err);
					toastr.error('メンティー情報の更新に失敗しました。');
				});
		}
	};

	const handleDeleteMentee = () => {
		window.confirm('本当に削除しますか？') && deleteOneMentee(id)
			.then(res => {
				console.log('delete res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('メンティー情報が削除されました。');
					navigate(Paths.adminMentees);
					return;
				}
				toastr.error('メンティー情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('delete err', err);
				toastr.error('メンティー情報の削除に失敗しました。');
			});
	};

	const handleUpdateTicket = () => {
		updateMenteeTicket(id, userTicket)
			.then(res => {
				console.log('update res', res);
				if (res.status && res.status == 200) {
					toastr.success('チケット情報が正常に更新されました。');
					navigate(Paths.adminMentees);
					return;
				}
				else{
					toastr.error('チケット情報の更新に失敗しました。');
				} 
			})
			.catch(err => {
				console.log('update err', err);
				toastr.error('チケット情報の更新に失敗しました。');
			});
	};

	return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-8">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput
							name="last_name"
							label="姓"
							type="text"
							value={userMain.last_name}
							handleChange={handleMainChange}
						/>
						<AdminInput
							name="first_name"
							label="名"
							type="text"
							value={userMain.first_name}
							handleChange={handleMainChange}
						/>
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput
							name="birth_date"
							label="生年月日"
							type="date"
							value={userMain.birth_date}
							handleChange={handleMainChange}
						/>
						<Select
							name="gender"
							label="性別"
							selectedValue={userMain.gender}
							options={genderOptions}
							handleChange={handleSelect}
						/>
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput
							name="email"
							label="メールアドレス"
							type="email"
							value={userMain.email}
							handleChange={handleMainChange}
						/>
						<Select
							name="mentor_id"
							label="専属メンター"
							options={mentorOptions}
							selectedValue={userMain.mentor_id}
							handleChange={handleSelect}
						/>
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput
							name="password"
							label="パスワード"
							type="password"
							value={userMain.password}
							handleChange={handleMainChange}
						/>
						<AdminInput
							name="confirm_password"
							label="確認パスワード"
							type="password"
							value={userMain.confirm_password}
							handleChange={handleMainChange}
						/>
					</div>
					<div className="grid grid-cols-3 gap-10 my-3">
						<AdminInput
							name="university"
							label="所属大学"
							type="text"
							value={userMain.university}
							handleChange={handleMainChange}
						/>
						<AdminInput
							name="faculty"
							label="学部"
							type="text"
							value={userMain.faculty}
							handleChange={handleMainChange}
						/>
						<AdminInput
							name="department"
							label="学科"
							type="text"
							value={userMain.department}
							handleChange={handleMainChange}
						/>
					</div>
					<div className="grid grid-cols-3 gap-10 my-3">
						<AdminInput
							name="graduation_year"
							label="卒業年度" type="number"
							value={userMain.graduation_year}
							handleChange={handleMainChange}
						/>
						<Select
							name="industry_id_1"
							label="第一志望業界"
							options={industryOptions}
							selectedValue={userMain.industry_id_1}
							handleChange={handleSelect}
						/>
						<Select
							name="industry_id_2"
							label="第二志望業界"
							options={industryOptions}
							selectedValue={userMain.industry_id_2}
							handleChange={handleSelect}
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
						<Button
							title="削除"
							bgColor="bg-red-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleDeleteMentee}
						/>
						<Button
							title="キャンセル"
							bgColor="bg-orange-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleCancel}
						/>
					</div>
				</Card>
			</div>
			<div className="col-span-4">
				<Card>
					<CardTitle title="チケット情報" />
					<div className="my-3">
						<AdminInput
							name="event_ticket_number"
							label={"イベントチケット : " + userTicket.rest_event_ticket_number}
							type="number" value={userTicket.event_ticket_number}
							handleChange={handleTicketChange}
						/>
						<AdminInput
							name="es_ticket_number"
							label={"ES添削チケット : " + userTicket.rest_es_ticket_number}
							type="number" value={userTicket.es_ticket_number}
							handleChange={handleTicketChange}
						/>
						<AdminInput
							name="case_ticket_number"
							label={"ケース添削チケット : " + userTicket.rest_case_ticket_number}
							type="number" value={userTicket.case_ticket_number}
							handleChange={handleTicketChange}
						/>
						<AdminInput
							name="interview_ticket_number"
							label={"面談チケット : " + userTicket.rest_interview_ticket_number}
							type="number" value={userTicket.interview_ticket_number}
							handleChange={handleTicketChange}
						/>
					</div>
					<div className="flex flex-wrap justify-end gap-5 my-5">
						{/* <Button
							title="購入履歴"
							bgColor="bg-green-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleUpdateTicket}
						/> */}
						<Button
							title="保存"
							bgColor="bg-blue-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleUpdateTicket}
						/>
						<Button
							title="キャンセル"
							bgColor="bg-orange-400"
							bgColorHover="bg-orange-700"
							className="px-5 py-2.5 rounded-lg"
							handleClick={handleCancelTicket}
						/>
					</div>
				</Card>
			</div>
		</div>
	)
};

export default MenteeEdit;