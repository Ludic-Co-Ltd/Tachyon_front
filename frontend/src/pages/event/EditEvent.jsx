import React from "react";
import Heading from "../../components/partials/Heading";
import EventEdit from "../../features/event/EventEdit";
import Footer from '../../components/partials/Footer';


export default function EditEvent() {
  return (

    <section>
      <div className="bg-white px-16 pb-4">
        <div className="flex flex-wrap justify-between">
          <Heading title="イベント編集" />
        </div>
      </div>
      <div className="p-16">
        <EventEdit />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </section>
  )
}