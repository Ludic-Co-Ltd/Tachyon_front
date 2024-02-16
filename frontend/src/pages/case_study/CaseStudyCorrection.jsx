import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Button from "../../components/button/Button";
import DropzoneFile from "../../components/form/DropzoneFile";
import MypageForm from "../../features/mypage/MypageForm";

export default () => {
	return (
		<section className="">
			<div className="">
				<Heading title="ケース添削" />
			</div>
			<div className="my-4 bg-white">
				<div className="p-5">
					<MypageForm name="name" label="お題" type="text" />
					<MypageForm name="name" label="思考時間" type="text" />
					<div className="">
						<DropzoneFile />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5 my-4">
				<Button title="提出する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" />
			</div>
		</section>
	)
}