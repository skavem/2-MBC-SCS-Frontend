import React from "react";

import { useAppSelector } from "../../hooks/redux";
import SpecialNotification from "./SpecialNotification";

const NotificationContainer = () => {
  const errors = useAppSelector((state) => state.errors.list);
  return (
    <div className="absolute top-0 right-0 m-5">
      {errors.map((e) => (
        <SpecialNotification text={e.text} key={e.key} />
      ))}
    </div>
  );
};

export default NotificationContainer;
