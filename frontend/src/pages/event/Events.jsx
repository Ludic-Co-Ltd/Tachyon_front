import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import Heading from "../../components/partials/Heading";
import BasicTabs from "../../components/partials/Tab";
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import { fetchAllEvents, fetchAllAdminEvents, deleteOneEvent } from "../../utils/actions";
import AddButton from '../../components/partials/AddButton';
import EditButton from '../../components/partials/EditButton';
import Footer from '../../components/partials/Footer';
import BasicRating from "../../components/form/BasicRating";
import { backendUrl, displayWeekday } from "../../utils/textDisplay";
import DeleteButton from "../../components/partials/DeleteButton";
import WeekSelect from "../../components/form/WeekSelect";
import moment from 'moment';


const Events = () => {

	const [evts, setEvts] = useState([]);
	const [category, setCategory] = useState(0);
	const [startDate, setStartDate] = useState(moment());
	const [endDate, setEndDate] = useState(moment());
	const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek').format('YYYY-MM-DD'));


	useEffect(() => {
		fetchAllEvents(selectedWeek)
			.then(({ data }) => {
				var events = [];

				Object.keys(data).map(key => {
					data[key].map((item) => {
						item.day = displayWeekday(key);
						item.event_date = item.event_date + ' ' + item.start_time.slice(11, 16) + '~' + item.end_time.slice(11, 16);
						item.rating = <BasicRating value={item.rating} precision={0.25} readOnly />
						item.image_path = <img src={backendUrl + item.image_path} style={{width:100, maxWidth:100}} />
						item.edit = <EditButton id={item.id} />
						item.delete = <DeleteButton id={item.id} handleClick={() => {handleDeleteEvent(item.id)}} />
						delete item.start_time;
						delete item.end_time;
						events.push(item);
					});
				});

				setEvts(events);
			})
			.catch(err => {
				console.log(err);
			});
	}, [selectedWeek]);

	const navigate = useNavigate();

	const handleDeleteEvent = (id) => {
		window.confirm('本当に削除しますか？') && deleteOneEvent(id)
		.then(res => {
			console.log('res', res);
			if (res.status && (res.status === 200 || res.status === 204)) {
				toastr.success('イベント情報が削除されました。');
				// navigate(Paths.adminMentees);
				window.location.reload();
				return;
			}
			toastr.error('イベント情報の削除に失敗しました。');
		})
		.catch(err => {
			console.log('err', err);
			toastr.error('イベント情報の削除に失敗しました。');
		});
	};
	const handleWeekChange = (e) => {
		setSelectedWeek(e.target.value);
		console.log(e.target.value)

	};

	const evtNormalTableContents = {
		body: evts.filter(evt => { return evt.event_type == 1 })
	};

	const evtGuerillaTableContents = {
		body: evts.filter(evt => { return evt.event_type == 2 })
	};

	const tabContents = [
		{ id: 1, title: '通常イベント', content: <CustomPaginationActionsTable data={evtNormalTableContents} /> },
		{ id: 2, title: 'ゲリライベント', content: <CustomPaginationActionsTable data={evtGuerillaTableContents} /> },
	];

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="イベント" />
					<WeekSelect selectedWeek={selectedWeek} firstDate={'2024-01-01'} lastDate={'2024-12-31'} handleChange={handleWeekChange} />
					<AddButton href={Paths.adminCreateEvent} />
				</div>
			</div>
			<div className="px-16 pb-16">
				<BasicTabs data={tabContents} />
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
};

export default Events;