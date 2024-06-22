const {Note} = require('../sequelize/index');

const getNotes = async (req,res) => {
    try {
        const getAll = await Note.findAll();

        res.status(200).json(getAll);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const getById = async (req,res) => {
    const {id} = req.params
    try {
        const getOne = await Note.findByPk(id);
        res.status(200).json(getOne);
    } catch (error) {
        return res.status(404).json({error: 'Not found!'})
    }
}

const createNote = async (req,res) => {
    
    try {
        const {title, message, archive, active} = req.body;
        
        const newNote = await Note.create({
            title,
            message,
            archive,
            active,
        });
        res.status(200).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(400).json({error:'Error creating note'});
    }
}

const updateNote = async (req,res) => {
    try {
        const {id} = req.params;
        const {title, message, archive, active} = req.body;

        const updatedNote = await Note.findByPk(id);

        if(!updatedNote) res.status(400).json({error:'note not found!'});

        updatedNote.title = title;
        updatedNote.message = message;
        updatedNote.archive = archive;
        updatedNote.active = active;

        await updatedNote.save();
        
        res.status(200).json({message: 'note updated!'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteNote = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedNote = await Note.findByPk(id)

        if(!deletedNote) res.status(400).json(`Note with id: ${id} not found!`)

        await deletedNote.destroy();
        res.status(200).json({message:'Note deleted successfuly!'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {
    getNotes,
    getById,
    createNote,
    updateNote,
    deleteNote,
}