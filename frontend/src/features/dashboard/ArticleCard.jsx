import React, { useState, useEffect } from "react";
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import LinkButton from "../../components/button/LinkButton";

export default (props) => {
	const { id, title, created_at, image_path, introduction_text} = props;

  return (
		<div className=" p-2 bg-white mt-2">
			<img src={image_path&&(backendUrl+image_path)} 
					alt="article logo" 
					className="company-logo aspect-[4/1] rounded-lg border border-slate-40" 
			/>
			<div className="w-full col-span-2 mt-1">
				<p className="elp-title text-base  font-bold">{title}</p>
				<p className="elp-title2 text-xs mt-1">{introduction_text}</p>
			</div>
			<div className="mt-2 flex justify-between" style={{fontSize:10}}>
				<div className=" ">{moment(created_at).format('MM月DD日')}投稿</div>
				<div className="">
					<LinkButton link={`/articles/${id}`} title='もっと見る'/>
				</div>
			</div>
		</div>
  )
}