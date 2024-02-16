import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import EditIndustry from "../../features/industry/EditIndustry";

export default () => {
  return (
    <section className="mx-4">
      <div className="">
        <Heading title="業界編集" />
      </div>
			<div className="my-5">
        <EditIndustry />
      </div>
    </section>
  )
}