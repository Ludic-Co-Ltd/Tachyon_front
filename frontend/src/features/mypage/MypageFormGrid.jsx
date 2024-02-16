import React, { useState, useEffect } from "react";
import Input from "../../components/form/Input";

export default (props) => {
	const { name1, name2, placeholder1, placeholder2, value1, value2, label, type, onChange1, onChange2 } = props

  return (
    <div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name1}>
        {label}
      </label>
      <div className="grid grid-cols-12 gap-2">
        <Input
          name={name1}
          type={type}
          placeholder={placeholder1}
          value={value1}
          className="col-span-6"
          handleChange={onChange1}
        />
        <Input
          name={name2}
          type={type}
          placeholder={placeholder2}
          value={value2}
          className="col-span-6"
          handleChange={onChange2}
        />
      </div>
		</div>
  )
}