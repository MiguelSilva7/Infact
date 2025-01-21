import React from "react";

const DialogBox = ({ callback, message }) => {
  return (
    <div className="">
      <div
        onClick={() => callback()}
        className="fixed left-0 top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.5)]"
      ></div>
      <div className="bg-mywhite fixed left-1/2 top-1/2 z-20 flex h-[300px] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-evenly border-4 border-black p-8 sm:w-[400px]">
        <div className="text-center text-lg md:text-2xl">{message}</div>
        <div
          onClick={() => callback()}
          className="bg-myyellow hover:bg-myviolet small-neobrutalism small-neobrutalism-hover cursor-pointer px-5 py-3"
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
