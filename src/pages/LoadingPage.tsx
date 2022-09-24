import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <LoadingSpinner className="h-16 mb-6"/>
      <div className="text-center">
        Нет подключения к серверу. <br />
        Если долго не пропадает, попробуй изменить настройки или включить
        сервер.
      </div>
    </div>
  );
};

export default LoadingPage;
