import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { backendUrl } from "../../utils/textDisplay";
import { fetchEvent } from '../../utils/actions';
import DownloadIcon from '@mui/icons-material/Download';
import { eventAdd, getEventTicket } from '../../utils/actions';
import Button from "../../components/button/Button";
import StarRating from "../../components/partials/StarRating";
import { Paths } from "../../config/Paths";
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function ShowEvent() {
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent(id)
      .then(res => {
        if (res.status == 200) {
          setEvent(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  const eventAddFunc = () => {
    let today = new Date()
    let td = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // if (moment(event.event_date).format('YYYY/MM/DD') < moment(td).format('YYYY/MM/DD')) {
    //   toastr.error('イベントを登録できません。<br>イベントは1日前に予約する必要があります。');
    //   return false;
    // }
    if (new Date(event.event_date) < new Date()) {
      toastr.error('イベントを登録できません。<br>イベントは1日前に予約する必要があります。');
      return false;
    }

    getEventTicket()
      .then(res => {
        if (res.status == 200) {
          // toastr.success('イベントが追加されました。');
          // navigate("../dashboard")
          // return;
          console.log(res.data.event_ticket_number);
          if (res.data.event_ticket_number < 1) {
            toastr.error('イベントチケットを購入する必要があります。');
            return false
          }
          if (window.confirm("イベントに参加しますか？")) {

            eventAdd(id)
              .then(res => {
                if (res.status == 200) {
                  toastr.success('イベントが追加されました。');

                  navigate(Paths.dashboard)
                  return;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

  };

  return (
    <section>
      <div className="p-4">
        <button onClick={() => navigate(-1)}>
          <div className="flex text-base py-2">
            <ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
          </div>
        </button>

        <div className="mt-2">
          <img src={event.image_path && (backendUrl + event.image_path)}
            alt="event logo"
            className="company-logo aspect-[16/9] border border-slate-200"
          />

          <div className="flex w-full gap-6  text-center">
            <div className="flex items-center justify-center text-xl font-bold break-keep elp-title">{event.name}</div>
            {/* <div className="flex items-end text-xs justify-end w-full">grade</div> */}
          </div>
          <div className="flex justify-between w-full text-xs grid-2">
            {new Date(event.event_date) > new Date() ?
              <div className="">
                <div className="flex items-start text-xs text-gray break-keep mt-1">開催日 : {moment(event.event_date).format('MM/DD')}</div>
              </div> :
              <div className="">
                <div className="flex items-start text-xs text-gray break-keep mt-1">イベント終了</div>
              </div>}
            <StarRating rating={event.rating} />
          </div>
          <hr className="border-b border-gray-300 w-full my-2" />
          <p>{event.overview}</p>
        </div>

        <div className="mt-5 my-4">
          <h5 className="font-bold">イベント資料</h5>
          <hr className="border-b border-gray-300 w-full my-2" />
          {/* <img src={event.materials_path && (backendUrl + event.materials_path)}
            alt="event material image"
            className="company-logo aspect-[2/1] border border-slate-200"
          /> */}
          <a href={event.materials_path && (backendUrl + event.materials_path)} target='_blank' download>
            <div className="pdf-container h-52">
              <Document
                file={backendUrl + event.materials_path}
                className={'h-52'}
              >
                <Page
                  pageNumber={1}
                  height={300}
                  renderTextLayer={false}
                  className={'h-52'}
                />
              </Document>

            </div>
            <p className="text-right my-4"><DownloadIcon />ダウンロードファイル</p>
          </a>
          {new Date(event.event_date) > new Date() &&
          <div className="flex flex-wrap justify-center gap-5 my-4 z-50 relative">
            <Button
              title="参加"
              bgColor="bg-orange-400"
              bgColorHover="bg-orange-700"
              className="px-6 py-1 text-xl rounded-lg"
              handleClick={eventAddFunc}
            />
          </div>}
        </div>
      </div>
    </section>
  )
}