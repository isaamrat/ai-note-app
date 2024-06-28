import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home_page";
import NotePage from "./pages/my_notes_page";

export default function App() {
  return (
    <div className="">
      <div className=" ">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
