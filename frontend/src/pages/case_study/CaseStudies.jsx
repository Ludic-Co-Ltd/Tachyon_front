import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Heading from "../../components/partials/Heading";
import Footer from '../../components/partials/Footer';
import NS from '../../assets/images/ns.svg'
import { Paths } from "../../config/Paths";
import { backendUrl } from "../../utils/textDisplay";
import AddButton from '../../components/partials/AddButton';
import BasicTabs from "../../components/partials/Tab";
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import { fetchAllCase, makeCasePublic, fetchAllCaseComments } from "../../utils/actions";
import EditButton from "../../components/partials/EditButton";
import CustomButton from "../../components/partials/CustomButton";
import moment from 'moment';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function CaseStudies() {

	const navigate = useNavigate();
	
	const [caseTableContents, setCaseTableContents]=useState({
		head: ['ケースお題', '思考時間', '公開日時', '終了日時'],
		body: []
	})	
	const [correctionContents, setCorrectionContents]=useState({
		before: [],
		after: {
			head: ['', '', '', '論理性', '思考力', '知識', '発想力', '合計', ''],
			body: []
		},
	})

	const tabContents = [
		{ id: 1, title: '添削前', content: <CustomPaginationActionsTable data={{body:correctionContents.before}} /> },
		{ id: 2, title: '添削後', content: <CustomPaginationActionsTable data={correctionContents.after} /> },
		{ id: 3, title: '公開中', content: <CustomPaginationActionsTable data={caseTableContents} /> },
	];
	const customizeRes = (res) =>{
	
		let options1 = [];

		res.reverse().forEach(r => {
			let op = {
				id: r.id,
				materials_path:(<div>
									<img src={r.materials_path&&(backendUrl+r.materials_path)}  alt="" className="aspect-[4/4] rounded-full" style={{width:100, height:100, maxWidth:100}}/>
									{/* <Document
									  file={backendUrl + r.materials_path}
									  className={'h-full'}			
									> 
									  <Page
										pageNumber={1}
										height={120}
										renderTextLayer={false}
										className={' h-full'}
									  />
									</Document>               */}
								  </div>),
				question: r.question,
				thinking_time: "思考時間 : " + r.thinking_time + "分",
				start_date: r.start_date,
				end_date: r.end_date,
				edit_button:
					(<div style={{display:"flex", gap:8}}>
						<EditButton id={r.id} />
						<CustomButton
							id={r.id}
							is_undisclosed={r.is_undisclosed}
							handleClick={() => {handlePublic(r.id)}}
							title={!r.is_undisclosed?'公開中':'非公開'}
						/>
					</div>)
			};

			options1.push(op)
		});
		return options1;
	}

	const handleCorrection=(id)=>{
		// navigate(Paths.adminCorrectionEntrySheet.replace(':id', id));
		navigate(Paths.adminCorrectionCaseStudy.replace(':id', id));
		console.log(id)
	}

	const handleCorrectionEdit=(id)=>{
		navigate(Paths.adminCorrectionCaseStudy.replace(':id', id));
		console.log(id)
	}
	useEffect(() => {

		fetchAllCase()
			.then(res => {
				setCaseTableContents({...caseTableContents, body:customizeRes(res)})
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllCaseComments()
			.then(res => {
				let beforeData=[];
				let afterData=[];
				res.data.forEach(r=>{
					if(!r.mark1 ){
					  beforeData=[...beforeData, {
						id:r.id,
						file_path:(<div className="pdf-container h-24">
									<Document
									  file={backendUrl + r.file_path}
									  className={'h-full'}			
									> 
									  <Page
										pageNumber={1}
										height={120}
										renderTextLayer={false}
										className={' h-full'}
									  />
									</Document>              
								  </div>),
						user_name:(<div>
									<p className="text-sm text-neutral-300 text-left">
									  {moment(r.created_at).format('YYYY年MM月DD日hh:mm')}投稿
									</p>
									<p className="text-base text-primary text-left">{r.user.last_name+r.user.first_name}</p>
								  </div>),
						question:(<h5 className="text-center text-primary">{r.case_study.question}</h5>),
						thinking_time:(<p className="text-primary">思考時間 : {r.case_study.thinking_time}分</p>),
						action_button:(
						  <CustomButton
							id={r.id}
							is_undisclosed={0}
							handleClick={() => {handleCorrection(r.id)}}
							title='添削'
						  />
						)
					  }]
					}
					else {
					  afterData=[...afterData, {
						id:r.id,
						file_path:(<div className="pdf-container h-24">
									<Document
									  file={backendUrl + r.file_path}
									  className={'h-full'}			
									> 
									  <Page
										pageNumber={1}
										height={120}
										renderTextLayer={false}
										className={' h-full'}
									  />
									</Document>              
								  </div>),
						user_name:(<div>
									<p className="text-sm text-neutral-300 text-left">
									  {moment(r.updated_at).format('YYYY年MM月DD日hh:mm')}投稿
									</p>
									<p className="text-base text-primary text-left">{r.user.last_name+r.user.first_name}</p>
								  </div>),
						question:(<h5 className="text-center text-primary">{r.case_study.question}</h5>),
						mark1:(<div style={{background:`url(${NS})`, width:40, height:50, backgroundPosition:'center', backgroundRepeat:'no-repeat'}} className="text-xl text-primary">
									<div className="text-left leading-none" style={{marginLeft:'-8px', lineHeight:1}}>{r.mark1?r.mark1:'00'}</div>
									<div className="text-right " style={{ marginLeft:'-19px',textAlign:'right'}}>25</div>
								</div>),
						mark2:(<div style={{background:`url(${NS})`, width:40, height:50, backgroundPosition:'center', backgroundRepeat:'no-repeat'}} className="text-xl text-primary">
									<div className="text-left leading-none" style={{marginLeft:'-8px', lineHeight:1}}>{r.mark2?r.mark2:'00'}</div>
									<div className="text-right " style={{ marginLeft:'-19px',textAlign:'right'}}>25</div>
								</div>),
						mark3:(<div style={{background:`url(${NS})`, width:40, height:50, backgroundPosition:'center', backgroundRepeat:'no-repeat'}} className="text-xl text-primary">
									<div className="text-left leading-none" style={{marginLeft:'-8px', lineHeight:1}}>{r.mark3?r.mark3:'00'}</div>
									<div className="text-right " style={{ marginLeft:'-19px',textAlign:'right'}}>25</div>
								</div>),
						mark4:(<div style={{background:`url(${NS})`, width:40, height:50, backgroundPosition:'center', backgroundRepeat:'no-repeat'}} className="text-xl text-primary">
									<div className="text-left leading-none" style={{marginLeft:'-8px', lineHeight:1}}>{r.mark4?r.mark4:'00'}</div>
									<div className="text-right " style={{ marginLeft:'-19px',textAlign:'right'}}>25</div>
								</div>),
						total_mark:(<div style={{background:`url(${NS})`, width:40, height:50, backgroundPosition:'center', backgroundRepeat:'no-repeat'}} className="text-xl text-primary">
									<div className="text-left leading-none" style={{marginLeft:'-8px', lineHeight:1}}>{r.mark1+r.mark2+r.mark3+r.mark4}</div>
									<div className="text-right " style={{ marginLeft:'-19px',textAlign:'right'}}>100</div>
								</div>),
						action_button:(
						  <CustomButton
							id={r.id}
							is_undisclosed={0}
							handleClick={() => {handleCorrection(r.id)}}
							title='編集'
						  />
						)
					  }]
					}
				  });
				setCorrectionContents({
					before:beforeData,
					after:{...correctionContents.after,body:afterData}
				})
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const handlePublic = (id) => {
		makeCasePublic(id)
		.then(res => {
			if (res.status && res.status === 200) {
				toastr.success('成功しました。');
				setCaseTableContents({...caseTableContents, body:customizeRes(res.data)})
				return;
			}
			toastr.error('失敗しました。');
		})
		.catch(err => {
			console.log(err)
			toastr.error('失敗しました。');
		});
	};

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="ケース" />
					<AddButton href={Paths.adminCreateCaseStudy}/>
				</div>
			</div>
			<div className="px-16 pb-16">
				<BasicTabs data={tabContents} />
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
}