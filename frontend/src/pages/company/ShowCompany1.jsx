import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import Company from "../../assets/images/company.png";
import Button from "../../components/button/Button";

export default () => {
  return (
    <section className="mb-32">
			<div className="my-4">
				<img src={Company} alt="" className="w-9/12 h-56 mx-auto" />
				<div className="mx-5">
					<Heading title="デロイトトーマツ" className="border-b border-gray-300 text-center" />
					<div className="break-words whitespace-pre-wrap mx-6">
						dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
						dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
						dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
					</div>
					<div className="my-5">
						<h5 className="text-primary font-bold p-2 border-b border-gray-300">ESで通過のためのコツ</h5>
						<div className="break-words whitespace-pre-wrap mx-6">
							dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
							dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
							dfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
						</div>
						<div className="flex flex-wrap justify-center gap-5 my-4">
							<Button title="投稿する" bgColor="bg-orange-400" bgColorHover="bg-orange-700" className="px-5 py-2.5 rounded-lg" />
						</div>
					</div>
				</div>
      </div>
    </section>
  )
}