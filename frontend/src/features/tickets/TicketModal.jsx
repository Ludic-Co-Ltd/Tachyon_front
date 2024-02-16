import React from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Modal from "../../components/partials/Modal";
import { TicketIcon } from '@heroicons/react/24/solid';
import { purchaseTickets } from '../../utils/actions';

export default (props) => {
	const { setOpenModal , purchasingTickets} = props

	const total_price = parseInt(purchasingTickets.interview_ticket_number)*4500 + parseInt(purchasingTickets.event_ticket_number)*4500+
											parseInt(purchasingTickets.es_ticket_number)*500+ parseInt(purchasingTickets.case_ticket_number)*500;

	const purchaseClick=()=>{
		if(purchasingTickets.interview_ticket_number+purchasingTickets.event_ticket_number+
			purchasingTickets.es_ticket_number+purchasingTickets.case_ticket_number > 0){
				purchaseTickets(purchasingTickets)
					.then(res => {
						if (res.status && res.status == 200) {
							toastr.success('チケット購入リクエストが成功しました。銀行振込をお願いします。');
							setOpenModal(false);
							return;
						}
						toastr.error('チケット購入リクエストが失敗しました。');
					})
					.catch(err => {
						console.log('err', err);
						toastr.error('チケット購入リクエストが失敗しました。');
					});
		}
	}	

  return (
    <Modal setOpenModal={setOpenModal} handleClick={purchaseClick}>
			<TicketIcon className="w-100 h-20 mx-auto" />
			<div className="my-4">
				<div className="flex justify-between pe-5 text-sm text-primary mb-4">
					<div>専属面談チケット4500円</div>
					<div>{purchasingTickets.interview_ticket_number}枚</div>
				</div>
				<div className="flex justify-between pe-5 text-sm text-primary mb-4">
					<div>ケースチケット4500円</div>
					<div>{purchasingTickets.event_ticket_number}枚</div>
				</div>
				<div className="flex justify-between pe-5 text-sm text-primary mb-4">
					<div>ES添削チケット500円</div>
					<div>{purchasingTickets.es_ticket_number}枚</div>
				</div>
				<div className="flex justify-between pe-5 text-sm text-primary mb-4">
					<div>ケース添削チケット500円</div>
					<div>{purchasingTickets.case_ticket_number}枚</div>
				</div>
				<div className="flex justify-between pe-5 text-sm text-primary mb-4 text-lg font-bold">
					<div>合計</div>
					<div>{total_price}円</div>
				</div>
			</div>
		</Modal>
  )
}