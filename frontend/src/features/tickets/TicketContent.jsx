import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TicketIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

export default (props) => {
	const { title, number, purchasingNumber, name, handleChangeNumber } = props

	const handleClick=(amount)=>{
		if(purchasingNumber+amount>=0){
			handleChangeNumber(name, purchasingNumber+amount)
		}
	}

  return (
    <div className="px-5 py-2">
			<div className="font-bold text-primary">{title}</div>
			<div className="flex">
				<TicketIcon className="w-20 h-15" />
				<div className="py-2 ps-2">
					<div className="">現在所持数: {number}枚</div>
					<div className="flex my-2">
						<div className="pe-4">購入数</div>
						<div className="flex rounded-lg shadow-sm">
							<span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
								<MinusIcon className="w-5 h-4" onClick={()=>handleClick(-1)}/>
							</span>
							<span className="px-4 inline-flex items-center min-w-fit rounded-s-md text-sm text-gray-500">{purchasingNumber}</span>
							<span className="px-4 inline-flex items-center min-w-fit rounded-e-md border border-s-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
								<PlusIcon className="w-5 h-4" onClick={()=>handleClick(1)}/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}