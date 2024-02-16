import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import '../../assets/scss/auth/login.scss';
import Heading from "../../components/partials/Heading";
import Mentors from "../../features/reservation/Mentors";
import Events from "../../features/reservation/Events";
import mentorData from "../../data/mypage/mentors.json";
import companyData from "../../data/company/companies.json";
import ES from "../../assets/images/es_ico.png"
import Case from "../../assets/images/case_ico.png"
import Calender from "../../assets/images/calander_ico.png"
import { Paths } from "../../config/Paths";
import {fetchAllMentors, fetchReservableEvents} from '../../utils/actions';
import { Card } from "@mui/material";

export default () => {
  const [mentors, setMentors] = useState([]);
  const [events, setEvents] = useState(companyData);
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMentors()
      .then(res => {
        if(res.status == 200){
          setMentors(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchReservableEvents()
      .then(res => {
        if(res.status == 200){
          setEvents(res.data);
        }
      }) 
      .catch(err => {
        console.log(err);
      });

    // fetchTodayArticle()
    //   .then(res => {
    //     if(res.status == 200){
    //       setArticle(res.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

  }, []);
  return (
    <section className="">
      <div className="mt-4">
        <Heading title="面談予約" />
        <Mentors mentors={mentors} />
      </div>
      <Card className="mt-2">
        <Heading title="イベント予約"  className="mt-2"/>
        <Events events={events} />
      </Card>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <div onClick={()=>navigate(Paths.eSCaseStudy)} className="py-1 px-2" style={{borderRadius:10, backgroundColor:'#0cc0df'}}>
          <img src={ES} alt="" className="w-full w-28" style={{borderRadius:10}}/>
          <p className="text-center text-sm font-bold" >ES添削</p>
        </div>
        <div onClick={()=>navigate(Paths.caseStudyEditHistory)} className="py-1 px-2" style={{borderRadius:10, backgroundColor:'#0cc0df'}}>
          <img src={Case} alt="" className="w-full w-28 " style={{borderRadius:10}}/>
          <p className="text-center text-sm font-bold">ケース添削</p>
        </div>
        <div onClick={()=>navigate(Paths.calandar)} className="py-1 px-2" style={{borderRadius:10, backgroundColor:'#0cc0df'}}>
          <img src={Calender} alt="" className="w-full w-28" style={{borderRadius:10}}/>
          <p className="text-center text-sm font-bold">カレンダー予約</p>
        </div>
      </div>
    </section>
  )
}