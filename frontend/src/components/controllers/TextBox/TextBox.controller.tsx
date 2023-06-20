import React from "react";
import { TextBoxType } from "./TextBox.type";

export default function TextBox(props: TextBoxType) {
  const { Placeholder, Title, Type, AutoFocus = true, Required = true, Id, Name } = props;
  return (
    <div>
      <label className="block text-gray-700">{Title}</label>
      <input
        type={Type}
        name={Name}
        id={Id}
        placeholder={Placeholder}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autoFocus={AutoFocus}
        required={Required}
      />
    </div>
  );
}
