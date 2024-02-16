import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Button from "../../components/button/Button";
import TicketContent from "../../features/tickets/TicketContent";
import TicketModal from "../../features/tickets/TicketModal";
import { fetchUserTickets } from '../../utils/actions';

export default function Purchase() {
	const [openModal, setOpenModal] = useState(false);
	const [tickets, setTickets] = useState({
		interview_ticket_number : 0,
    es_ticket_number : 0,
    case_ticket_number : 0,
    event_ticket_number : 0,
	});
	const [purchasingTickets, setPurchasingTickets] = useState({
		interview_ticket_number : 0,
    es_ticket_number : 0,
    case_ticket_number : 0,
    event_ticket_number : 0,
	});

	const handleChangeNumber = (name, value)=>{
		setPurchasingTickets({...purchasingTickets, [name] : value})
	}
	useEffect(() => {

    fetchUserTickets()
      .then(res => {
        if(res.status == 200){
          setTickets(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }, []);
	return (
		<>
			{
				openModal && (
					<TicketModal setOpenModal={setOpenModal} purchasingTickets={purchasingTickets}/>
				)
			}
			<section className="">
				<div className="pt-5">
					<Heading title="チケット購入" />
				</div>
				<div className="my-2 bg-white">
					<TicketContent 
						title="面談チケット4500円" 
						number={tickets.interview_ticket_number} 
						purchasingNumber={purchasingTickets.interview_ticket_number} 
						name='interview_ticket_number'
						handleChangeNumber={handleChangeNumber}
					/>
					<TicketContent 
						title="イベントチケット4500円" 
						number={tickets.event_ticket_number} 
						purchasingNumber={purchasingTickets.event_ticket_number} 
						name='event_ticket_number'
						handleChangeNumber={handleChangeNumber}
					/>
					<TicketContent 
						title="ESチケット500円" 
						number={tickets.es_ticket_number} 
						purchasingNumber={purchasingTickets.es_ticket_number} 
						name='es_ticket_number'
						handleChangeNumber={handleChangeNumber}
					/>
					<TicketContent 
						title="ケースチケット500円" 
						number={tickets.case_ticket_number} 
						purchasingNumber={purchasingTickets.case_ticket_number} 
						name='case_ticket_number'
						handleChangeNumber={handleChangeNumber}
					/>
				</div>
				<div className="flex flex-wrap justify-center gap-5 my-4">
					<Button title="購入" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={() => setOpenModal(!openModal)} />
				</div>
			</section>
		</>
	)
}