import React from "react";
import Heading from "../../components/partials/Heading";
import MenteeEdit from "../../features/mentee/MenteeEdit";
import Footer from '../../components/partials/Footer';


const EditMentee = () => {
  
  return (
    <section>
      <div className="bg-white px-16 pb-4">
        <div className="flex flex-wrap justify-between">
          <Heading title="メンティー編集" />
        </div>
      </div>

      <div className="p-16">
        <MenteeEdit />
      </div>

      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
};

export default EditMentee;