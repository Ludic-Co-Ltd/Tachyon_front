import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import TextArea from "../../components/form/TextArea";
import AdminInput from "../../components/form/AdminInput";
import { backendUrl } from "../../utils/textDisplay";
import {fetchOneES, createESCorrection} from '../../utils/actions';
import { Document, Page, pdfjs } from 'react-pdf';
import DownloadIcon from '@mui/icons-material/Download';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
	const {id} = useParams();
	const navigate = useNavigate();

	const [entrySheet, setEntrySheet] = useState({});

	const handleChange=(name, value) => {
		setEntrySheet({...entrySheet, [name]:value});
	}

	const handleSubmit = () =>{
	 	createESCorrection(id, {period:entrySheet.period, correction_result:entrySheet.correction_result})
		 .then(res=>{
				if(res.status == 200) {
					toastr.success('ES添削情報が正常に更新されました。');
					navigate(Paths.adminEntrySheets)
					return;
				}
				toastr.error('ES添削情報が正常に更新されました。');
			})
			.catch(err => {
				toastr.error('ES添削情報が正常に更新されました。');
				console.log(err);
			});
	}

	useEffect(() => {
		fetchOneES(id)
		.then(res => {      
			if(res.status == 200) setEntrySheet(res.data)
		})
		.catch(err => {
			console.log(err);
		});
	}, [id]);

  return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-12">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<TextArea name="correction_result" label="コメント" rows="23" value={entrySheet.correction_result} handleChange={handleChange}/>
						<div>
							<div className='mb-2'>
								<h5>
									{/* 提出期限 :  */}
									<AdminInput name="period" label="提出期限" type="date" value={entrySheet.period} handleChange={handleChange} />
									{/* <span className='text-base'>{moment(entrySheet.period).format('YYYY年MM月DD日')}</span> */}
								</h5>
								<h5>
									企業 : <span className='text-base'>{entrySheet.company&&entrySheet.company.name}</span>
								</h5>
							</div>
							<div className="pdf-container h-96">
								<a href={backendUrl + entrySheet.file_path} download target='_blank'>
									<Document
										file={entrySheet.file_path&&(backendUrl + entrySheet.file_path)}
										className={'h-full'}			
									> 
										<Page
											pageNumber={1}
											height={400}
											renderTextLayer={false}
											className={' h-full'}
										/>
									</Document>   
								</a>           
							</div>
							<p className="text-right my-2"><DownloadIcon/>ダウンロードファイル</p>
						</div>
					</div>
				</Card>
				<div className="flex flex-wrap justify-start gap-5 my-5">
					<Button 
						title="登録" 
						bgColor="bg-indigo-500" 
						bgColorHover="bg-indigo-300" 
						className="px-5 py-2.5 rounded-lg" 
						handleClick={handleSubmit}
					/>
				</div>
			</div>
		</div>
  )
}