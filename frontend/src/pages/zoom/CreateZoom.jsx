import React from "react";
import Heading from "../../components/partials/Heading";
import EditZoom from "../../features/zoom/ZoomEdit";
import Footer from '../../components/partials/Footer';


export default () => {
  return (
    <section>
      <div className="bg-white px-16 pb-4">
        <Heading title="コラム" />
      </div>
			<div className="p-16">
        <EditZoom />
      </div>
      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
}