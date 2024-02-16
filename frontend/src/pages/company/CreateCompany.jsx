import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import EditCompany from "../../features/company/EditCompany";

export default () => {
  return (
    <section className="mx-4">
      <div className="">
        <Heading title="企業作成" />
      </div>
			<div className="my-5">
        <EditCompany />
      </div>
    </section>
  )
}