import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Paths } from "../../config/Paths";
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import InputFileUpload from "../../components/form/InputFileUpload";
import TextArea from "../../components/form/TextArea";
import { registerZoom, fetchZoom, updateZoom, deleteZoom } from "../../utils/actions";


export default function ZoomEdit() {

	const [zoom, setZoom] = useState({
		id: '',
		title: '',
		image_path: 'ファイルを選択してください。',
		introduction_text: '',
		zoom_url: '',
		image: null,
	});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			fetchZoom(id)
				.then(({ data }) => {
					setZoom(data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, []);

	const handleChange = (name, value) => {
		setZoom({ ...zoom, [name]: value });
	};

	const formData = new FormData();

	const handleFileChange = (e) => {

		let file = e.target.files[0];
		if (file) {
			// const allowedTypes = ['image/jpeg', 'image/png'];
			// const maxSize = 5 * 1024 * 1024;

			// if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				
				// formData.append('image', file);
				setZoom({ ...zoom, image: file, image_path: file.name });
			// } else {

			// }
		}
	};

	const handleSave = async () => {
		Object.keys(zoom).map(key => {
			formData.append(key, zoom[key]);
		});

		if (id) {
			await updateZoom(id, formData)
				.then(res=>{
					if(res.status == 200) {
						toastr.success('コラム情報が正常に更新されました。');
						navigate(Paths.adminZooms)
						return;
					}
					toastr.error('コラム情報の更新に失敗しました。');
				})
				.catch(err => {
					toastr.error('コラム情報の更新に失敗しました。');
					console.log(err);
				});
		} else {
			await registerZoom(formData)
				.then(res=>{
					if (res.status == 200) {
						toastr.success('コラム情報が正常に登録されました。');
						navigate(Paths.adminZooms)
						return;
					}
					toastr.error('コラム情報の登録に失敗しました。');
				})
				.catch(err => {
					toastr.error('コラム情報の登録に失敗しました。');
					console.log(err);
				});
		}
	};

	const handleDelete = async () => {
		alert("fff");
		window.confirm('本当に削除しますか？') && deleteZoom(id)
			.then(res => {
				console.log('delete res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('コラム情報が削除されました。');
					navigate(Paths.adminZooms);
					return;
				}
				toastr.error('コラム情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('delete err', err);
				toastr.error('コラム情報の削除に失敗しました。');
			});
	};

	const handleCancel = () => {
		fetchZoom(id)
			.then(res => {
				setZoom({ ...res });
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
						<AdminInput name="title" label="題名" type="text" value={zoom.title} handleChange={handleChange} />
						{/* <AdminInput name="image_path" label="画像" type="file" handleChange={handleFileChange} /> */}
						<InputFileUpload name="image_path" label="画像" type="file" value={zoom.image_path} handleChange={handleFileChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<AdminInput name="zoom_url" label="ZOOM URL" type="text" value={zoom.zoom_url} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<TextArea name="introduction_text" label="コメント" value={zoom.introduction_text} handleChange={handleChange} />
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
}