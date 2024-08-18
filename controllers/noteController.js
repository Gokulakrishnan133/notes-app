const noteModel = require("../models/noteModel");

exports.createNote = async(req,res) =>{
    try{
        const newNote = await noteModel.create(req.body);
        return res.status(201).json(newNote)
    }catch(error){
        if(error.name) return res.status(400).json({ 
            status: 'fail',
            message:error.message
        });

        return res.status(500).json({
            status: 'fail',
            message: 'Some internal error occurred'
        })
    }

}

exports.getAllNotes = async(req,res) => {
    try{
        const queryObj = {...req.query};
        const notes = await noteModel.find(queryObj);
        return res.status(200).json({
            status: "success",
            results: notes.length,
            notes
        });
    }catch(error){
        return res.status(500).json({
            status: 'fail',
            message: 'Some internal error occurred'
        })
    }

}

exports.getNote = async(req,res) => {
    try {
        const {id} = req.params;
        const note = await noteModel.findById({_id: id});
        return res.status(200).json(note);
    } catch (error) {
        if(error.name) return res.status(400).json({ 
            status: 'fail',
            message:error.message
        });
        return res.status(500).json({
            status: 'fail',
            message: 'Some internal error occurred'
        })
    }
}

exports.updateNote = async(req,res) => {
    try {
        const {id} = req.params;
        const {body, title} = req.body;
        if(!body && !title) return res.status(400).json({
            status: 'fail',
            message: "Please provide either body or title"    
        })
        const note = await noteModel.findByIdAndUpdate({_id: id},{body, title},{new: true, runValidators: true});
        return res.status(201).json(note);
    } catch (error) {
        if(error.name) return res.status(400).json({ 
            status: 'fail',
            message:error.message
        });
        return res.status(500).json({
            status: 'fail',
            message: 'Some internal error occurred'
        })
    }
  
}
