import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import CorrectionEntrySheet from "../../features/entry_sheet/CorrectionEntrySheet";

export default () => {
  return (
    <section className="mx-4">
      <div className="mt-5">
        <Heading title="ES添削" />
      </div>
			<div className="my-5">
        <CorrectionEntrySheet />
      </div>
    </section>
  )
}