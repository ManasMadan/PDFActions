import { cn } from "@/lib/utils";
import React from "react";

export default function GlassButton(props) {
  return (
    <button
      {...props}
      className={cn(
        "w-full rounded-md border-2 border-[#E9B4BF80] bg-[#FFFFFF42] py-3 shadow-sm shadow-[#FFFFFF42] backdrop-blur-sm",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
