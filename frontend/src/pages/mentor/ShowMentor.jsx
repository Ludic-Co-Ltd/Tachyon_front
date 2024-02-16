import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '../../assets/scss/auth/login.scss';
import { Paths } from "../../config/Paths";
import Heading from "../../components/partials/Heading";
import Account from "../../assets/images/account.png"
import Button from "../../components/button/Button";
import { fetchMentor, InterviewRegister, getEventTicket } from '../../utils/actions';
import AdminInput from "../../components/form/AdminInput";
import moment from 'moment';
// import { DateTimePicker } from '@mui/x-date-pickers-pro';

export default () => {
	const { id } = useParams();

	const [mentor, setMentor] = useState({});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const [interview, setInterview] = useState({
		mentor_id: id,
		zoom_url: 'zoom url',
		interview_date: moment().format('YYYY-MM-DD'),
		interview_time: moment().format('HH:mm:ss'),
	});

	const handleCaseChange = (field, value) => {
		setInterview({ ...interview, [field]: value });
	};
	const ApplyMentor = () => {
		if (window.confirm('面談を申し込みますか？')) {

			getEventTicket()
				.then(res => {
					if (res.status == 200) {
						
						console.log(res.data.interview_ticket_number);
						if (res.data.interview_ticket_number < 1) {
							toastr.error('面談チケットを購入する必要があります。');
							return false
						}

						InterviewRegister(interview)
							.then(res => {
								if (res.status == 200) {
									setError('');

									toastr.success('面談が申し込みました。');
									navigate(Paths.reservation)
									return;

								}
								else {
									setError(res.data.error);
									setSuccess(false);
								}
							})
							.catch(err => {
								console.log(err)
								// setError(err);
								setSuccess(false);
							});
					}
				})
				.catch(err => {
					console.log(err);
				});

		}
	}

	useEffect(() => {

		fetchMentor(id)
			.then(res => {
				if (res.status == 200) {
					setMentor(res.data);
				}
				else {
					setError(res.data.error)
				}
			})
			.catch(err => {
				console.log(err);
			});

	}, []);
	return (
		<section className="">
			<p className={`text-center text-sm text-green-700 mt-2`}>
				{success && '面談申込成功'}
			</p>
			<div className="mb-3 py-2">
				<Heading title="メンター基本情報" />
				<div className="bg-white shadow-md flex mt-2">
					<div className="p-5" style={{width:'400px'}}>
						<img src={Account} alt="mentor avatar" className="account-logo" />
						<p className="mt-5 text-sm">面談チケット1枚消費</p>
					</div>
					<div className="my-4 px-3 font-bold w-full"  xs={8}>
						<div className="mb-2">
							<h5 className="text-base">名前</h5>
							<h5>{mentor.last_name}{mentor.first_name}</h5>
						</div>
						<div className="mb-2">
							<h5 className="text-base">大学</h5>
							<h5>{mentor.university} {mentor.faculty}</h5>
						</div>
						<div className="mb-2">
							<h5 className="text-base">内定先</h5>
							<h5>{mentor.job_offer_1} {mentor.job_offer_2}</h5>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Heading title="自己紹介" />
				<p className="bg-white shadow-md mt-2 p-4">
					{mentor.self_introduction}
				</p>
			</div>
			<div>
				<p className="bg-white shadow-md mt-2 p-4">
					<h5 className="text-sm font-bold">面談予約時間設定</h5>
					<a href={mentor.timerex_url} target="blank">{mentor.timerex_url}</a>

					<h5 className="text-sm font-bold">Zoom URL</h5>
					<a href={mentor.timerex_url} target="blank">{mentor.zoom_url}</a>
					<div className="grid grid-cols-2 gap-5 my-3">
						<AdminInput name="interview_date" label="開始時間" type="date" value={interview.interview_date} handleChange={handleCaseChange} />
						<AdminInput name="interview_time" label="開始時間" type="time" value={interview.interview_time} handleChange={handleCaseChange} />
					</div>

				</p>

			</div>
			{/* <div>
				<DateTimePicker label="面接時間" />
			</div> */}
			{/* <AdminInput name="start_time" label="開始時間" type="datetime" value={evt.start_time} handleChange={handleChange} /> */}

			<p className={`text-center text-sm text-red-700 mt-2`}>
				{error}
			</p>
			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button
					title="面談申込"
					bgColor="bg-orange-400"
					bgColorHover="bg-orange-700"
					className="px-5 py-2.5 rounded-lg"
					handleClick={ApplyMentor}
				/>
			</div>
		</section>
	)
}