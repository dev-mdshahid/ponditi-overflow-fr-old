import React, { useEffect, useState } from "react";
import DpMaker from "../../components/DpMaker/DpMaker";
import { BsQuestionSquare } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import Modal from "../../components/Modal/Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/firebase.init";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/toastConfig";

const Post = () => {
  const [postModal, setPostModal] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userFirstLetter, setUserFirstLetter] = useState(user?.displayName);
  const [user_email, setUser_email] = useState(user.email);

  useEffect(() => {
    setUserFirstLetter(userFirstLetter);
    setUser_email(user.email);
  }, [user, setUserFirstLetter]);
  if (loading) {
    return null;
  }
  const askHandler = (e) => {
    e.preventDefault();
    const question_description = e.target.elements.askingFelid.value;
    const quesInfo = {
      user_email,
      question_description,
    };

    const url = `http://localhost:5500/createquestion`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quesInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("You question has been published", toastConfig);
          setPostModal(false);
          e.target.reset();
        }
      });
  };
  return (
    <section className="mb-3 rounded-lg shadow border bg-white py-3 border-gray-200">
      <div className="centerY gap-5 border-b border-gray-300 px-5 pb-3">
        {/* user's dp */}
        <div>{false ? <img src="" alt="" /> : <DpMaker name={userFirstLetter} />}</div>
        {/* post box */}
        <div className="input rounded-full" onClick={() => setPostModal(true)}>
          <h1>What do you want to ask?</h1>
          <Modal openModal={postModal} setOpenModal={setPostModal} title="What Do You Want to Ask?">
            <form className="p-5" onSubmit={askHandler}>
              <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3">
                <h1 className="font-semibold text-base">Tips on getting good answers quickly</h1>
                <div className="px-4">
                  <ul className="list-disc">
                    <li>Make sure your question has not been asked already</li>
                    <li>Keep your question short and to the point</li>
                    <li>Double-check grammar and spelling</li>
                  </ul>
                </div>
              </div>
              <textarea
                className="w-full h-fit min-h-[40px] px-5 py-3 outline-none border-b border-gray-400"
                placeholder="What do you want to ask?"
                name="askingFelid"
                rows={"4"}
              />
              <button className="btn-red">Ask</button>
            </form>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-2 px-5">
        <button
          className="centerXY hover:bg-gray-300 py-1 rounded"
          onClick={() => setPostModal(true)}
        >
          <BsQuestionSquare /> &nbsp; Ask
        </button>
        <button className="centerXY hover:bg-gray-300 py-1 rounded">
          <VscNotebook /> &nbsp; Answer
        </button>
      </div>
    </section>
  );
};

export default Post;
