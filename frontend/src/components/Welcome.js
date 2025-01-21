import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="[&>*]:text-center">
      <h1 className="text-5xl font-minerva">
        Welcome to Infact
      </h1>
      <div className="">
        <Link to="/main">Click here to find your job</Link>
      </div>
    </div>
  );
};

export default Welcome;
