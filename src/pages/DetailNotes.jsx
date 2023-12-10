import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { showFormattedDate } from "../utils";

export default function DetailNotes() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNote(id);
        setNote(data.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [loading]);

  const handleDeleteNote = () => {
    deleteNote(id);
    navigate("/");
  };

  const handleArchiveNote = () => {
    archiveNote(id);
    navigate("/");
  };

  const handleActivateNote = () => {
    unarchiveNote(id);
    navigate("/");
  };

  return (
    <section className="detail-page">
      {loading ? ( 
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="detail-page__title">{note?.title}</h3>
          <p className="detail-page__createdAt">{showFormattedDate(note?.createdAt)}</p>
          <div className="detail-page__body">{note?.body}</div>
          <div className="detail-page__action">
            {note && (
              <Button
                title={note.archived ? "Aktifkan" : "Arsipkan"}
                onClick={note.archived ? handleActivateNote : handleArchiveNote}
              />
            )}
            <Button title="Hapus" onClick={handleDeleteNote} />
          </div>
        </>
      )}
    </section>
  );
}
