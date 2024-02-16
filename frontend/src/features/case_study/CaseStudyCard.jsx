import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Paths } from "../../config/Paths";
import { backendUrl } from "../../utils/textDisplay";
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default (props) => {
	const { case_study } = props

	const link = props.published_date ? Paths.comments.replace(':id', props.comment_id) : Paths.showCaseStudy.replace(':id', props.id)

	return (
		<div className="mb-1 px-2 bg-white shadow-md flex">
			<div className="my-2 grid grid-cols-3 gap-2">
				<div >
				<img src={props.materials_path&&(backendUrl+props.materials_path)}  alt="" className="aspect-[4/4] rounded-full" style={{width:100, height:100, maxWidth:100}}/>
					{/* <a href={backendUrl + case_study.materials_path} download target='_blank'>
						<Document
							file={case_study.materials_path && (backendUrl + case_study.materials_path)}
							className={'h-full'}
						>
							<Page
								pageNumber={1}
								height={200}
								renderTextLayer={false}
								className={' h-full'}
							/>
						</Document>
					</a> */}
					
				</div>
				<div className="col-span-2 z-40">
					<Link to={link} >
						<div className="text-xs text-gray-400">{props.company.name}</div>
						
						<div className="font-bold text-base break-words whitespace-pre-wrap mt-2 elp-title">{props.question}</div>
						<div className="text-gray-400 text-sm break-words whitespace-pre-wrap elp-title2">{props.content}</div>
						{props.mark1 && <div className="text-xs text-primary mb-1">{props.mark1 + props.mark2 + props.mark3 + props.mark4}/100</div>}
						{props.published_date && <div className="text-xs text-primary text-base float-right">{moment(props.published_date).format('YYYY年MM月DD日')}提出</div>}
					</Link>
				</div>
			</div>
		</div>
	)
}