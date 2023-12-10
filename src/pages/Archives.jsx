import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/fragments/Card";
import { getArchivedNotes } from "../utils/network-data";
import SearchBar from "../components/fragments/SearchBar";
import NotesListEmpty from "../components/fragments/NotesListEmpty";

export default function Archives() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("title") || "");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesResult = await getArchivedNotes();
        if (!notesResult.error) {
          setNotes(notesResult.data);
        } else {
          console.error("Failed to fetch notes:", notesResult.error);
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

  return (
    <section className="homepage">
      <h2>Catatan Arsip</h2>
      <SearchBar value={searchKeyword} onChange={changeSearchParams} />
      {loading ? ( 
        <p>Loading...</p>
      ) : filteredNotes.length > 0 ? (
        <section className="notes-list">
          {filteredNotes.map((note) => (
            <Card notes={note} key={note.id}/>
          ))}
        </section>
      ) : (
        <NotesListEmpty />
      )}
    </section>
  );
}
