import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const AddPageLayout = ({ children, title }: Props) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default AddPageLayout;
