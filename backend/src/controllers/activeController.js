const {Note} = require('../sequelize/index');

const getActiveNotes = async (req,res) => {
    try {
        const getActive = await Note.findAll({ where: {active: true}});

        if(getActive.length === 0){
            return res.status(400).json({message:'There are no active notes!'});
        }
       return res.status(200).json(getActive);

    } catch (error) {
      return  res.status(500).json({error: error.message});
    }
};

module.exports = getActiveNotes;