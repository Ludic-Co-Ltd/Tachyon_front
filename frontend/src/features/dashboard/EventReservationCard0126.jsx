import React, { useState } from "react";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import EventModal from "../../components/modal/EventModal";

export default (props) => {
	const { name, image_path, event_date, start_time, end_time, rating} = props;

	const [open, setOpen] = useState(false);

  return (
		<div className="grid grid-cols-2 gap-4 py-2 mr-10">
			<img src={image_path&&(backendUrl+image_path)}  
					alt="event logo" 
					className="company-logo aspect-[4/3] border border-slate-200" 
			/>
			<div>
				<h4 className="text-base font-bold elp-title2">{name}</h4>
				<p className="text-center text-sm">
					{moment(event_date).format('YYYY年MM月DD日')}
				</p>
				<p className="text-center text-sm">
					{moment(start_time).format('hh:mm')+"~"+moment(end_time).format('hh:mm')}
				</p>
				<button className="justify-end items-center flex w-full text-base mt-1" onClick={()=>setOpen(true)}>
					詳細 <ChevronDoubleRightIcon className="w-4 h-5 ps-1" />
				</button>
								
			</div>
			<EventModal {...props} open={open} setOpen={setOpen}/>
		</div>
  )
}