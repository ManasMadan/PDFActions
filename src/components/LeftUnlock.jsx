"use client";
import React, { useEffect } from "react";

export default function LeftUnlock({ file }) {
  useEffect(() => {
    if (file) file.unlockPassword = "";
  }, []);

  return (
    <div className="w-full border-y-2 border-[#E9B4BF80] py-2 tracking-wider">
      <p className="mb-2 font-medium">Unlock Settings</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Password</span>
          <input
            id="unlockPassword"
            type="password"
            placeholder="Optional"
            className="h-8 w-1/2 rounded-md bg-[#E9B4BF80] pl-2 text-sm"
            onChange={(e) => {
              if (file) file.unlockPassword = e.target.value;
            }}
          />
        </div>
        <p className="text-xs opacity-70">
          Leave empty for permission-restricted PDFs. Enter password for
          password-protected PDFs.
        </p>
      </div>
    </div>
  );
}
