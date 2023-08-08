"use client";

import ReactSelect from "react-select";

export default function Select({ label, value, onChange, options, disabled }) {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-textprimary">
        {label}
      </label>

      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ 
              ...base, 
              zIndex: 9999 
            }),
          }}
          className={{
            control: () => "text-sm"
          }}
          isMulti
        />
      </div>
    </div>
  );
}