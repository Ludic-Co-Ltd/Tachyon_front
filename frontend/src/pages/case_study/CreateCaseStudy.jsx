import React from "react";
import Heading from "../../components/partials/Heading";
import CaseStudyEdit from "../../features/case_study/CaseStudyEdit";
import Footer from '../../components/partials/Footer';


export default () => {
  return (
    <section>      
      <div className="bg-white px-16 pb-4">
				<div className="flex">
					<Heading title="ケース作成" />
				</div>
			</div>
			<div className="p-16">
        <CaseStudyEdit />
      </div>
      <div className="mt-16">
				<Footer />
			</div>
    </section>
  )
}