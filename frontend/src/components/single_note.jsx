import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { PiMagicWandDuotone } from "react-icons/pi";
import updateNote from "../controllers/update_note_handler";
import deleteNote from "../controllers/delete_note_handler";
import summaryNote from "../controllers/summary_handler";

export default function SingleNote(props) {
  const { noteData, handleToast, setRightSideState } = props;
  const [content, setNoteContent] = useState();
  useEffect(() => {
    setNoteContent(noteData.content);
  }, [noteData]);
  const handleUpdateNote = async () => {
    try {
      //   const noteData = { title, content };
      const response = await updateNote(content, noteData.note_id);
      console.log("Update note successfully", response);
      handleToast(`Successfully updated the note title ${noteData.title}`);
    } catch (error) {
      console.error("Failed to update the note!", error.message);
    }
  };
  const handleSummaryNote = async () => {
    try {
      //   const noteData = { title, content };
      const response = await summaryNote(content);
      console.log("Summarized note successfully", response);
      handleToast(`Successfully Summarized the note title ${noteData.title}`);
      setNoteContent("Summary of the Note: \n"+response["summary"]);
    } catch (error) {
      console.error("Failed to Summarized the note!", error.message);
    }
  };
  const handleDeleteNote = async () => {
    try {
      //   const noteData = { title, content };
      const response = await deleteNote(noteData.note_id);
      console.log("Deleted note successfully", response);
      handleToast(`Successfully deleted the note title ${noteData.title}`);
      setRightSideState("image");
    } catch (error) {
      console.error("Failed to delete the note!", error.message);
    }
  };
  return (
    <div className=" w-full flex justify-center">
      <div className=" flex flex-col w-full p-5 lg:p-0 lg:w-5/6 gap-10">
        <div className="  bg-white px-5 py-3  rounded-md">
          <div className=" grid grid-cols-2 ">
            <div className="font-bold text-2xl ">
              <h1>{noteData.title}</h1>
            </div>
            <button
              className=" justify-self-end bg-red-400 hover:bg-red-600 hover:text-xl rounded-full px-4 transition-all duration-300"
              onClick={handleDeleteNote}
            >
              <div className=" flex gap-2 items-center">
                <div className=" text-xl ">
                  <MdDeleteOutline />
                </div>
                Delete
              </div>
            </button>
          </div>
        </div>
        <textarea
          id="note_content"
          className="w-full h-60 p-4 rounded-md focus:outline-none  focus:border-transparent resize-none text-xl"
          placeholder="Enter note here"
          value={content}
          onChange={(e) => setNoteContent(e.target.value)}
        ></textarea>
        <div className=" flex justify-center gap-5 ">
          <button
            className=" w-fit justify-self-end bg-[#3ABEF9] hover:bg-[#050C9C] hover:text-white hover:text-xl rounded-full p-3 px-5 transition-all duration-300"
            onClick={handleUpdateNote}
          >
            <div className=" flex gap-2 items-center">
              <div className=" text-xl ">
                <GrDocumentUpdate />
              </div>
              Update Note
            </div>
          </button>
          <button className=" w-fit justify-self-end bg-[#37B7C3] hover:bg-[#088395] hover:text-white hover:text-xl rounded-full p-3 px-5 transition-all duration-300"
          onClick={handleSummaryNote}>
            <div className=" flex gap-2 items-center">
              <div className=" text-xl ">
                <PiMagicWandDuotone />
              </div>
              Summarize Note
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
