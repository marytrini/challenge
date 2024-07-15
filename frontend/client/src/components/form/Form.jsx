import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ note, onSave }) => {
  const [input, setInput] = useState({
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (note) {
      setInput({ title: note.title, message: note.message });
    }
  }, [note]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setInput({
      title: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.title || !input.message)
      return alert("Must complete the form before subtmitting");

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (note) {
        await axios.put(
          `https://notes-api-ykpe.onrender.com/notes/${note.id}`,
          input
        );
        setSuccess("note updated successfully!");
        setInput({
          title: "",
          message: "",
        });
        onSave();
      } else {
        await axios.post(
          "https://notes-api-ykpe.onrender.com/notes/create",
          input
        );

        setSuccess("note created successfully!");
        setInput({
          title: "",
          message: "",
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="2xl:w-fit bg-rose-100 items-center justify-evenly p-8 rounded-xl shadow-md shadow-slate-700">
      {error && <div>Error: {error}</div>}
      {success && <div>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="object-fit">
          <label htmlFor="title" className="font-pop font-bold text-rose-600">
            Title:{" "}
          </label>
          <input
            className="sm:w-2/3 2xl:w-4/5 h-8 font-pop border-none outline-none rounded-md py-5 px-4 ml-[10px]"
            type="text"
            name="title"
            id="title"
            value={input.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-2 ml-10">
          <label htmlFor="message" className="font-pop font-bold text-rose-600">
            <textarea
              name="message"
              cols="30"
              rows={10}
              required
              minLength={10}
              maxLength={500}
              placeholder="Create a Note"
              id="message"
              value={input.message}
              onChange={handleInputChange}
              className="sm:w-full 2xl:w-11/12 font-pop border-none outline-none rounded-md py-5 px-4 ml-2"
            ></textarea>
          </label>
        </div>
        <div>
          <button
            className="rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3"
            type="submit"
          >
            Create
          </button>
          <button
            className="rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1"
            type="reset"
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
