import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import CorrectionCaseStudy from "../../features/case_study/CorrectionCaseStudy";

export default () => {
  return (
    <section className="mx-4">
      <div className="">
        <Heading title="ケース添削" />
      </div>
			<div className="my-5">
        <CorrectionCaseStudy />
      </div>
    </section>
  )
}