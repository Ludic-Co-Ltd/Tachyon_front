import React from "react";
import Heading from "../../components/partials/Heading";
import MentorEdit from "../../features/mentor/MentorEdit";
import Footer from '../../components/partials/Footer';

export default function RegisterMentor() {
  return (
    <section>
      <div className="bg-white px-16 pb-4">
        <Heading title="メンター登録" />
      </div>
			<div className="p-16">
        <MentorEdit />
      </div>
      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
}