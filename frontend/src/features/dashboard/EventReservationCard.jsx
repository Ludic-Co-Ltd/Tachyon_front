import React, { useState } from "react";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import EventModal from "../../components/modal/EventModal";
import StarRating from "../../components/partials/StarRating";

export default (props) => {
	const { name, image_path, industry, company, event_date, start_time, end_time, rating} = props;

	const [open, setOpen] = useState(false);

  return (
		<div className=" p-2 bg-white" >
			<div className="flex gap-4">
				<img src={image_path&&(backendUrl+image_path)}  
						alt="event logo"
						style={{width:60, height:60}}
						className="border border-slate-400 rounded-full" 
				/>
				<div className="">
					<p className="text-xs text-neutral-300">{industry}</p>
					<p className="font-bold">{company}</p>
				</div>
			</div>
			<div>
				<p className="text-base elp-title mt-2">{name}</p>
				<StarRating rating={rating} className={'text-xs mt-3'}/>
				<div className="flex justify-between items-center">
					<p className="text-xs w-full">
						{moment(event_date).format('MM月DD日')}{moment(start_time).format('hh:mm')+"~"+moment(end_time).format('hh:mm')}
					</p> 
					<button className="justify-end items-center flex w-full text-xs mt-1" onClick={()=>setOpen(true)}>
						詳細 <ChevronDoubleRightIcon className="w-4 h-5 ps-1" />
					</button>
				</div>
								
			</div>
			<EventModal {...props} open={open} setOpen={setOpen}/>
		</div>
  )
}