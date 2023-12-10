import React from "react";
import PropType from 'prop-types';
import parser from 'html-react-parser';
import { showFormattedDate } from "../../utils";
import { Link } from "react-router-dom";
export default function Card({notes}) {
  const {id, title, createdAt, body } = notes;
  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">
      {parser(body)}
      </p>
    </article>
  );
}

Card.propTypes = {
  notes: PropType.shape({
    title: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
    body: PropType.string.isRequired,
    id: PropType.string.isRequired,
  }).isRequired,
};