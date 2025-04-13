import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Title = ({ children }: { children: string }) => {
  return <h1 className="font-bold">{children}</h1>;
};

const Description = ({ children }: { children: string }) => {
  return <p className="text-gray-500 text-[0.9rem]">{children}</p>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[1rem]">
      <SidebarTrigger className="cursor-pointer" />
      <div className="flex flex-col gap-[.5rem]">{children}</div>
    </div>
  );
};

export default {
  Wrapper,
  Title,
  Description,
};
