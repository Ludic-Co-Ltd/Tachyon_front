import React from "react";
import Heading from "../../components/partials/Heading";
import SelInfoEdit from "../../features/selection/SelInfoEdit";
import Footer from '../../components/partials/Footer';


const EditSelInfo = () => {
  return (
    <section>
      <div className="bg-white px-16 pb-4">
        <div className="flex flex-wrap justify-between">
          <Heading title="選考情報編集" />
        </div>
      </div>

      <div className="p-16">
        <SelInfoEdit />
      </div>

      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
};

export default EditSelInfo;