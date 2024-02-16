import React, { useState, useEffect } from "react";
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import LinkButton from "../../components/button/LinkButton";

export default (props) => {
	const { id, title, created_at, image_path, introduction_text} = props;

  return (
		<div className="grid grid-cols-3 gap-4 p-2 bg-white mt-2">
			<div className="w-full col-span-2">
				<h5 className="text-center elp-title text=base">{title}</h5>
				<div className="text-xs flex justify-end">{moment(created_at).format('MM月DD日')}投稿</div>
				<img src={image_path&&(backendUrl+image_path)} 
						alt="article logo" 
						className="company-logo aspect-[16/9] border border-slate-200" 
				/>
			</div>
			<div className="mt-10">
				<p className="elp-title6 text-sm">{introduction_text}</p>
				<div className="mt-2">
					<LinkButton link={`/articles/${id}`} title='もっと見る'/>
				</div>
			</div>
		</div>
  )
}