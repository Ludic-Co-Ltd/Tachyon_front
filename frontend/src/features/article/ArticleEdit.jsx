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
import { registerArticle, fetchArticle, updateArticle, deleteArticle } from "../../utils/actions";


export default function ArticleEdit() {

	const [article, setArticle] = useState({
		id: '',
		title: '',
		image_path: 'ファイルを選択してください。',
		introduction_text: '',
		content1: '',
		content2: '',
		subtitle: '',
		image: null,
	});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			fetchArticle(id)
				.then(({ data }) => {
					setArticle(data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, []);

	const handleChange = (name, value) => {
		setArticle({ ...article, [name]: value });
	};

	const formData = new FormData();

	const handleFileChange = (e) => {

		let file = e.target.files[0];
		if (file) {
			// const allowedTypes = ['image/jpeg', 'image/png'];
			// const maxSize = 5 * 1024 * 1024;

			// if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				
				// formData.append('image', file);
				setArticle({ ...article, image: file, image_path: file.name });
			// } else {

			// }
		}
	};

	const handleSave = async () => {
		Object.keys(article).map(key => {
			formData.append(key, article[key]);
		});

		if (id) {
			await updateArticle(id, formData)
				.then(res=>{
					if(res.status == 200) {
						toastr.success('コラム情報が正常に更新されました。');
						navigate(Paths.adminArticles)
						return;
					}
					toastr.error('コラム情報の更新に失敗しました。');
				})
				.catch(err => {
					toastr.error('コラム情報の更新に失敗しました。');
					console.log(err);
				});
		} else {
			await registerArticle(formData)
				.then(res=>{
					if (res.status == 200) {
						toastr.success('コラム情報が正常に登録されました。');
						navigate(Paths.adminArticles)
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
		window.confirm('本当に削除しますか？') && deleteArticle(id)
			.then(res => {
				console.log('delete res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('コラム情報が削除されました。');
					navigate(Paths.adminArticles);
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
		fetchArticle(id)
			.then(res => {
				setArticle({ ...res });
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
						<AdminInput name="title" label="題名" type="text" value={article.title} handleChange={handleChange} />
						{/* <AdminInput name="image_path" label="画像" type="file" handleChange={handleFileChange} /> */}
						<InputFileUpload name="image_path" label="画像" type="file" value={article.image_path} handleChange={handleFileChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<AdminInput name="introduction_text" label="コラム紹介文" type="text" value={article.introduction_text} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<TextArea name="content1" label="コラム内容1" value={article.content1} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<AdminInput name="subtitle" label="小見出し" type="text" value={article.subtitle} handleChange={handleChange} />
					</div>
					<div className="grid grid-cols-1 my-3">
						<TextArea name="content2" label="コラム内容2" value={article.content2} handleChange={handleChange} />
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