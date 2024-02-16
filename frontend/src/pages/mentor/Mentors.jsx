import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@mui/material'
import { Paths } from "../../config/Paths";
import Heading from "../../components/partials/Heading";
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import AddButton from '../../components/partials/AddButton';
import Select from "../../components/form/Select";
import EditButton from '../../components/partials/EditButton';
// import Button from "../../components/button/Button";
import DeleteButton from "../../components/partials/DeleteButton";
import Footer from '../../components/partials/Footer';
import SalaryModal from "../../components/modal/SalaryModal";
import { fetchAllMentorsEvent, deleteOneMentor, changeSalary } from "../../utils/actions";
import AdminInput from "../../components/form/AdminInput";

export default function Mentors() {

	const [mentorTableBody, setMentorTableBody] = useState([]);
	const [mentorData, setMentorData] = useState([]);
	const navigate = useNavigate();

	const [data, setData] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	});

	const [yearOptions, setYearOptions] = useState([]);
	const [monthOptions, setMonthOptions] = useState([]);
	const [open, setOpen] = useState(false);
	// const { name, image_path, event_date, start_time, end_time, rating} = props;
	// const [open, setOpen] = useState(false);
	
	const handleSalary = (index, value) => {
		// console.log(index, value);
		console.log(mentorData)		
		mentorData[index].salary = parseInt(value);
		setMentorData([...mentorData]);
	};

	const salarySubmit = (index) =>{
		window.confirm('本当に変更しますか？') && changeSalary({...data,mentor:mentorData[index]})
			.then(res => {
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('月額が削除されました。');
					// navigate(Paths.adminMentees);
					// window.location.reload();
					return;
				}
				toastr.error('メンター情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('メンター情報の削除に失敗しました。');
			});
	}

	useEffect(() => {
		fetchAllMentorsEvent(data)
			.then((res) => {
				var mentors = [];
				
				setMentorData(res.data);				

				// mentorData.map(({ id, first_name, last_name, salary, users, interview, events, cases, ...mentor }, index) => {
				// 	var temp = {
				// 		id: id,
				// 		mentor_name: last_name + first_name,
				// 		salary: <AdminInput name={index}  type="number" value={salary} defaultValue={salary} handleChange={handleSalary} />,
				// 		users: users,
				// 		interviews: interview,
				// 		events: events,
				// 		cases: cases,
				// 		es: 0,
				// 		edit_salary_button: <Button handleClick={() => { handleSalary(id) }} title="月額" month={data.month} bgColor="bg-blue-400" style={{ height: '42px' }} className="px-5 py-1 rounded-lg"/>,
				// 		edit_button: <EditButton id={id} />,
				// 		delete_button: <DeleteButton id={id} handleClick={() => { handleDeleteMentor(id) }} />,
				// 	};
				// 	mentors.push(temp);
				// });
				
				// data.reverse().forEach(({id, salary}, index)=>{
				// 	setSalaries([...salaries, {id:id, salary:salary}]);
				// })
				// setMentorTableBody(mentors);
			})
			.catch(err => {
				console.log(err);
			});

		let setYearData = [];
		for (let y = 2026; y > 2023; y--) {
			setYearData = [...setYearData, { value: y, name: y + "年" }];
		}
		setYearOptions(setYearData)

		let setMonthData = [];
		for (let y = 1; y < 13; y++) {
			setMonthData = [...setMonthData, { value: y, name: y + "月" }];
		}
		setMonthOptions(setMonthData)
	}, []);

	const handleDeleteMentor = (id) => {
		window.confirm('本当に削除しますか？') && deleteOneMentor(id)
			.then(res => {
				console.log('res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('メンター情報が削除されました。');
					// navigate(Paths.adminMentees);
					window.location.reload();
					return;
				}
				toastr.error('メンター情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('メンター情報の削除に失敗しました。');
			});
	};

	const mentorTableContents = {
		head: ['メンター名', '月額', '今月専属人数', '今月面談数', '今月イベント数', '今月ケース作成数', '今月ES作成数'],
		body: mentorData.map(({ id, first_name, last_name, salary, users, interview, events, cases, ...mentor }, index) => {
			var temp = {
				id: id,
				mentor_name: last_name + first_name,
				salary: <AdminInput name={index}  type="number" value={salary} handleChange={handleSalary} />,
				users: users,
				interviews: interview,
				events: events,
				cases: cases,
				es: 0,
				edit_salary_button: <DeleteButton handleClick={() => salarySubmit(index)} title="月額変更" className="break-keep"/>,
				edit_button: <EditButton id={id} />,
				delete_button: <DeleteButton id={id} handleClick={() => { handleDeleteMentor(id) }} />,
			};
			return temp;
			// mentors.push(temp);
		})
	};

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	};
	const handleSubmit = () => {

		fetchAllMentorsEvent(data)
			.then((res) => {
				setMentorData(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="メンター" />
					<AddButton href={Paths.adminRegisterMentor} />
				</div>
			</div>
			<div className="px-16 pb-16">
				<div className="flex gap-2 items-end mt-2">
					<Select
						name="year"
						label=""
						options={yearOptions}
						handleChange={handleChange}
						className='mb-0'
						selectedValue={data.year}
					/>
					<Select
						name="month"
						label=""
						options={monthOptions}
						handleChange={handleChange}
						className='mb-0'
						selectedValue={data.month}
					/>
					<div>
						{/* <Button
							title="検索する"
							bgColor="bg-blue-400"
							className="px-5 py-0 rounded-lg "
							style={{ height: '40px' }}
							handleClick={handleSubmit}
						/> */}
						<Button component="label" variant="contained" endIcon={<SearchIcon />} onClick={handleSubmit}>
							検索する
						</Button>
						{/* <DeleteButton handleClick={handleSubmit} color='primary' title="検索する"/> */}
					</div>
				</div>
				<CustomPaginationActionsTable data={mentorTableContents} />
			</div>
			<SalaryModal {...data} open={open} setOpen={setOpen}/>
			<div className="mt-16">
				<Footer />
			</div>
			
		</section>
	)
}
