import React from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../../utils/textDisplay";
import { Paths } from "../../config/Paths";
import BasicRating from "../../components/form/BasicRating";

export default (props) => {
	const { name, id, event_date, image_path, rating } = props
	const link = Paths.showEvent.replace(':id', id)

	return (
		<Link to={link} className="mx-1 mb-1 bg-white shadow-md flex ">
			<div className="my-2 w-2/5  aspect-[16/9] ml-2">
				<img src={image_path&&(backendUrl+image_path)}  alt="" className="aspect-[4/4] rounded-full" style={{width:100, height:100}}/>
			</div>
			<div className="my-2 w-3/5 pl-3 pr-3">
				<div className="text-xs text-gray-400">{props.company.name}</div>
				<div className="font-bold text-primary text-base break-words whitespace-pre-wrap  elp-title">{name}</div>
				<div className="text-sx text-gray-200">
					<BasicRating name="rating" value={rating}/>
				</div>
				<div className="text-xs text-primary text-base float-right">{event_date} 開催</div>
			</div>
		</Link>
	)
}