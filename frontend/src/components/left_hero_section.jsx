import noteImage from "../assets/notes2.svg"; // Importing the image file

export default function LeftHeroSection() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center">
          <img className="w-4/5 md:w-3/5" src={noteImage} alt="My Image" />
        </div>
        <div className="w-11/12 md:w-3/5 mt-2 text-xs sm:text-sm font-mono text-[#050C9C] text-justify">
          Your simple digital note taking companion with subtle AI features
          which can help you to summarize your notes.
        </div>
      </div>
    </>
  );
}
