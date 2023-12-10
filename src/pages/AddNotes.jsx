import React, { useState } from "react";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import useInput from "../components/elements/UseInput";


export default function AddNotes() {
  const [title, setTitle] = useInput("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleAddNote = () => {
    addNote({
      title: title || "(untitled)",
      body,
    });

    navigate("/")
  };

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Catatan rahasia"
          value={title}
          onChange={setTitle}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder="Sebenarnya saya adalah ...."
          onInput={(e) => setBody(e.target.innerHTML)}
        ></div>
      </div>
      <div className="add-new-page__action">
        <Button title="Simpan" onClick={handleAddNote}/>
      </div>
    </section>
  );
}
