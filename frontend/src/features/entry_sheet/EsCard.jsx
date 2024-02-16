import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { backendUrl } from "../../utils/textDisplay";
import { Document, Page, pdfjs } from 'react-pdf';
import { Paths } from "../../config/Paths";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default (props) => {
	const { id, period, file_path, correction_result, company , status} = props
	const link = Paths.showEs.replace(':id', id)

	return (
		<Link to={link} className="mx-1 mb-1 bg-white shadow-md flex ">
			<div className="my-2 w-full px-2 grid grid-cols-4 gap-2">
				<div className="">
					<img src={props.thumbnail&&(backendUrl+props.thumbnail)}  alt="" className="aspect-[4/4] rounded-full" style={{width:100, height:100, maxWidth:100}}/>
					{/* <div className="pdf-container h-24">
						<Document
							file={file_path&&(backendUrl + file_path)}
							className={'h-full'}
									
						>
							<Page
								pageNumber={1}
								height={200}
								width={200}
								renderTextLayer={false}
								className={' h-full'}
							/>

						</Document>					

					</div> */}
				</div>
				<div className="col-span-3 ml-5">
					<div className={`text-base font-bold ${status == '1' ? 'text-primary':'text-red-400'}`}>{company&&company.name}</div>
					<div className=" text-xs break-words whitespace-pre-wrap text-gray-400 mt-1">{moment(period).format('YYYY年MM月DD日')}</div>
					<div className=" text-sm break-words whitespace-pre-wrap  elp-title2 mt-2">{correction_result}</div>
				</div>
			</div>
		</Link>
	)
}