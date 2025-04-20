const express = require('express');
const router = express.Router();
const Student = require('../models/students.model') // import the model file here 

// Get all students
router.get('/', async(req, res) => {
    try{
        const students = await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// Get a single student
router.get('/:id', async(req, res) => {
    try{
        const students = await Student.findById(req.params.id);
        if(!students){
            return res.status(404).json({message:'Student not found!'});
        }
        res.json(students);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


// Add new student
router.post('/', async(req, res) => {
    try{
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// update a student
router.put('/:id', async(req, res) => {
    try{
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true}); // here new specifies ki only new data hi return hoga
        if(!updatedStudent) return res.status(404).json({message:'Student not found!'});

        res.json(updatedStudent);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// Delete a student
router.delete('/:id', async(req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).json({message:'Student not found!'});

        res.json({message:'Student deleted successfully!'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router