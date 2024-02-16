import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';
import AdminInput from "../../components/form/AdminInput";
import { Card, CardTitle } from "../../components/partials/Card";
import Button from "../../components/button/Button";

export default () => {
  return (
		<Card>
			<CardTitle title="基本情報" />
			<div className="grid grid-cols-2 gap-10 my-3">
				<AdminInput name="name" label="第一志望業界" type="text" />
				<AdminInput name="name" label="第一志望業界" type="text" />
			</div>
			<div className="grid grid-cols-2 gap-10 my-3">
				<AdminInput name="name" label="生年月日" type="text" />
				<AdminInput name="name" label="性別" type="text" />
			</div>
			<div className="grid grid-cols-2 gap-10 my-3">
				<AdminInput name="name" label="メールアドレス" type="email" />
				<AdminInput name="name" label="パスワード" type="password" />
			</div>
			<div className="grid grid-cols-2 gap-10 my-3">
				<AdminInput name="name" label="プラン名" type="text" />
				<AdminInput name="name" label="専属メンター" type="text" />
			</div>
			<div className="grid grid-cols-2 gap-10 my-3">
				<AdminInput name="name" label="プラン名" type="text" />
				<AdminInput name="name" label="専属メンター" type="text" />
			</div>
			<div className="grid grid-cols-3 gap-10 my-3">
				<AdminInput name="name" label="プラン名" type="text" />
				<AdminInput name="name" label="専属メンター" type="text" />
				<AdminInput name="name" label="専属メンター" type="text" />
			</div>
			<div className="flex flex-wrap justify-end gap-5 my-4">
				<Button title="保存する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" />
			</div>
		</Card>
  )
}