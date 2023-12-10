import React, { useEffect, useState } from "react";
import Card from "../components/fragments/Card";
import { getActiveNotes } from "../utils/network-data";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/elements/Button";
import SearchBar from "../components/fragments/SearchBar";
import NotesListEmpty from "../components/fragments/NotesListEmpty";
import { useCombined } from "../contexts/CombinedContext";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("title") || "");
  const { locale } = useCombined();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesResult = await getActiveNotes();
        if (!notesResult.error) {
          setNotes(notesResult.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNotes();
  }, [loading]);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const changeSearchParams = (keyword) => {
    setSearchParams({ title: keyword });
    setSearchKeyword(keyword);
  };

  const handleNewNote = () => {
    navigate("/notes/new");
  };

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
      <SearchBar value={searchKeyword} onChange={changeSearchParams} />
      {loading ? ( 
        <p>Loading...</p>
      ) : filteredNotes.length > 0 ? (
        <section className="notes-list">
          {filteredNotes.map((note) => (
            <Card notes={note} key={note.id} />
          ))}
        </section>
      ) : (
        <NotesListEmpty />
      )}
      <div className="homepage__action">
        <Button title="Tambah" onClick={handleNewNote} />
      </div>
    </section>
  );
}
