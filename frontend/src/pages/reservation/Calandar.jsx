import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';
import { Paths } from "../../config/Paths";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/partials/Heading";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { fetchCalandarEvents } from '../../utils/actions';
import EventModal from "../../components/modal/EventModal";

const DynamicCalendarSchedule = () => {

  const [startDate, setStartDate] = useState(moment().day(-6).format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().day(6).format("YYYY-MM-DD"));

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [open, setOpen] = useState(false);
  // Fetch events from an API or any other data source
  useEffect(() => {

    console.log(startDate, endDate)

    // Replace this with your actual API call to fetch events
    fetchCalandarEvents(startDate, endDate)
      .then((res) => {
        if (res.status == 200) {
          let eventData = []


          res.data.forEach(r => {

            //type 1: general, 2: gelira
            //state 0: check 1: uncheck

            if (r.type == 3) {
              eventData = [...eventData, {
                extendedProps: {
                  type: r.type,
                  state: r.state,
                },
                id: r.id,
                start: r.date.slice(0, 10) + 'T' + r.start.slice(11, 16),
                end: r.date.slice(0, 10) + 'T' + r.end.slice(11, 16),
                title: r.title,
                //backgroundColor:'#6DB9EF',
                color: r.color,
                overlap: 'fffffffffffff',
                name: r.title,
                event_date: r.date,
                start_time: r.start,
                end_time: r.end,
                zoom_url: r.zoom_url,
                open_chat_url: r.open_chat_url,
              }]

            } else {
              eventData = [...eventData, {
                extendedProps: {
                  type: r.type,
                  state: r.state,
                },
                id: r.id,
                start: moment(r.date).format('YYYY-MM-DD') + 'T' + r.start.slice(11, 16),
                end: moment(r.date).format('YYYY-MM-DD') + 'T' + r.end.slice(11, 16),
                title: r.title,
                //backgroundColor:'#6DB9EF',
                color: r.color,
                overlap: 'fffffffffffff',
                name: r.title,
                image_path: r.image_path,
                event_date: r.event_date,
                start_time: r.start,
                end_time: r.end,
                zoom_url: r.zoom_url,
                open_chat_url: r.open_chat_url,
                rating: r.rating,
              }]
            }

          })
          setEvents(eventData)
        }
      })
      .catch(err => {
        console.log(err);
      });


  }, [startDate]);

  const handleDateClick = (info) => {
    console.log('Date clicked: ', info.dateStr);
  };

  const customDayHeaderContent = (info) => {
    // Customize the day header content here
    const date = info.date.getDate(); // Get the day of the month
    const dayName = info.date.toLocaleString('ja-JP', { weekday: 'short' }); // Get the short name of the day

    console.log(info.view.type);

    if (info.view.type == "dayGridMonth") {
      return (
        <div>
          {dayName}
        </div>
      );
    } else {
      return (
        <div>
          {date}({dayName})
        </div>
      );
    }
  };

  const handleDatesSet = (arg) => {
    setStartDate(moment(arg.startStr).format("YYYY-MM-DD"));
    setEndDate(moment(arg.endStr).format("YYYY-MM-DD"));
  };
  const navigate = useNavigate();
  const handleEventClick = (clickInfo) => {
    // Handle event click
    // const eventTitle = clickInfo.r.title;
    // const eventStart = clickInfo.r.start;
    // const eventEnd = clickInfo.r.end;

    if (clickInfo.event.extendedProps.type == 3) {
      setEvent(clickInfo.event.extendedProps);
      setOpen(true);
    } else {
      if (clickInfo.event.extendedProps.state == 1 || clickInfo.event.extendedProps.state == true) {
        setEvent(clickInfo.event.extendedProps);
        setOpen(true);
      } else {

        console.log('Event alt:', clickInfo.event.id);
        navigate(Paths.showEvent.replace(':id', clickInfo.event.id))
      }
    }

  };

  return (
    <section className="">
      <div className="py-5">
        <Heading title="カレンダー予約" />
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        datesSet={handleDatesSet}
        height={'73vh'}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        titleFormat={{
          month: 'long', // Display full month name
          // week: 'long', // Display full week name
          // day: 'long' // Display full day name
        }}
        dayHeaderContent={customDayHeaderContent}
        eventClick={handleEventClick}
        stickyHeaderDates={true}
        locales={[jaLocale]}
        locale="ja"
   
   
      />
      <EventModal {...event} open={open} setOpen={setOpen} />
    </section>
  );
};

export default DynamicCalendarSchedule;
