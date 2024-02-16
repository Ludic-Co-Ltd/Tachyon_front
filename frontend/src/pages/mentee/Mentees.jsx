import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import Heading from "../../components/partials/Heading";
import CustomPaginationActionsTable from "../../components/partials/CustomTable";
import EditButton from "../../components/partials/EditButton";
import AddButton from '../../components/partials/AddButton';
import Select from "../../components/form/Select";
import Button from "../../components/button/Button";
import DeleteButton from "../../components/partials/DeleteButton";
import Footer from "../../components/partials/Footer";
import { fetchAllMentees, deleteOneMentee } from "../../utils/actions";


const Mentees = () => {
	
	const [menteeTableBody, setMenteeTableBody] = useState([]);
	const navigate = useNavigate();
	
	useEffect(() => {
		fetchAllMentees()
			.then(res => {
				var mentees = [];
				res.reverse().map((user) => {
					var temp = {
						id: user.id,
						name: user.user_name,
						interview_ticket_number: user.interview_ticket_number,
						event_ticket_number: user.event_ticket_number,
						es_ticket_number: user.es_ticket_number,
						case_ticket_number: user.case_ticket_number,
						// case_ticket_number: user_tickets.length ? user_tickets.reduce((sum, t) => sum + t.case_ticket_number, 0) : 0,
						mentor_name: user.mentor,
						edit_button: <EditButton id={user.id} />,
						delete_button: <DeleteButton id={user.id} handleClick={() => { handleDeleteMentee(user.id) }} />,
					};
					mentees.push(temp);
				});

				setMenteeTableBody(mentees);
			})
			.catch(err => {
				console.log(err);
			});

		

	}, []);	

	const menteeTableContents = {
		head: ['メンティー名', '残り面談チケット', '残りイベントチケット', '残りESチケット', '残りケースチケット', '残り専属チケット', '専属メンター'],
		body: menteeTableBody
	};

	const handleDeleteMentee = (id) => {
		window.confirm('本当に削除しますか？') && deleteOneMentee(id)
			.then(res => {
				console.log('delete res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('メンティー情報が削除されました。');
					window.location.reload();
					return;
				}
				toastr.error('メンティー情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('メンティー情報の削除に失敗しました。');
			});
	};

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="メンティー" />
					<AddButton href={Paths.adminRegisterMentee} />
				</div>
			</div>
			<div className="px-16 pb-16">
								
				<CustomPaginationActionsTable data={menteeTableContents} />
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
};

export default Mentees;