import React from "react";

export default function NoteList({
  data,
  handleSingleNoteData,
}) {
  // Check if data is not an array or is empty
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No notes available</p>;
  }


  const handleSingleNoteClick = (note_id, title, content, user_email) => {
    // Call the parent's handleDataChange function with the new data

    handleSingleNoteData({ note_id, title, content, user_email });
  };

  return (
    <div>
      <h1 className="text-center mt-4 mb-2 font-bold"> All Notes</h1>
      <ul>
        {[...data].reverse().map((item) => (
          <li key={item.note_id}>
            <div
              className="mb-2 flex gap-3  p-2 w-full group bg-white rounded-md hover:bg-[#3572EF] hover:text-white hover:cursor-pointer"
              onClick={() => {
                handleSingleNoteClick(
                  item.note_id,
                  item.title,
                  item.content,
                  item.user_email
                );
              }}
            >
              <div className=" w-full transition-all duration-300">
                <div className=" font-semibold text-center">{item.title}</div>
                <div className=" text-center text-xs hidden group-hover:block overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {item.content}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
