import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import TextArea from "../../components/form/TextArea";
import AdminInput from "../../components/form/AdminInput";
import { backendUrl } from "../../utils/textDisplay";
import {fetchOneCaseStudyComent, editCaseStudyComment} from '../../utils/actions';
import { Document, Page, pdfjs } from 'react-pdf';
import DownloadIcon from '@mui/icons-material/Download';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
	const {id} = useParams();
	const navigate = useNavigate();

	const [caseStudyComment, setCaseStudyComment] = useState({});

	const handleChange=(name, value) => {
		setCaseStudyComment({...caseStudyComment, [name]:value});
	}

	const handleSubmit = () =>{
	 	editCaseStudyComment(id, caseStudyComment)
		 .then(res=>{
				if(res.status == 200) {
					toastr.success('ケース添削情報が正常に更新されました。');
					navigate(Paths.adminCaseStudies)
					return;
				}
				toastr.error('ケース添削情報が正常に更新されました。');
			})
			.catch(err => {
				toastr.error('ケース添削情報が正常に更新されました。');
				console.log(err);
			});
	}

	useEffect(() => {
		fetchOneCaseStudyComent(id)
			.then(res => {      
				if(res.status == 200) setCaseStudyComment({...JSON.parse(res.data.case_study_comment), company:res.data.company})
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
						<div>
							<TextArea className="mt-7" name="comment" label="コメント" rows="19" value={caseStudyComment.comment} handleChange={handleChange}/>
							<div className="grid grid-cols-4 gap-5 my-3">
								<AdminInput name="mark1" label="論理性" type="number" max={25} min={1} value={caseStudyComment.mark1} handleChange={handleChange} />
								<AdminInput name="mark2" label="思考力" type="number" max={25} min={1} value={caseStudyComment.mark2} handleChange={handleChange} />
								<AdminInput name="mark3" label="知識" type="number" max={25} min={1} value={caseStudyComment.mark3} handleChange={handleChange} />
								<AdminInput name="mark4" label="発想力" type="number" max={25} min={1} value={caseStudyComment.mark4} handleChange={handleChange} />
							</div>
						</div>
						<div>
							<div className=' mb-2'>
								<h5>
									お題 : <span className='text-base'>{caseStudyComment.case_study&&caseStudyComment.case_study.question}</span>
								</h5>
								<h5 className="flex gap-5">
									思考時間 : <span className='text-base'>{caseStudyComment.case_study&&caseStudyComment.case_study.thinking_time}分</span>
									出題企業 : <span className='text-base'>{caseStudyComment.company}</span>
								</h5>
							</div>
							<div className="pdf-container h-96">
								<a href={backendUrl + caseStudyComment.file_path} download target='_blank'>
									<Document
										file={caseStudyComment.file_path&&(backendUrl + caseStudyComment.file_path)}
										className={'h-full'}			
									> 
										<Page
											pageNumber={1}
											height={400}
											renderTextLayer={false}
											className={' h-full'}
										/>
									</Document>   
									<p className="text-right my-4"><DownloadIcon/>ダウンロードファイル</p>
								</a>           
							</div>
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