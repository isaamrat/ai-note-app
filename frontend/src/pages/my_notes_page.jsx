import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppBarLogo from "../components/appbar_logo";
import { IoPersonSharp } from "react-icons/io5";
import { RiStickyNoteAddLine } from "react-icons/ri";
import NewNote from "../components/new_note";
import getNotes from "../controllers/retrieve_notes_handler";
import NoteList from "../components/notes_list";
import NoteTakingImage from "../components/note_taking_image";
import SingleNote from "../components/single_note";

export default function NotePage() {
  const [allNotes, setAllNotes] = useState("");
  const navigate = useNavigate();
  const [rightSideState, setRightSideState] = useState("image");
  const [singleNoteData, setSingleNoteData] = useState({
    note_id: "",
    title: "",
    content: "",
    user_email: "",
  });
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const [showLeft, setShowLeft] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("user_email")) {
      navigate("/");
    }
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes(sessionStorage.getItem("user_email"));
        setAllNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };

    fetchNotes();
  }, [sessionStorage.getItem("user_email"), showToast]);

  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (!(message.includes("updated") || message.includes("Summarized"))) {
      setShowLeft("");
    }
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  const handleSingleNoteData = (newData) => {
    setRightSideState("single_note");
    setShowLeft("hidden");
    setSingleNoteData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="font-Poppins w-full h-screen bg-[#A7E6FF]">
      <div className="bg-[#3572EF] flex text-white p-3 sm:px-5 items-center">
        <AppBarLogo />
        <button
          className=" bg-[#e08f51] hover:bg-[#b35e1e] px-4 py-2 sm:mr-3 duration-200 rounded-full"
          onClick={() => handleLogout()}
        >
          LogOut
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:h-[90.5%]">
        <div
          className={`lg:w-3/12  lg:flex  bg-[#BBE9FF] p-4 justify-center ${showLeft}`}
        >
          {/* Sidebar (1/3 width on desktop) */}
          <div className=" container flex flex-col items-center">
            <div className=" h-24 w-24 rounded-full p-[6px] bg-white flex items-center justify-center">
              {
                <img
                  src={sessionStorage.getItem("avatarImage")}
                  alt="Loading"
                />
              }
            </div>
            <h1 className=" font-semibold mt-2">
              {sessionStorage.getItem("user_name")}
            </h1>
            <h1 className=" font-semibold mb-2">
              {sessionStorage.getItem("user_email")}
            </h1>
            <div className=" w-5/6">
              <button
                className=" w-full"
                onClick={() => {
                  setRightSideState("new_note");
                  setShowLeft("hidden");
                }}
              >
                <div className=" flex gap-3 justify-center items-center p-2 py-3 bg-white rounded-full hover:bg-[#3572EF] hover:text-white hover:cursor-pointer">
                  <RiStickyNoteAddLine />
                  Create new note
                </div>
              </button>
            </div>
            <div className="  w-5/6 overflow-hidden">
              <div className="  overflow-y-scroll max-h-[100%] no-scrollbar">
                <div className=" ">
                  <NoteList
                    data={allNotes}
                    handleSingleNoteData={handleSingleNoteData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:w-9/12 lg:p-4">
          {/* Main content (2/3 width on desktop) */}

          {rightSideState == "image" ? (
            <div className=" w-full h-5/6 hidden lg:flex flex-col justify-center items-center gap-5">
              <NoteTakingImage />
              <button
                className=""
                onClick={() => setRightSideState("new_note")}
              >
                <div className=" p-3  flex gap-3 justify-center items-center  bg-white rounded-full hover:bg-[#3572EF]">
                  <RiStickyNoteAddLine />
                  Create new note
                </div>
              </button>
            </div>
          ) : rightSideState == "single_note" ? (
            <SingleNote
              noteData={singleNoteData}
              handleToast={handleShowToast}
              setRightSideState={setRightSideState}
            />
          ) : (
            <div className=" flex justify-center">
              <NewNote
                user_email={sessionStorage.getItem("user_email")}
                handleToast={handleShowToast}
              />
            </div>
          )}
        </div>
      </div>
      {showToast && (
        <div
          className={
            !toastMessage.includes("unsuccessful")
              ? "fixed bottom-4 left-1/2 transform -translate-x-1/2  bg-green-600 text-white px-4 py-2 rounded-full"
              : "fixed bottom-4 left-1/2 transform -translate-x-1/2  bg-red-600 text-white px-4 py-2 rounded-full"
          }
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
