import React from "react";

export default ({ children, setOpenModal, handleClick }) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setOpenModal(false)}></div>
			<div className="fixed z-10 w-screen overflow-y-auto">
				<div className="min-h-full items-end justify-center p-4 text-center sm:items-center">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								{children}
							</div>
						</div>
						<div className="flex bg-gray-50 px-4 py-3">
							<button 
								type="button"
								className="inline-flex w-1/2 justify-center mx-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								onClick={() => setOpenModal(false)}
							>
								キャンセル
							</button>
							<button type="button" className="inline-flex w-1/2 justify-center mx-2 rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500" onClick={handleClick}>確定</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}