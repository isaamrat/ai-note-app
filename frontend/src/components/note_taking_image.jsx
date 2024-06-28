import typingImage from "../assets/note_taking.svg"; // Importing the image file


export default function NoteTakingImage() {
    return (
        <>
        <div className="flex flex-col justify-center items-center p-5 lg:p-0">
          <div className="flex items-center justify-center">
            <img className="w-4/5 md:w-3/5" src={typingImage} alt="My Image" />
          </div>
          <div className="w-11/12 md:w-3/5 mt-2 text-xs sm:text-sm font-mono text-[#050C9C] text-justify">
            Start taking your digital note by clicking create new note button.
          </div>
        </div>
      </>
    );
  }
  