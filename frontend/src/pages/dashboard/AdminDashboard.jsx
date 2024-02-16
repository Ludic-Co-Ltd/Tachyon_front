import React, { useState, useEffect } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import moment from "moment";
import Heading from "../../components/partials/Heading";
import Footer from '../../components/partials/Footer';
import BasicTabs from "../../components/partials/Tab";
import Select from "../../components/form/Select";
import SearchIcon from '@mui/icons-material/Search';
import ContentCard from "../../features/dashboard/ContentCard";
import {Button} from '@mui/material'
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import { fetchAllTickets, allowPurchaseTickets, fetchAllMentees } from "../../utils/actions";
import CustomButton from "../../components/partials/CustomButton";


export default function TicketHistory() {

	const [data, setData] = useState({
		mentee: '',
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	});

	const [menteeOptions, setMenteeOptions] = useState([]);
	const [yearOptions, setYearOptions] = useState([]);
	const [monthOptions, setMonthOptions] = useState([]);

	const [costBuy, setCostBuy] = useState(20000);
	const [costPay, setCostPay] = useState(20000);
	const [persent, setPersent] = useState(0);

	const [usedTickets, setUsedTickets] = useState({
		head: ['メンティー名', '利用項目', 'タイトル', '利用日時'],
		body: []
	})

	const [mentorTickets, setMentorTickets] = useState({
		head: ['メンター名', '商品名/委託名', '内容', '金額', '日時'],
		body: []
	})


	const [purchasedTickets, setPurchasedTickets] = useState({
		head: ['メンティー名', '面談チケット', 'イベントチケット', 'ESチケット', 'ケースチケット', '合計', '購入日時'],
		before: [],
		after: []
	})

	const tabContents = [
		{ id: 1, title: '売上中', content: <CustomPaginationActionsTable data={{ body: purchasedTickets.before, head: purchasedTickets.head }} /> },
		{ id: 2, title: '売上後', content: <CustomPaginationActionsTable data={{ body: purchasedTickets.after, head: purchasedTickets.head }} /> },
		{ id: 3, title: '使用したチケット', content: <CustomPaginationActionsTable data={usedTickets} /> },
		{ id: 4, title: '支出', content: <CustomPaginationActionsTable data={mentorTickets} /> },
	];

	const mentorRes = (res) => {

		let mentorData = [];
		let costPays = 0;
		res.forEach(r => {
			mentorData = [...mentorData, {
				id: r.id,
				user_name: (<p className="text-primary">{r.mentor}</p>),
				type: (<p className="text-white w-fit text-sm py-1 px-5 font-bold rounded-full" style={{ background: r.color }}>{r.type}</p>),
				used_item: (<p className="text-primary">{r.name}</p>),
				cost: (<p className="text-primary">{numberFormat2.format(r.cost)}</p>),
				date: (<p className="text-primary">{moment(r.date).format('YYYY年MM月DD日')}{r.date.slice(11, 16)}</p>),
			}]

			costPays = costPays * 1 + r.cost * 1;
		})

		setMentorTickets({
			...mentorTickets,
			body: mentorData
		})
		setCostPay(costPays);
	};

	const options2 = { style: 'currency', currency: 'JPY' };
	const numberFormat2 = new Intl.NumberFormat('ja-JP', options2);

	const customizeRes = (res) => {
		let beforeData = [];
		let afterData = [];
		let usedData = [];

		let costBuys = 0;

		res.forEach(r => {

			if (r.status == 1) {
				beforeData = [...beforeData, {
					id: r.id,
					user_name: (<p className="text-primary">{r.user_name}</p>),
					interview_ticket_number: (<p className="text-primary">{r.interview_ticket_number}枚</p>),
					event_ticket_number: (<p className="text-primary">{r.event_ticket_number}枚</p>),
					es_ticket_number: (<p className="text-primary">{r.es_ticket_number}枚</p>),
					case_ticket_number: (<p className="text-primary">{r.case_ticket_number}枚</p>),
					total_price: (<p className="text-primary">{numberFormat2.format(r.total_price)}</p>),
					date: (<p className="text-primary">{moment(r.date).format('YYYY年MM月DD日')}{r.date.slice(11, 16)}</p>),
					action_button: (
						<CustomButton
							id={r.id}
							is_undisclosed={0}
							handleClick={() => { handleAllow(r.id) }}
							title='承認'
						/>
					)
				}]

				costBuys = r.total_price * 1 + costBuys * 1

			}
			else if (r.status == 2) {
				afterData = [...afterData, {
					id: r.id,
					user_name: (<p className="text-primary">{r.user_name}</p>),
					interview_ticket_number: (<p className="text-primary">{r.interview_ticket_number}枚</p>),
					event_ticket_number: (<p className="text-primary">{r.event_ticket_number}枚</p>),
					es_ticket_number: (<p className="text-primary">{r.es_ticket_number}枚</p>),
					case_ticket_number: (<p className="text-primary">{r.case_ticket_number}枚</p>),
					total_price: (<p className="text-primary">{numberFormat2.format(r.total_price)}</p>),
					date: (<p className="text-primary">{moment(r.date).format('YYYY年MM月DD日')}{r.date.slice(11, 16)}</p>),
				}]

				costBuys = r.total_price * 1 + costBuys * 1
			}
			else {
				usedData = [...usedData, {
					id: r.id,
					user_name: (<p className="text-primary">{r.user_name}</p>),
					ticket_type: (<p className="text-white w-fit text-sm py-1 px-5  font-bold rounded-full" style={{ background: r.ticket_color }}>{r.ticket_type}</p>),
					used_item: (<p className="text-primary">{r.used_item}</p>),
					date: (<p className="text-primary">{moment(r.date).format('YYYY年MM月DD日')}{r.date.slice(11, 16)}</p>),
				}]
			}
			setCostBuy(costBuys);

			if (r.status == 2) {

			}
		});

		setPurchasedTickets({
			...purchasedTickets,
			before: beforeData,
			after: afterData
		});
		setUsedTickets({
			...usedTickets,
			body: usedData
		});

	}


	const handleAllow = (id) => {
		// console.log(id)
		allowPurchaseTickets(id)
			.then(res => {
				if (res.status && res.status === 200) {
					toastr.success('成功しました。');
					handleSubmit();
					// customizeRes(res.data);
					// mentorRes(res.data.mentorDatas);

					// customizeRes(res.data.tickets);
					// mentorRes(res.data.mentorDatas);
					
					// const allowed = purchasedTickets.before.find(b=>{
					// 	console.log(id == b.id)
					// 	return parseInt(b.id) == parseInt(id)
					// })
					// console.log(allowed)
					// const keys = Object.keys(allowed);
					// keys.pop();

					// const newAfter = keys.reduce((acc, key) => {
					// 	acc[key] = allowed[key];
					// 	return acc;
					// }, {});

					// setPurchasedTickets({
					// 	...purchasedTickets,
					// 	before:[...purchasedTickets.before.filter(b=>(
					// 		b.id != id
					// 	))],
					// 	after:[...purchasedTickets.after, newAfter]
					// })
					return;
				}
				// toastr.error('失敗しました。');
			})
			.catch(err => {
				console.log(err)
				toastr.error('失敗しました。');
			});

	};
	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	};
	const handleSubmit = () => {

		fetchAllTickets(data)
			.then(res => {
				if (res.status == 200) {
					customizeRes(res.data.tickets);
					mentorRes(res.data.mentorDatas);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	// console.log(purchasedTickets)
	useEffect(() => {

		let setMenteeData = [];

		fetchAllMentees()
			.then(res => {

				if (res.length > 0) {
					res.forEach(r => {
						setMenteeData = [...setMenteeData, { value: r.id, name: r.user_name }];
					});

					setMenteeOptions(setMenteeData);
				}
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

		fetchAllTickets(data)
			.then(res => {
				if (res.status == 200) {
					customizeRes(res.data.tickets);
					mentorRes(res.data.mentorDatas);
				}
			})
			.catch(err => {
				console.log(err);
			});


	}, []);

	useEffect(() => {
		console.log(costBuy, costPay)
		setPersent(Math.round((costBuy - costPay) / costBuy * 100))
	}, [costBuy, costPay])
	return (
		<section>
			<div className="bg-white px-16 pb-4">

				<div className="bg-white px-16 pb-4">
					<div className="flex flex-wrap justify-between">
						<Heading title="売上" />
						<ContentCard title="今月売上" content={`${numberFormat2.format(costBuy)}`} />
						<ContentCard title="今月支出" content={`${numberFormat2.format(costPay)}`} />
						<ContentCard title="当月純利益率" content={`${persent + "%"}`} />
					</div>
				</div>
			</div>
			<div className="px-16 pb-16">
				<div className="flex gap-2 items-center">
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
					<Select
						name="mentee"
						label=""
						options={menteeOptions}
						handleChange={handleChange}
						className='mb-0'
						selectedValue={data.mentee}
					/>
					<div className="pt-2">
						<Button component="label" variant="contained" endIcon={<SearchIcon />} onClick={handleSubmit}>
							検索する
						</Button>

						{/* <Button
							title="検索する"
							bgColor="bg-blue-400"
							className="px-5 py-2 rounded-lg mt-3"
							style={{ height: '40px' }}
							handleClick={handleSubmit}
						/> */}
					</div>
				</div>
				<BasicTabs data={tabContents} />
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
}