import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArchivedItem from "../../components/archivedItem/ArchivedItem";
import ButtonHome from "../../components/button/ButtonHome";
import Modal from "../../components/popUp/Modal";
import Footer from "../../components/footer/Footer";

const ArchivedList = () => {
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getArchived = async () => {
      try {
        const response = await axios.get("http://localhost:4000/archived");
        setArchived(response.data);
        //console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getArchived();
  }, []);

  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
    //setEditingNote(note)
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setArchived(archived.filter((note) => note.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleArchive = async (id) => {
    try {
      const note = archived.find((note) => note.id === id);
      const { title, message } = note;
      const updatedNote = { ...note, archive: !note.archive };
      const updatedArchivedList = archived.map((n) =>
        n.id === id ? updatedNote : n
      );
      setArchived(updatedArchivedList);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`, {
        title,
        message,
        archive: !note.archive,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleActive = async (id) => {
    try {
      const note = archived.find((note) => note.id === id);
      const { title, message, archive } = note;
      const updatedNote = { ...note, active: !note.active };
      const updatedArchivedList = archived.map((n) =>
        n.id === id ? updatedNote : n
      );
      setArchived(updatedArchivedList);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`, {
        title,
        message,
        archive,
        active: !note.active,
      });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    //console.log(note);
  };
  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-start ml-5">
        <ButtonHome />
      </div>
      <div className="w-full h-fit mt-20 mb-10">
        <h1 className="font-merienda font-black lg:text-3xl sm:text-xl">
          <span className="text-rose-600">Archived</span> Notes
        </h1>
      </div>
      <div>
        {archived.map((note) => (
          <ArchivedItem
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onActive={handleActive}
            onNoteClick={handleNoteClick}
            isArchived={true} // Pass the isArchived prop
          />
        ))}
      </div>
      <div>
        {selectedNote && (
          <Modal
            openModal={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            note={selectedNote}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onActive={handleActive}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArchivedList;
