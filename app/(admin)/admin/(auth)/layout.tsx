import { ReactNode } from "react";

const AgentAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen gap-8 items-center justify-center max-w-96 mx-auto px-4">
      <div className="">
        <h1 className="text-center w-full text-3xl font-bold">TMS ADMIN</h1>
      </div>
      {children}
    </div>
  );
};

export default AgentAuthLayout;
