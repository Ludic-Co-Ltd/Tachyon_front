import API from './api';

export const login = async (user) => {
	return await API({
		method: 'post',
		url: '/users/login',
		data: user
	})
		.then((res) => {
			if (res.status === 200) {
				localStorage.setItem('auth', JSON.stringify({
					...res.data,
					token_expiration: new Date().getTime() / 1000 + res.data.expire_in
				}));
			}
			return { status: 200 };
		})
		.catch(error => {
			if (error.response && (error.response.status === 401 || error.response.status === 500))
				return error.response.data.error;
			return error;
		});
};

export const register = async (user) => {
	return await API({
		method: 'post',
		url: '/users/register',
		data: user
	})
		.then((res) => {
			if (res.status === 200) {
				localStorage.setItem('auth', JSON.stringify({
					...res.data,
					token_expiration: new Date().getTime() / 1000 + res.data.expire_in
				}));
			}
			return { status: 200 };
		})
		.catch(error => {
			if (error.response && (error.response.status === 401 || error.response.status === 500))
				return error.response.data.error;
			return error;
		});
};

export const createUser = async (user) => {
	return await API({
		method: 'post',
		url: '/users',
		data: user,
		admin:true
	})
		.then((res) => {
			if (res.status === 200) {
				return { status: 200 };
			}
		})
		.catch(error => {
			if (error.response && (error.response.status === 401 || error.response.status === 500))
				return error.response.data.error;
			return error;
		});
};

export const adminLogin = async (user) => {
	return await API({
		method: 'post',
		url: '/admins/login',
		data: user,
	})
		.then((res) => {
			if (res.status === 200) {
				localStorage.setItem('admin', JSON.stringify({
					...res.data,
					token_expiration: new Date().getTime() / 1000 + res.data.expire_in
				}));
			}
			return { status: 200 };
		})
		.catch(error => {
			if (error.response && (error.response.status === 401 || error.response.status === 500))
				return error.response.data.error;
			return error;
		});
};

