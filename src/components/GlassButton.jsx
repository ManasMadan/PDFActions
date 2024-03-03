import React from "react";

export default function GlassButton(props) {
  return (
    <button
      className="w-full rounded-md border-2 border-[#E9B4BF80] bg-[#FFFFFF42] py-3 shadow-lg shadow-[#FFFFFF42] backdrop-blur-sm"
      {...props}
    >
      {props.children}
    </button>
  );
}
