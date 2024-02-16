import React from "react";
import Heading from "../../components/partials/Heading";
import ZoomEdit from "../../features/zoom/ZoomEdit";
import Footer from '../../components/partials/Footer';


export default function EditZoom() {
  return (
    <section>
      <div className="bg-white px-16 pb-4">
        <Heading title="コラム" />
      </div>
			<div className="px-16 pb-16">
        <ZoomEdit />
      </div>
      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
}