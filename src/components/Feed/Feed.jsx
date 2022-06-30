import React from "react";
import DpMaker from "../DpMaker/DpMaker";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
const Feed = ({ feedInfo }) => {
  const { name, designation, question, answer, love, comment, share } = feedInfo;
  // const { img_url } = user;
  return (
    <section className="mb-3 shadow mx-auto max-w-[500px] border border-gray-200">
      {/* Card */}
      <div className="bg-white rounded p-5 ">
        {/* user info starts*/}
        <div className="flex gap-3 centerY mb-4">
          <DpMaker name={name} height="40px" color="#d35400" />
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-500">{designation}</p>
          </div>
        </div>
        {/* user info ends*/}
        {/* question start */}
        <h1 className="font-semibold text-xl mb-2">{question}</h1>
        <p className="mb-3">{answer}</p>
        {/* question ends */}
        {/* reactions, comments and share starts */}
        <div className="flex gap-5">
          <button className="iconButton">
            {true ? <AiFillHeart className="iconSize" /> : <AiOutlineHeart className="iconSize" />}
            {love}
          </button>
          <button className="iconButton">
            <BiShare className="iconSize" /> {share}
          </button>
          <button className="iconButton">
            <FaRegComment className="iconSize" /> {comment}
          </button>
        </div>
        {/* reactions, comments and share ends */}
      </div>
    </section>
  );
};

export default Feed;
