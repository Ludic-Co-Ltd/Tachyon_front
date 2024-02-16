import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/TextArea";

export default () => {
	const options = [
		{name: 'aaa', value: 1},
		{name: 'bbb', value: 2}
	]
	const reservations = [
		{name: '仮予約', value: 1},
		{name: '確定', value: 2},
		{name: 'ゲリラ', value: 3}
	]
  return (
		<div className="grid grid-cols-12 gap-10">
			<div className="col-span-8">
				<Card>
					<CardTitle title="基本情報" />
					<div className="grid grid-cols-2 gap-10 my-3">
						<Select name="industry_id" label="業界" options={options} />
						<AdminInput name="name" label="企業名" type="text" />
					</div>
					<div className="grid grid-cols-1 my-3">
						<TextArea name="overview" label="企業概要" />
					</div>
				</Card>
			</div>
			<div className="col-span-4">
				<Card>
					<CardTitle title="画像情報" />
					<div className="my-3">
						<AdminInput name="image" label="企業ロゴ" type="file" />
					</div>
				</Card>
				<div className="flex flex-wrap justify-end gap-5 my-5">
					<Button title="保存する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" />
				</div>
			</div>
		</div>
  )
}