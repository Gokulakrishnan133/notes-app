const request = require('supertest');
const app = require('../app');
const noteModel = require('../models/noteModel');
const { default: mongoose } = require('mongoose');

const noteId = new mongoose.Types.ObjectId();
const note = {
    _id: noteId,
    title: "Nodejs",
    body: "Javascript runtime environment"
}

beforeEach(async ()=>{
    await noteModel.deleteMany();
    await noteModel.create(note);
})

test('Should create a note', async()=>{
    await request(app).post('/api/notes').send({
        title: "programming",
        body: "Hello to the world"
    }).expect(201)
})

test('Should not create a note', async()=>{
    await request(app).post('/api/notes').send({
        title: "",
        body: ""
    }).expect(400)
})

test('should get a note by id', async()=>{
    await request(app).get(`/api/notes/${note._id}`).send().expect(200)
})

test('should not get a note by id', async()=>{
    await request(app).get(`/api/notes/123`).send().expect(400)
})

test('should get a note by title', async()=>{
    await request(app).get(`/api/notes?title=${note.title}`).send().expect(200)
})

test('should get all notes', async()=>{
    await request(app).get('/api/notes').send().expect(200)
})

test('should update a note by id', async()=>{
    await request(app).put(`/api/notes/${note._id}`).send({
        title: "programming",
        body: "Hello to the world"
    }).expect(201)
})

test('should not update a note by id', async()=>{
    await request(app).put(`/api/notes/${note._id}`).send({
        title: "",
        body: ""
    }).expect(400)
})




