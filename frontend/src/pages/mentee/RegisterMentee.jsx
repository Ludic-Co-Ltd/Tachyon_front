import React from "react";
import Heading from "../../components/partials/Heading";
import MenteeEdit from "../../features/mentee/MenteeEdit";
import Footer from "../../components/partials/Footer";

export default function RegisterMentee() {
  return (
    <section>
      <div className="bg-white px-16 pb-4" style={{ height: '50px' }}>
        <Heading title="メンティー登録" />
      </div>

      <div className="px-16 pb-16">
        <MenteeEdit />
      </div>

      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
}