export const fetchAllMentorsEvent = async (data) => {
	return await API({
		method: 'get',
		url: '/mentors_event',
		params : data,
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllMentors = async () => {
	return await API({
		method: 'get',
		url: '/mentors',
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchMentor = async (id) => {
	return await API({
		method: 'get',
		url: `/mentors/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const applyMentor = async (id) => {
	return await API({
		method: 'get',
		url: `/users/mentor/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};


export const InterviewRegister = async (data) => {
	return await API({
		method: 'post',
		url: `/interview_reservations`,
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};


// ------------------------- Mentee -------------------------
export const fetchAllMentees = async () => {
	return await API({
		method: 'get',
		url: '/users',
		admin:true
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchOneMentee = async (id) => {
	return await API({
		method: 'get',
		url: `/users/${id}`,
		admin: true
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const changeSalary = async (data) => {
	return await API({
		method: 'Post',
		url: `/mentors/salary_change`,
		data: data,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};
export const updateOneMentee = async (id, user) => {
	return await API({
		method: 'put',
		url: `/users/${id}`,
		data: {
			user: user
		}
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const deleteOneMentee = async (id) => {
	return await API({
		method: 'delete',
		url: `/users/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const UpdateUserTicket = async (tickets) => {
	return await API({
		method: 'post',
		url: `/user_tickets`,
		data: {
			tickets: tickets
		}
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const updateMenteeTicket = async (id, tickets) => {
	return await API({
		method: 'post',
		url: `/user_tickets/${id}/purchase`,
		data: {
			tickets: tickets
		}
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

//MOONRIDER
export const fetchOneCase = async (id) => {
	return await API({
		method: 'get',
		url: `/case_studies/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchTodayCase = async () => {
	return await API({
		method: 'get',
		url: `/case_today`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchOneCompany = async (id) => {
	return await API({
		method: 'get',
		url: `/companies/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const updateOneCompany = async (id, company) => {
	return await API({
		method: 'put',
		url: `/companies/${id}`,
		data: company,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const createCompany = async (company) => {
	return await API({
		method: 'post',
		url: `/companies`,
		data: company,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllCompany = async () => {
	return await API({
		method: 'get',
		url: `/companies`,
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const deleteOneCompany = async (id) => {
	// check foreign key constraint
	return await API({
		method: 'delete',
		url: `/companies/${id}`
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const caseCreate = async (id, casestudy) => {

	if (id > 0) {
		return await API({
			method: 'put',
			url: `/case_studies/${id}`,
			data: casestudy,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			admin: true
		})
			.then(res => {
				return res;
			})
			.catch(err => {
				return err;
			});

	} else {
		return await API({
			method: 'post',
			url: `/case_studies`,
			data: casestudy,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			admin: true
		})
			.then((res) => {
				return res;
			})
			.catch(error => {
				return error.response.data;
			});
	}
};

export const makeCasePublic = async (id) => {
	console.log('public', id);
	return await API({
		method: 'put',
		url: `/case_studies/public/${id}`,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};


export const ShowCaseStudySave = async (formData) => {

	return await API({
		method: 'post',
		url: `/case_study_comments`,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const EsRegister = async (formData) => {

	return await API({
		method: 'post',
		url: `/entry_sheets`,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchOneComment = async (id) => {

	return await API({
		method: 'get',
		url: `/case_study_comments/${id}`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllCase = async () => {
	return await API({
		method: 'get',
		url: `/case_studies`,
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const registerMentor = async (mentor) => {
	return await API({
		method: 'post',
		url: '/mentors/register',
		data: mentor
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchGelillas = async () => {
	return await API({
		method: 'get',
		url: `/gelillas`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchOneMentor = async (id) => {
	return await API({
		method: 'get',
		url: `/mentors/${id}`,
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllEvents = async (week) => {
	return await API({
		method: 'get',
		url: `/events`,
		params: { week: week }
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err.response.data;
		});
};

export const fetchAllAdminEvents = async () => {
	return await API({
		method: 'get',
		url: `/events/all`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const updateOneMentor = async (id, mentor) => {
	return await API({
		method: 'put',
		url: `/mentors/${id}`,
		data: {
			mentor: mentor
		}
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchEventReservations = async () => {
	return await API({
		method: 'get',
		url: `/event_reservations/user`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const deleteOneMentor = async (id) => {
	return await API({
		method: 'delete',
		url: `/mentors/${id}`
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchReservableEvents = async () => {
	return await API({
		method: 'get',
		url: `/events/reservable`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllPlans = async () => {
	return await API({
		method: 'get',
		url: '/plans',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchLastArticle = async () => {
	return await API({
		method: 'get',
		url: `/articles/last`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchEvents3 = async (id) => {
	return await API({
		method: 'get',
		url: `/events3`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchEvent = async (id) => {
	return await API({
		method: 'get',
		url: `/events/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchEs = async (id) => {
	return await API({
		method: 'get',
		url: `/entry_sheets/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};


export const registerEvent = async (formData) => {
	return await API({
		method: 'post',
		url: '/events',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: formData
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchOneEvent = async (id) => {
	return await API({
		method: 'get',
		url: `/events/${id}`,
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllIndustries = async () => {
	return await API({
		method: 'get',
		url: `/industries`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const updateOneEvent = async (id, formData) => {
	return await API({
		method: 'put',
		url: `/events/${id}`,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: formData
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const deleteOneEvent = async (id) => {
	return await API({
		method: 'delete',
		url: `/events/${id}`,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchCompany = async (id) => {
	return await API({
		method: 'get',
		url: `/companies/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchCompanyReviews = async (id) => {
	return await API({
		method: 'get',
		url: `/company_reviews/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllCompanies = async () => {
	return await API({
		method: 'get',
		url: '/companies',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};
//Event Add
export const eventAdd = async (id, user) => {
	let ev = {};
	ev.event_id = id;
	ev.fixed_date = "2024-01-15 12:00:00.000000";

	return await API({
		method: 'post',
		url: `/event_reservations`,
		data: ev
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const reviewAdd = async (correction) => {

	return await API({
		method: 'post',
		url: `/company_reviews`,
		data: correction
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

// 2024-01-11 05:30:00 Fatty ES begin

// ES(entry sheets)

export const fetchAllES = async () => {
	return await API({
		method: 'get',
		url: '/entry_sheets',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchOneES = async (id) => {
	return await API({
		method: 'get',
		url: `/entry_sheets/${id}`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const deleteOneES = async (id) => {
	return await API({
		method: 'delete',
		url: `/entry_sheets/${id}`,
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const createESCorrection = async (id, entry_sheet) => {
	return await API({
		method: 'put',
		url: `/entry_sheets/${id}`,
		data: entry_sheet,
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

// 選考情報

export const fetchAllSelectionInfo = async () => {
	return await API({
		method: 'get',
		url: '/selection_statuses',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

// コラム
export const makeZoomPublic = async (id) => {
	console.log('public', id);
	return await API({
		method: 'put',
		url: `/zooms/public/${id}`,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchAllZooms = async () => {
	return await API({
		method: 'get',
		url: '/zooms',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchLastZooms = async () => {
	return await API({
		method: 'get',
		url: `/zooms/last`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchZoom = async (id) => {
	return await API({
		method: 'get',
		url: `/zooms/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const registerZoom = async (article) => {
	return await API({
		method: 'post',
		url: `/zooms`,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: article,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const updateZoom = async (id, article) => {
	return await API({
		method: 'put',
		url: `/zooms/${id}`,
		data: article,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const deleteZoom = async (id) => {
	
	return await API({
		method: 'delete',
		url: `/zooms/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

//

export const fetchAllArticles = async () => {
	return await API({
		method: 'get',
		url: '/articles',
	})
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchArticle = async (id) => {
	return await API({
		method: 'get',
		url: `/articles/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const registerArticle = async (article) => {
	return await API({
		method: 'post',
		url: `/articles`,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: article,
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const updateArticle = async (id, article) => {
	return await API({
		method: 'put',
		url: `/articles/${id}`,
		data: article,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		admin: true
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const deleteArticle = async (id) => {
	return await API({
		method: 'delete',
		url: `/articles/${id}`,
	})
		.then(res => {
			return res;
		})
		.catch(err => {
			return err;
		});
};

export const fetchMyInfo = async () => {

	return await API({
		method: 'get',
		url: `/users/myinfo`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const updateMyInfo = async (data) => {

	return await API({
		method: 'put',
		url: `/users/myinfo`,
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchChallengeCase = async () => {

	return await API({
		method: 'get',
		url: `/case_study_comments/challenges`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchCases3 = async () => {

	return await API({
		method: 'get',
		url: `/case_studies/cases3`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchEs3 = async () => {

	return await API({
		method: 'get',
		url: `/entry_sheets_es3`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchMyEvents = async () => {

	return await API({
		method: 'get',
		url: `/myevents`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchMyES = async () => {

	return await API({
		method: 'get',
		url: `/myes`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
export const fetchMyEditCases = async () => {

	return await API({
		method: 'get',
		url: `/case_studies/myeditcases`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchMyCases = async () => {

	return await API({
		method: 'get',
		url: `/case_studies/mycases`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllCaseComments = async () => {

	return await API({
		method: 'get',
		url: `/case_study_comments`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchOneCaseStudyComent = async (id) => {

	return await API({
		method: 'get',
		url: `/case_study_comments/${id}`
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const editCaseStudyComment = async (id, caseSutdyComment) => {

	return await API({
		method: 'put',
		url: `/case_study_comments/${id}`,
		data: caseSutdyComment,
		admin: true
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchCalandarEvents = async (startDate, endDate) => {

	return await API({
		method: 'get',
		url: `/events_calandar`,
		params: {
			startDate: startDate,
			endDate: endDate,
		}
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchUserTickets = async () => {

	return await API({
		method: 'get',
		url: `/user_tickets/mine`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const purchaseTickets = async (purchasingTickets) => {

	return await API({
		method: 'post',
		url: `/user_tickets/purchase`,
		data: purchasingTickets
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const fetchAllTickets = async (data) => {

	return await API({
		method: 'get',
		url: `/user_tickets`,
		params: data
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};

export const allowPurchaseTickets = async (id) => {

	return await API({
		method: 'get',
		url: `/user_tickets/${id}/allow`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};
//GET Ticket
export const getEventTicket = async (id) => {

	return await API({
		method: 'get',
		url: `/user_tickets/mine`,
	})
		.then((res) => {
			return res;
		})
		.catch(error => {
			return error.response.data;
		});
};