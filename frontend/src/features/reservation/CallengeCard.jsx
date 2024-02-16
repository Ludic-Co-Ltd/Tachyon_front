import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/textDisplay";
// import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page, pdfjs } from 'react-pdf';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Paths } from "../../config/Paths";
import NS from '../../assets/images/ns.svg';
// Set worker URL to wherever your worker files are stored
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default (props) => {
	// const { name, id, file_path } = props
	const navigate = useNavigate();

	return (
		<div className="mt-2 p-2 border border-gray-400 bg-white" onClick={() => navigate(Paths.comments.replace(':id', props.id))}>
			{/* <div className="pdf-container h-56">
				<Document
					file={backendUrl + props.file_path}
					className={'h-full'}
				// onLoadSuccess={onDocumentLoadSuccess}					
				>
					<Page
						pageNumber={1}
						height={200}
						renderTextLayer={false}
						// className={'w-full h-full'}
						className={'w-full h-full'}

					/>
				</Document>
			</div> */}
			<img src={props.thumbnail && (backendUrl + props.thumbnail)} alt="" className="company-logo  aspect-[4/3]  border border-gray-400" />
			<div className="font-bold elp-title text-primary text-base"><h6>{props.case_study.question}</h6> </div>
			<div className="text-sm text-primary  elp-title2" >{props.comment}</div>
			<div className="grid grid-cols-5 text-xl font-bold mt-4 mb-3 gap-2" style={{ paddingLeft: 3 }}>
				<div className="text-center">
					<div style={{ background: `url(${NS})`, width: 25, height: 45, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
						<div className="text-left" style={{ marginLeft: '-5px', fontSize: 14 }}>{props.mark1 ? props.mark1 : '00'}</div>
						<div className="text-right " style={{ marginTop: '-19px', marginLeft:14, fontSize: 14, textAlign: 'right' }}>25</div>
					</div>
					<div style={{ marginLeft: '-12px', marginTop: '-14px', fontSize: 12 }}>論理性</div>
				</div>
				<div className="text-center">
					<div style={{ background: `url(${NS})`, width: 25, height: 45, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
						<div className="text-left" style={{ marginLeft: '-5px', fontSize: 14 }}>{props.mark2 ? props.mark2 : '00'}</div>
						<div className="text-right " style={{ marginTop: '-19px', marginLeft:14, fontSize: 14, textAlign: 'right' }}>25</div>
					</div>
					<div style={{ marginLeft: '-12px', marginTop: '-14px', fontSize: 12 }}>思考力</div>
				</div>
				<div className="text-center">
					<div style={{ background: `url(${NS})`, width: 25, height: 45, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
						<div className="text-left" style={{ marginLeft: '-5px', fontSize: 14 }}>{props.mark3 ? props.mark3 : '00'}</div>
						<div className="text-right " style={{ marginTop: '-19px', marginLeft:14, fontSize: 14, textAlign: 'right' }}>25</div>
					</div>
					<div style={{ marginLeft: '-12px', marginTop: '-14px', fontSize: 12 }}>知識</div>
				</div>
				<div className="text-center">
					<div style={{ background: `url(${NS})`, width: 25, height: 45, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
						<div className="text-left" style={{ marginLeft: '-5px', fontSize: 14 }}>{props.mark4 ? props.mark4 : '00'}</div>
						<div className="text-right " style={{ marginTop: '-19px', marginLeft:14, fontSize: 14, textAlign: 'right' }}>25</div>
					</div>
					<div style={{ marginLeft: '-12px', marginTop: '-14px', fontSize: 12 }}>発想力</div>
				</div>
				<div className="text-center">
					<div style={{ background: `url(${NS})`, width: 25, height: 45, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
						<div className="text-left" style={{ marginLeft: '-5px', fontSize: 14 }}>{props.mark1*1 + props.mark2*1 + props.mark3*1 + props.mark4*1}</div>
						<div className="text-right " style={{ marginTop: '-19px', marginLeft:14, fontSize: 14, textAlign: 'right' }}>100</div>
					</div>
					<div style={{ marginLeft: '2px', marginTop: '-14px', fontSize: 12 }}>合計</div>
				</div>
			</div>
		</div>
	)
}