import React from "react";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { useQuery } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiUserShared2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const UserStat = () => {
  const { user } = useContext(UserContext);
  const [totalActivities, setTotalActivities] = useState(1);

  // * getting all answer given by user * //
  const { data: answers, refetch: answersRefetch } = useQuery(`answer_${user?.user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getuseranswers/${user?.user_email}`).then((res) =>
      res.json()
    )
  );

  // * getting all questions asked by the user * //
  const { data: questions, refetch: questionRefecth } = useQuery(
    `userQuestion${user?.user_email}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/getuserquestions/${user?.user_email}`).then(
        (res) => res.json()
      )
  );

  // * getting all following info * //
  const { data: followingList, refetch: followingListRefetch } = useQuery(
    `following_${user?.user_email}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/followings/${user?.user_email}`).then((res) =>
        res.json()
      )
  );

  // * getting all follower info * //
  const { data: followersList, refetch: followersListRefetch } = useQuery(
    `followers_${user?.user_email}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/followers/${user?.user_email}`).then((res) =>
        res.json()
      )
  );

  useEffect(() => {
    answersRefetch();
    questionRefecth();
    followersListRefetch();
    followingListRefetch();
    if (answers && questions && followersList && followingList) {
      const totalAct =
        answers.length +
        questions.length +
        Object.keys(followersList).length +
        Object.keys(followingList).length;
      if (totalAct !== 0) {
        setTotalActivities(totalAct);
      }
    }
  }, [
    answersRefetch,
    questionRefecth,
    followersListRefetch,
    followingListRefetch,
    answers,
    questions,
    followersList,
    followingList,
  ]);

  return (
    <section className="">
      <h1 className="font-semibold text-center mb-5">Your Activities</h1>
      <div className="flex flex-col gap-3">
        <ChildBox
          title={"Answers"}
          count={answers && answers.length}
          buttonContent={<FiEdit />}
          color={"#FFEBEB"}
          textColor={"#E92C2C"}
          ratio={answers && (answers.length / totalActivities) * 100}
          link={`/profile/${user?.user_email}/answers`}
        />
        <ChildBox
          title={"Question"}
          count={questions && questions.length}
          buttonContent={<FaRegQuestionCircle />}
          color={"#E5F3FF"}
          textColor={"#0085FF"}
          ratio={(questions && questions.length / totalActivities) * 100}
          link={`/profile/${user?.user_email}/questions`}
        />
        <ChildBox
          title={"Followers"}
          count={followersList && Object.keys(followersList).length}
          buttonContent={<FiUsers />}
          color={"#E5F8EB"}
          textColor={"#00BA34"}
          ratio={followersList && (Object.keys(followersList).length / totalActivities) * 100}
          link={`/profile/${user?.user_email}/followers`}
        />

        <ChildBox
          title={"Followings"}
          count={followingList && Object.keys(followingList).length}
          buttonContent={<RiUserShared2Line />}
          color={"#FFF5E8"}
          textColor={"#F98600"}
          ratio={followingList && (Object.keys(followingList).length / totalActivities) * 100}
          link={`/profile/${user?.user_email}/followings`}
        />
      </div>
    </section>
  );
};

const ChildBox = ({ title, count, buttonContent, color, textColor, ratio, link }) => {
  const path = useNavigate();
  return (
    <div
      className="hover:bg-gray-200 p-3 rounded cursor-pointer transitionClass"
      onClick={() => path(link)}
    >
      <div className="flex items-start justify-between">
        <div className="mt-1">
          <p>{title}</p>
          <h1 className="text-3xl font-bold">{count}</h1>
        </div>
        <button
          className={`w-[40px] h-[40px] rounded-full centerXY text-xl`}
          style={{ backgroundColor: color, color: textColor }}
        >
          {buttonContent}
        </button>
      </div>
      <ProgressBar color={textColor} ratio={ratio} />
    </div>
  );
};

const ProgressBar = ({ color, ratio }) => {
  return (
    <>
      <div className="centerY justify-between text-sm mt-2">
        <p>Ratio</p>
        <p>{ratio && ratio.toFixed(2)}%</p>
      </div>
      <div className="bg-gray-300 py-[1px] rounded-full overflow-hidden">
        <div className="h-[7px]" style={{ backgroundColor: color, width: `${ratio}%` }}>
          &nbsp;
        </div>
      </div>
    </>
  );
};

export default UserStat;
