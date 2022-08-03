import React from "react";

interface ISpecialNotificationProps {
  text: string
}

const SpecialNotification = ({text}: ISpecialNotificationProps) => {
  return (
    <div className="m-2 p-4 bg-red-800 bg-opacity-90 text-white max-w-xs rounded-md">
      {text}
    </div>
  );
};

export default SpecialNotification;
