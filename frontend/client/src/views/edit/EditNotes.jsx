import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/form/Form';

const EditNotes = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/notes/${id}`);
                setNote({
                    id: response.data.id,
                    title: response.data.title,
                    message: response.data.message,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleSave = () => {
        navigate('/notes'); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen p-5'>
            <div className='w-full max-w-2xl 2xl:max-w-xl sm:max-w-sm'>
            <Form note={note} onSave={handleSave} />
            </div>
        </div>
    );
};

export default EditNotes;
