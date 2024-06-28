import React, { useState } from "react";
import addNewNote from "../controllers/new_note_handler";
import { TiDocumentAdd } from "react-icons/ti";

export default function NewNote(props) {
  const { user_email, handleToast } = props;
  const [title, setNoteTitle] = useState("");
  const [content, setNoteContent] = useState("");

  const handleCreateNote = async () => {
    try {
      const noteData = { title, content };
      const response = await addNewNote(noteData, user_email);
      console.log("New note added successfully", response);
      // setMessage("Added new note title ${title}");
      handleToast(`Successfully added new note title ${title}`);
      setNoteTitle("");
      setNoteContent("");
    } catch (error) {
      console.error("Failed to add new note!", error.message);
    }
  };
  return (
    <div className=" flex flex-col w-full p-5 lg:p-0 lg:w-4/6">
      <label htmlFor="note_title">Title of the note</label>
      <input
        type="text"
        id="note_title"
        placeholder="Title"
        className=" p-4 rounded-md focus:outline-none"
        value={title}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <label htmlFor="note_content">Note</label>

      <textarea
        id="note_content"
        className="w-full h-48 p-4 text-lg rounded-md focus:outline-none  focus:border-transparent resize-y"
        placeholder="Enter note here"
        value={content}
        onChange={(e) => setNoteContent(e.target.value)}
      ></textarea>
      <div className=" w-full mt-5 flex  justify-center">
        <button
          className=" w-fit justify-self-end bg-[#3ABEF9] hover:bg-[#050C9C] hover:text-white hover:text-xl rounded-full p-3 px-5 transition-all duration-300"
          onClick={handleCreateNote}
        >
          <div className=" flex gap-2 items-center">
            <div className=" text-xl ">{<TiDocumentAdd />}</div>
            Add Note
          </div>
        </button>
      </div>
    </div>
  );
}
