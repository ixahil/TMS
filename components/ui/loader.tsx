import { Loader2 } from "lucide-react";
import React from "react";

export const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Loader2 size={48} className="animate-spin" />
    </div>
  );
};
