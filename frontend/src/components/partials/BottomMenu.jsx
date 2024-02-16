import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../assets/scss/auth/login.scss';
import { HomeIcon, CalendarDaysIcon, UserIcon, BuildingOfficeIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { Paths } from "../../config/Paths";

export default () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link to={Paths.dashboard} className="text-center">
          <button className="inline-flex flex-col items-center justify-center my-3 group">
            <HomeIcon className="w-7 h-6 mb-1 text-primary" />
            <span className="text-xs text-primary dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">ホーム</span>
          </button>
        </Link>
        <Link to={Paths.selectionSolution} className="text-center">
          <button className="inline-flex flex-col items-center justify-center my-3 group">
            <ChartBarIcon className="w-7 h-6 mb-1 text-primary" />
            <span className="text-xs text-primary dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">選考対策</span>
          </button>
        </Link>
        <Link to={Paths.selectionInfo} className="text-center">
          <button className="inline-flex flex-col items-center justify-center my-3 group">
            <BuildingOfficeIcon className="w-7 h-6 mb-1 text-primary" />
            <span className="text-xs text-primary dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">選考情報</span>
          </button>
        </Link>
        <Link to={Paths.reservation} className="text-center">
          <button className="inline-flex flex-col items-center justify-center my-3 group">
            <CalendarDaysIcon className="w-7 h-6 mb-1 text-primary" />
            <span className="text-xs text-primary dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">予約</span>
          </button>
        </Link>
        <Link to={Paths.mypage} className="text-center">
          <button className="inline-flex flex-col items-center justify-center my-3 group">
            <UserIcon className="w-7 h-6 mb-1 text-primary" />
            <span className="text-xs text-primary dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">マイページ</span>
          </button>
        </Link>
      </div>
    </div>
  )
}