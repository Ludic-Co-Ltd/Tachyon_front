import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/scss/auth/login.scss';
import Heading from "../../components/partials/Heading";
import Challenges from "../../features/reservation/Challenges";
import Gelillas from "../../features/reservation/Gelillas";
import { fetchTodayCase, fetchGelillas, fetchChallengeCase } from '../../utils/actions';
import Button from "../../components/button/Button";
import { Paths } from "../../config/Paths";
import background from "../../assets/images/todaycase.jpg";
import { backendUrl } from "../../utils/textDisplay";
import { Card } from "@mui/material";

export default () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [gelilla, setGelilla] = useState([]);
  const [todayCase, setTodayCase] = useState({});
  const [caseChallenges, setCaseChallenges] = useState([]);

  useEffect(() => {

    fetchTodayCase()
      .then(res => {
        if (res.status == 200) {
          setTodayCase(res.data);
        }

      })
      .catch(err => {
        console.log(err);
      });
    fetchGelillas()
      .then(res => {
        //setTodayCase(res.data);
        if (res.status == 200)
          setGelilla(res.data)
      })
      .catch(err => {
        console.log(err);
      });

    fetchChallengeCase()
      .then(res => {
        if (res.status == 200)
          setCaseChallenges(res.data);
        //setGelilla(res.data)
      })
      .catch(err => {
        console.log(err);
      });

  }, []);
  return (
    <section style={{ marginTop: '-6px' }}>
      {/* <div style={{background:`url(${todayCase.materials_path && (backendUrl + todayCase.materials_path)})`, height:200}} className="bgsize100"> */}

      <Heading title="本日のケース" className="mt-4" />
      {todayCase ?
        <><div className="px-5 py-3 ">
          <img className="aspect-[16/9] mx-auto border-gray-500 rounded-2xl" style={{ width: 330 }} src={todayCase.materials_path && backendUrl + todayCase.materials_path} alt=""
            onClick={() => navigate(Paths.showCaseStudy.replace(':id', todayCase.id))} />
        </div>
          {/* {todayCase&&Object.keys(todayCase).length>0  && 
            
              <div className="mb-4 text-center mx-6">
                <p className="font-bold text-sm mb-2">{todayCase.question}</p>
                <Button title="ケースにチャレンジ" bgColor="bg-blue-400" bgColorHover="bg-orange-700"
                  className="px-5 py-2.5 rounded-lg mb-4" handleClick={() => navigate(Paths.showCaseStudy.replace(':id', todayCase.id))} />
              </div>} */}
        </> : <p className="text-cneter">表示する資料はありません。</p>
      }
      {/* </div> */}

      <div className="my-4">
        <Heading title="ゲリライベント" />
        <Gelillas events={gelilla} />
      </div>
      <div>
        <Heading className="mt-4" title="みんなのケースチャレンジ" />
        <Challenges challenges={caseChallenges} />
      </div>
      {/* <div className="my-4">
        <Heading title="今日のコラム" />
        <Events events={gelilla} />
      </div> */}
    </section>
  )
}