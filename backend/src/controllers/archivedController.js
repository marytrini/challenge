const { Note } = require('../sequelize/index');

const getArchivedNotes = async (req, res) => {
    try {
        const getArchived = await Note.findAll({ where: { archive: true, active: true } });

        if (getArchived.length === 0) {
            return res.status(400).json({ message: 'Not found!' });
        }
        
        return res.status(200).json(getArchived);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = getArchivedNotes;

