"use client";
import React, { useEffect } from "react";

export default function LeftProtect({ file }) {
  useEffect(() => {
    if (file) {
      file.protectHideToolbar = false;
      file.protectHideMenubar = false;
      file.protectHideWindowUI = false;
      file.protectNoPrint = false;
    }
  }, []);

  const checkboxes = [
    { id: "protectHideToolbar", label: "Hide Toolbar" },
    { id: "protectHideMenubar", label: "Hide Menubar" },
    { id: "protectHideWindowUI", label: "Hide Window UI" },
    { id: "protectNoPrint", label: "Restrict Printing" },
  ];

  return (
    <div className="w-full border-y-2 border-[#E9B4BF80] py-2 tracking-wider">
      <p className="mb-2 font-medium">Protection Settings</p>
      <div className="flex flex-col gap-2">
        {checkboxes.map(({ id, label }) => (
          <label
            key={id}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              onChange={(e) => {
                if (file) file[id] = e.target.checked;
              }}
            />
            {label}
          </label>
        ))}
        <p className="mt-1 text-xs opacity-70">
          Sets viewer preferences to restrict operations in compliant PDF
          readers.
        </p>
      </div>
    </div>
  );
}
