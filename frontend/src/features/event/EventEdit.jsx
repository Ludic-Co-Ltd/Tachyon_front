import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import { Card, CardTitle } from "../../components/partials/Card";
import AdminInput from "../../components/form/AdminInput";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import BasicRating from "../../components/form/BasicRating";
import InputFileUpload from "../../components/form/InputFileUpload";
import TextArea from "../../components/form/TextArea";
import { evtTypeOptions, backendUrl } from "../../utils/textDisplay";
import { registerEvent, fetchOneEvent, updateOneEvent, deleteOneEvent, fetchAllCompanies, fetchAllMentors } from "../../utils/actions";


const EventEdit = () => {

	const [evt, setEvt] = useState({
		id: '',
		company_id: '',
		mentor_id: '',
		name: '',
		image_path: 'ファイルを選択する',
		materials_path: 'ファイルを選択する',
		overview: '',
		rating: 0,
		event_date: moment().format('YYYY-MM-DD'),
		start_time: '10:00:00',
		end_time: '18:00:00',
		event_type: 1,
		open_chat_url: '',
		zoom_url: '',
		image: null,
		material: null
	});
	const formData = new FormData();

	const [companyOptions, setCompanyOptions] = useState([]);
	const [mentorOptions, setMentorOptions] = useState([]);
	const { id } = useParams();
	const [imgs, setImgs] = useState(null);
	const [pdf, setPdf] = useState(null);

	const [errors, setErrors] = useState({
		name: '',
		company_id: '',
		mentor_id: '',
		open_chat_url: '',
		zoom_url: '',
		image_path: '',
		materials_path: '',
		rating: '',
		overview: ''
	});

	useEffect(() => {

		id && fetchOneEvent(id)
			.then((evtRes) => {
				setEvt({ 
					...evtRes, 
					//item.start_time.slice(11, 16)
					start_time:evtRes.start_time.slice(11, 16),
					end_time:evtRes.end_time.slice(11, 16),
				});
			})
			.catch(err => {
				console.log(err);
			});
			
		fetchAllCompanies()
			.then(( companyRes) => {
				companyRes.map(item => {
					item.value = item.id;
				});
				setCompanyOptions([ ...companyRes ]);
			})
			.catch(err => {
				console.log(err);
			});

		fetchAllMentors()
			.then(( mentorRes) => {
				if(mentorRes.status == 200){
					let mentorData = mentorRes.data.map(item => {
						return {
							value : item.id,
							name : item.user_name
						}
					});
					setMentorOptions(mentorData);
				}
			})
			.catch(err => {
				console.log(err);
			});
	}, [id]);

	const navigate = useNavigate();

	const handleChange = (name, value) => {
		setEvt({ ...evt, [name]: value });
	};

	const handleSelect = (name, value) => {
		setEvt({ ...evt, [name]: value });
	};

	const handleFileChange = (e, category) => {

		let file = e.target.files[0];

		if (file) {
			// const allowedTypes = ['image/png', 'application/pdf'];
			// const maxSize = 5 * 1024 * 1024;

			// if (allowedTypes.includes(file.type)) {

				
				if (category == 'material') {
					formData.append('material', file);
					setEvt({ ...evt, material: file, materials_path: file.name });
					// const reader = new FileReader();
					// reader.onload = () => {
					// 	setPdf(reader.result);
					// };
				} else {
					formData.append('image', file);
					setEvt({ ...evt, image: file, image_path: file.name });

					// const reader = new FileReader();
					// reader.onload = () => {
					// 	setImgs(reader.result);
					// };
				}
			// } else {

			// }
		}
	};

	const handleSave = async () => {
		Object.keys(evt).map(key => {
			formData.append(key, evt[key]);
		});

		let errorData = {};
		if ('' === evt.name) {
			setErrors({ name: 'イベント名は必須です。' });
			errorData = {...errorData, name: 'イベント名は必須です。' }
			toastr.error(errorData.name);
			return;
		}
		if ('' === evt.company_id) {
			setErrors({ company_id: '企業名は必須です。' });
			errorData = {...errorData, company_id: '企業名は必須です。' }
			toastr.error(errorData.company_id);
			return;
		}
		if ('' === evt.mentor_id) {
			setErrors({ mentor_id: 'メンター名は必須です。' });
			errorData = {...errorData, mentor_id: 'メンター名は必須です。' }
			toastr.error(errorData.mentor_id);
			return;
		}
		if ('' === evt.open_chat_url) {
			setErrors({ open_chat_url: 'オープンチャットURLは必須です。' });
			errorData = {...errorData, open_chat_url: 'オープンチャットURLは必須です。' }
			toastr.error(errorData.open_chat_url);
			return;
		}
		if ('' === evt.zoom_url) {
			setErrors({ zoom_url: '参加ZOOMURLは必須です。' });
			errorData = {...errorData, zoom_url: '参加ZOOMURLは必須です。' }
			toastr.error(errorData.zoom_url);
			return;
		}
		if ('' === evt.image) {
			setErrors({ image: 'イベント画像は必須です。' });
			errorData = {...errorData, image: 'イベント画像は必須です。' }
			toastr.error(errorData.image_path);
			return;
		}
		if ('' === evt.material) {
			setErrors({ material: 'イベント資料は必須です。' });
			errorData = {...errorData, material: 'イベント資料は必須です。' }
			toastr.error(errorData.materials_path);
			return;
		}
		if (0 === evt.rating) {
			setErrors({ rating: 'おすすめ度は必須です。' });
			errorData = {...errorData, rating: 'おすすめ度は必須です。' }
			toastr.error(errorData.rating);
			return;
		}
		if ('' === evt.overview) {
			setErrors({ overview: 'イベント詳細は必須です。' });
			errorData = {...errorData, overview: 'イベント詳細は必須です。' }
			toastr.error(errorData.overview);
			return;
		}

		if (id) {
			await updateOneEvent(id, formData)
				.then(res=>{
					if(res.status == 200) {
						toastr.success('イベント情報が正常に更新されました。');
						navigate(Paths.adminEvents);
						return;
					}
					toastr.error('イベント情報の更新に失敗しました。');
				})
				.catch(err => {
					toastr.error('イベント情報の更新に失敗しました。');
					console.log(err);
				});
			} else {
				await registerEvent(formData)
				.then(res => {
					if (res.status && res.status == 200) {
						toastr.success('イベント情報が正常に登録されました。');
						navigate(Paths.adminEvents);
						return;
					}
					toastr.error('イベント情報の登録に失敗しました。');
				})
				.catch(err => {
					toastr.error('イベント情報の登録に失敗しました。');
					console.log(err);
				});
		}

	};

	const handleDelete = async () => {
		window.confirm('本当に削除しますか？') && deleteOneEvent(id)
			.then(res => {
				console.log('delete res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('イベント情報が削除されました。');
					navigate(Paths.adminEvents);
					return;
				}
				toastr.error('イベント情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('delete err', err);
				toastr.error('イベント情報の削除に失敗しました。');
			});
	};

	const handleCancel = () => {
		fetchOneEvent(id)
			.then(res => {
				setEvt({ ...res });
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-12">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="event_date" label="イベント日付" type="date" value={evt.event_date} handleChange={handleChange} />
						<AdminInput name="name" label="イベント名" type="text" value={evt.name} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="start_time" label="開始時間" type="time" value={evt.start_time} handleChange={handleChange} />
						<AdminInput name="end_time" label="終了時間" type="time" value={evt.end_time} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<Select name="company_id" label="企業名" options={companyOptions} selectedValue={evt.company_id} handleChange={handleSelect} />
						<Select name="mentor_id" label="メンター名" options={mentorOptions} selectedValue={evt.mentor_id} handleChange={handleSelect} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<AdminInput name="open_chat_url" label="オープンチャット" type="text" value={evt.open_chat_url} handleChange={handleChange} />
						<AdminInput name="zoom_url" label="参加ZOOM" type="text" value={evt.zoom_url} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<Select name="event_type" label="イベント種別" options={evtTypeOptions} selectedValue={evt.event_type} handleChange={handleSelect} />
						<BasicRating name="rating" label="おすすめ度" value={evt.rating} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-2 gap-10 my-3">
						<InputFileUpload
							name="image_path"
							label="イベント画像"
							type="file"
							value={evt.image_path}
							handleChange={(e) => handleFileChange(e, 'image')}
						/>
						{/* {!imgs && evt.image_path &&
							<img src={backendUrl + evt.image_path} className='border border-slate-300 w-32 h-32 p-1 mb-4' />
						} */}
						{/* {imgs &&
							<img src={imgs} className='border border-slate-300 w-32 h-32 p-1 mb-4' />
						} */}
						<InputFileUpload name="materials_path" label="イベント資料" type="file" value={evt.materials_path} handleChange={(e) => handleFileChange(e, 'material')} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<TextArea name="overview" label="イベント詳細" value={evt.overview} handleChange={handleChange} />
					</div>
					<div className="flex flex-wrap justify-end gap-5 my-5">
						<Button title="保存" bgColor="bg-blue-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleSave} />
						{
							id &&
							<>
								<Button title="削除" bgColor="bg-red-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleDelete} />
								<Button title="キャンセル" bgColor="bg-green-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={handleCancel} />
							</>	
						}
					</div>
				</Card>
			</div>
		</div>
	)
};

export default EventEdit;