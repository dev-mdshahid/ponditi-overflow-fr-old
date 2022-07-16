import createNotification from "./createNotification";

const handleUpvote = ({ upvoteContent, upvoteInfo, setUpvoteInfo, answer_id, user, receiver }) => {
  if (!upvoteInfo[user?.user_email]) {
    upvoteContent.mode = "add";
  } else {
    upvoteContent.mode = "delete";
  }
  // * sending request for creatig upvote * //
  const url = `https://ponditi-overflow.herokuapp.com/createupvote`;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(upvoteContent),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        if (upvoteContent.mode === "add") {
          const tempUpvoteCotent = { ...upvoteInfo };
          tempUpvoteCotent[user?.user_email] = answer_id;
          setUpvoteInfo(tempUpvoteCotent);
          createNotification({
            provoker: user?.user_email,
            receiver,
            mode: "upvote",
            answer_id,
            seen: false,
          });
        } else {
          const tempUpvoteCotent = { ...upvoteInfo };
          delete tempUpvoteCotent[user?.user_email];
          setUpvoteInfo(tempUpvoteCotent);
        }
      }
    });
};
export default handleUpvote;
