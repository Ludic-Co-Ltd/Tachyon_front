import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Heading from "../../components/partials/Heading";
import AddButton from '../../components/partials/AddButton';
import { Paths } from "../../config/Paths";
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import Footer from '../../components/partials/Footer';
import { fetchAllZooms, deleteZoom, makeZoomPublic } from "../../utils/actions";
import EditButton from "../../components/partials/EditButton";
import DeleteButton from "../../components/partials/DeleteButton";
import { backendUrl } from "../../utils/textDisplay";
import CustomButton from "../../components/partials/CustomButton";
import ArticleIcon from '@mui/icons-material/Article';

export default function SelectionStatus() {

	const [articleTableBody, setArticleTableBody] = useState([]);

	const handlePublic = (id) => {
		makeZoomPublic(id)
			.then(res => {
				if (res.status && res.status === 200) {
					window.location.reload();
				}
				// toastr.error('失敗しました。');
			})
			.catch(err => {
				console.log(err)
				toastr.error('失敗しました。');
			});
	};
	

	useEffect(() => {
		fetchAllZooms()
			.then(res => {
				let tableData = []
				res.forEach((item) => {
					// delete item.created_at;
					// delete item.updated_at;
					// delete item.deleted_at;
					tableData = [...tableData, {
						image_path: <img src={backendUrl + item.image_path} style={{ width: 150, maxWidth: 150 }} />,
						title: <div className="text-left">
							<p className="elp-title text-lg font-bold">{item.title}</p><hr />
							<p className="elp-title2 text-sm">{item.introduction_text}</p><hr />
							<p className="elp-title2 text-sm">{item.zoom_url}</p><hr />
						</div>,
						edit: (<div style={{ display: "flex", gap: 8 }}>
							<EditButton id={item.id} />
							<CustomButton
								id={item.id}
								is_undisclosed={item.status}
								handleClick={() => { handlePublic(item.id) }}
								title={!item.status ? '公開中' : '非公開'}
							/>
						</div>),
						delete: <DeleteButton id={item.id} handleClick={() => { handleDeleteArticle(item.id) }} />
					}]
				});
				setArticleTableBody(tableData);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const handleDeleteArticle = (id) => {
		window.confirm('本当に削除しますか？') && deleteZoom(id)
			.then(res => {
				console.log('res', res);
				if (res.status && (res.status === 200 || res.status === 204)) {
					toastr.success('コラム情報が削除されました。');
					// navigate(Paths.adminMentees);
					window.location.reload();
					return;
				}
				toastr.error('コラム情報の削除に失敗しました。');
			})
			.catch(err => {
				console.log('err', err);
				toastr.error('コラム情報の削除に失敗しました。');
			});
	};

	const articleTableData = {
		body: articleTableBody
	};

	return (
		<section>
			<div className="bg-white px-16 pb-4">
				<div className="flex flex-wrap justify-between">
					<Heading title="コラム" />
					<AddButton href={Paths.adminCreateZooms} />
				</div>
			</div>
			<div className="p-16">
				<CustomPaginationActionsTable data={articleTableData} />
			</div>
			<div className="mt-16">
				<Footer />
			</div>
		</section>
	)
}