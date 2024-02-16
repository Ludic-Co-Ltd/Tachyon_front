import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/partials/Heading";
import Account from "../../assets/images/account.png"
import LinkButton from "../../components/button/LinkButton";
import { Paths } from "../../config/Paths";
import { fetchMyInfo, fetchEvents3, fetchCases3, fetchEs3, fetchUserTickets } from '../../utils/actions';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PeopleIcon from '@mui/icons-material/People';
import Button from "../../components/button/Button";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import VideoStableIcon from '@mui/icons-material/VideoStable';
import GroupsIcon from '@mui/icons-material/Groups';
import ES from "../../assets/images/es_ico.png"
import Case from "../../assets/images/case_ico.png"
import EventIco from "../../assets/images/event_ico.png"

import EvenTicket from "../../assets/images/event_t.png"
import InterViewTicket from "../../assets/images/inter_t.png"
import CaseTicket from "../../assets/images/case_t.png"
import ESTicket from "../../assets/images/es_t.png"
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

export default () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [pageError, setPageError] = useState('');
  const [myinfo, setMyinfo] = useState({});
  const [event3, setEvent3] = useState({});
  const [case3, setCase3] = useState({});
  const [es3, setEs3] = useState({});
  const [tickets, setTickets] = useState({
    interview_ticket_number: 0,
    es_ticket_number: 0,
    case_ticket_number: 0,
    event_ticket_number: 0,
  });

  useEffect(() => {

    fetchMyInfo()
      .then(res => {
        if (res.status == 200) {
          setMyinfo({ ...JSON.parse(res.data.user), industry_id_1: res.data.industry1, industry_id_2: res.data.industry2 });
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchEvents3()
      .then(res => {
        if (res.status == 200) {
          setEvent3(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });
    fetchCases3()
      .then(res => {
        if (res.status == 200) {
          setCase3(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchEs3()
      .then(res => {
        if (res.status == 200) {
          setEs3(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchUserTickets()
      .then(res => {
        if (res.status == 200) {
          setTickets(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  const editProfile = () => {

  }

  return (
    <section className="">
      <div className="py-5">
        <Heading title="マイページ" />
        <div className="bg-white shadow-md flex my-2 grid-cols-2">
          <div className="p-4">
            <p className="m-2 font-bold text-lg">基本情報</p>
            <img src={Account} alt="" className="w-60 p-2" style={{ borderRadius: 100 }} />
          </div>
          {myinfo && Object.keys(myinfo).length &&
            <div className="my-4 p-2 w-full">

              {/* <LinkButton link={Paths.editProfile} title="編集する" /> */}
              <div className="flex justify-end">

                <Button
                  title="編集する"
                  bgColor="bg-transparent"
                  bgColorHover="bg-orange-700"
                  className="px-4 mb-3 mr-3 rounded-full py-2 text-xs text-primary border border-primary"                
                  onClick={()=>{navigate(Paths.editProfile)}}
                  style={{ color: 'rgb(17 4 121)' }}
                />
              </div>
              <div className="flex items-center pt-4">
                <div className="font-bold text-lg">{myinfo.first_name} {myinfo.last_name}</div>
                <div className="text-sm ml-3">({myinfo.graduation_year} 卒業)</div>
              </div>

              <div className="text-sm">{myinfo.university} {myinfo.faculty}</div>
              {/* <div className="text-base mb-2">{myinfo.industry_id_1}・{myinfo.industry_id_2}</div> */}

            </div>
          }
        </div>
      </div>
      <div className="">
        <Heading title="カリキュラム" />
        <div className="flex">
          <div className="w-full">
            <div className="mt-2 grid grid-cols-2 gap-2 px-4">
              <div onClick={() => navigate(Paths.esHistory)} className="py-1 px-4" style={{ borderRadius: 10, backgroundColor: 'white' }}>
                <img src={ES} alt="" className="w-full h-28" style={{ borderRadius: 10 }} />
                <p className="text-center text-sm font-bold" >ES履歴</p>
              </div>
              <div onClick={() => navigate(Paths.caseStudyHistory)} className="py-1 px-4" style={{ borderRadius: 10, backgroundColor: 'white' }}>
                <img src={Case} alt="" className="w-full h-28 " style={{ borderRadius: 10 }} />
                <p className="text-center text-sm font-bold">ケース履歴</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 p-2 mx-4" style={{ borderRadius: 10, backgroundColor: 'white' }}>
              <div>
                <img src={EventIco} alt="" className="w-full h-28 " style={{ borderRadius: 10 }} />
              </div>
              <div className="ps-3 w-full col-span-2">
                <div className="font-bold text-lg">次のおすすめ講義</div>
                <ul className="list-disc mb-2 ml-2">
                  {event3.length > 0 && event3.map(event => (
                    <li className="text-base elp-title">{event.name}</li>
                  ))}
                </ul>
                <LinkButton link={Paths.eventHistory} title="おすすめイベント" className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex grid-cols-2 justify-between">
          <div><Heading title="チケット" /></div>
          <div>
            <Button
              title="購入する"
              bgColor="bg-transparent"
              bgColorHover="bg-orange-700"
              className="px-4 mb-3 mr-3 rounded-full py-2 text-xs text-primary border border-primary"             
              onClick={()=>{navigate(Paths.ticketPurchase)}}
              style={{ color: 'rgb(17 4 121)' }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="mt-2 grid grid-cols-4 gap-2 p-2 mx-4" style={{ borderRadius: 10, backgroundColor: 'white' }}>
              <div className="text-center">
                <img src={InterViewTicket} alt="" className="w-full w-28  border border-gray-400" style={{ borderRadius: 10 }} />
                <p style={{ fontSize: 9 }}>
                  面談チケット
                </p>
                <p style={{ fontSize: 9 }}>
                  (所持数 {tickets.interview_ticket_number}枚)
                </p>
              </div>
              <div className="text-center">
                <img src={EvenTicket} alt="" className="w-full w-28 border border-gray-400" style={{ borderRadius: 10 }} />
                <p style={{ fontSize: 9 }}>
                  イベントチケット
                </p>
                <p style={{ fontSize: 9 }}>
                  (所持数 {tickets.event_ticket_number}枚)
                </p>
              </div>
              <div className="text-center">
                <img src={CaseTicket} alt="" className="w-full w-28  border border-gray-400" style={{ borderRadius: 10 }} />
                <p style={{ fontSize: 9 }}>
                  ケースチケット
                </p>
                <p style={{ fontSize: 9 }}>
                  (所持数 {tickets.case_ticket_number}枚)
                </p>
              </div>
              <div className="text-center">
                <img src={ESTicket} alt="" className="w-full w-28  border border-gray-400" style={{ borderRadius: 10 }} />
                <p style={{ fontSize: 9 }}>
                  ESチケット
                </p>
                <p style={{ fontSize: 9 }}>
                  (所持数 {tickets.es_ticket_number}枚)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Heading title="その他" />
        <div className="bg-white shadow-md flex border border-gray-200 grid-cols-2 p-1 justify-between">          
            <p className="pl-6">チケット購入</p>
            <ChevronDoubleRightIcon className="w-4 h-5 ps-1" />
        </div>
        <div className="bg-white shadow-md flex border border-gray-200 grid-cols-2 p-1 justify-between">          
            <p className="pl-6">利用規約</p>
            <ChevronDoubleRightIcon className="w-4 h-5 ps-1" />
        </div>
        <div className="bg-white shadow-md flex border border-gray-200 grid-cols-2 p-1 justify-between">          
            <p className="pl-6">プライバシーポリス</p>
            <ChevronDoubleRightIcon className="w-4 h-5 ps-1" />
        </div>
      </div>
    </section>
  )
}