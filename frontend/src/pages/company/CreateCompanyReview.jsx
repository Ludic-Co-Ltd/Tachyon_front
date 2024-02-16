import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Button from "../../components/button/Button";
import { useParams , useNavigate} from 'react-router-dom';
import AdminInput from "../../components/form/AdminInput";
import TextArea from "../../components/form/TextArea";
import { reviewAdd } from "../../utils/actions";
import { Paths } from "../../config/Paths";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';

export default () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [correction, setCorrection] = useState({});
	
	const handleCaseChange = (field, value) => {
		setCorrection({ ...correction, [field]: value });
	};
	useEffect(() => {
		setCorrection({
			title: '',
			company_id: id,
			content: ''
		});

	}, []);
	const esAddFunc = () => {

		if (window.confirm("選考情報を参加しますか？")) {

			console.log(">>>>>>", correction);
			if (correction.title == "") {
				alert("期間を入力する必要があります。");
				return false;
			}
			if (correction.content == "") {
				alert("添付ファイルを入力する必要があります。");
				return false;
			}

			  reviewAdd(correction)
				.then(res => {
					if(res.status == 200){
						navigate(Paths.showCompany.replace(':id', id))
					}
				})
				.catch(err => {
				  console.log(err);
				});
		}
	};
	return (
		<section className="">
			<button onClick={() => navigate(-1)}>
				<div className="flex text-base py-2  mt-4">
				<ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
				</div>
      		</button>
			<div className="py-2">
				<Heading title="選考情報の追加" />
			</div>
			<div className="my-4 bg-white">
				<div className="p-5">
					<AdminInput name="title" label="題名" type="text" value={correction.question} handleChange={handleCaseChange} />					
					<div className="">
						<TextArea name="content" label="内容" value={correction.content} handleChange={handleCaseChange} />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button title="提出する" label="添付ファイル" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" handleClick={() => esAddFunc()} />
			</div>
		</section>
	)
}