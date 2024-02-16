import React, { useState, useEffect } from "react";
import moment from 'moment';
import Heading from "../../components/partials/Heading";
import Zoom from "../../assets/images/zoom.jpg";
import Events from "../../features/dashboard/Events";
import ArticleCard from "../../features/dashboard/ArticleCard";
import { fetchAllEvents, fetchEventReservations, fetchLastArticle, fetchLastZooms } from '../../utils/actions';
import { backendUrl } from "../../utils/textDisplay";

export default () => {

  const [events, setEvents] = useState({});
  const [event_reservations, setEventReservations] = useState([]);
  const [article, setArticle] = useState({});
  const [zoom, setZoom] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllEvents(moment().startOf('isoWeek').format('YYYY-MM-DD'))
      .then(res => {
        if (res.status == 200) {
          setEvents(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchEventReservations()
      .then(res => {
        if (res.status == 200) {
          setEventReservations(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchLastArticle()
      .then(res => {
        if (res.status == 200) {
          setArticle(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchLastZooms()
      .then(res => {
        if (res.status == 200) {
          setZoom(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (
    <section className="bg-gray">
      <div className="my-4   py-3 px-5">
        <Heading title="本日のZOOM" />
        {zoom && zoom.image_path ?
          <a href={zoom.zoom_url} target="_blank">
            <img className="aspect-[16/9] mx-auto border-gray-500 rounded-2xl" style={{width:330}} src={backendUrl + zoom.image_path} alt=""  />
          </a> 
          :<div style={{width:330, height:100}} className="text-center flex items-center justify-center text-base ">データはありません。</div>
        }
      </div>

      <div className="my-4">
        <Heading title="イベント" />
        <Events events={events} padding={'3rem'} />
      </div>
      <div className="my-4">
        <Heading title="イベントリマインダー" />
        {event_reservations.length > 0 ? <Events event_reservations={event_reservations} category='reservation' padding={'3rem'} /> :
          <p className="text-center mt-2">予約情報はありません。</p>
        }
      </div>
      <div className="my-4">
        <Heading title="今日のコラム" />
        <ArticleCard {...article} />
      </div>
    </section>
  )
}