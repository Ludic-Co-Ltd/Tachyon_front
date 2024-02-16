import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/outline';
import LogoutIcon from '@mui/icons-material/Logout';
import { Paths } from "../../config/Paths";
import Logo from './../../assets/images/tachyon_logo.jpg';
import auth from "../../utils/auth";

const AdminHeader = () => {
	const [open, setOpen] = useState(false);

	const Content = (props) => {
		const { link, title } = props;

		return (
			<li>
				<Link to={link} className="block py-2 pr-4 pl-3 text-primary font-bold hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
					{title}
				</Link>
			</li>
		)
	};

	const contentsArray = [
		{ id: 1, title: "売上", link: Paths.adminDashboard },
		// { id: 3, title: "売上", link: Paths.adminTicketHistory },
		{ id: 2, title: "メンティー", link: Paths.adminMentees },
		
		{ id: 4, title: "メンター", link: Paths.adminMentors },
		{ id: 5, title: "イベント", link: Paths.adminEvents },
		{ id: 6, title: "ケース", link: Paths.adminCaseStudies },
		{ id: 7, title: "ES", link: Paths.adminEntrySheets },
		// { id: 7, title: "企業情報", link: Paths.adminCompanies },
		// { id: 8, title: "業界情報", link: Paths.adminIndustries },
		{ id: 8, title: "選考情報", link: Paths.adminSIs },
		{ id: 9, title: "コラム", link: Paths.adminArticles },
		{ id: 10, title: "ZOOM", link: Paths.adminZooms }
	];

	const logout=()=>{
		auth.adminLogout();
		window.location.href='/admin/login';
	}

	return (
		<header className="z-50">
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-5">
				<div className="lg:flex flex-wrap justify-between items-center mx-auto">
					<a href="/" className="flex items-center">
						<img src={Logo} className="mr-3 h-12 sm:h-15" alt="Flowbite Logo" />
						<span className="self-center text-3xl font-semibold whitespace-nowrap text-primary">Tachyon</span>
					</a>
					<div className="flex lg:justify-between justify-end items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
						<ul className={`flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ${!open && 'lg:flex hidden'}`}>
							{contentsArray.map((item) => <Content key={item.id} title={item.title} link={item.link} />)}
						</ul>
					</div>
					<div className={`flex items-center lg:justify-normal justify-end mr-12 lg:order-2 ${!open && 'lg:flex hidden'}`}>
						<LogoutIcon className="w-10 text-primary cursor-pointer"  onClick={logout}/>
					</div>
					<div>
						<Bars3Icon className="w-8 text-primary cursor-pointer lg:hidden absolute right-2.5 top-5" onClick={()=>setOpen(!open)} />
					</div>
				</div>
			</nav>
		</header>
	)
};

export default AdminHeader;