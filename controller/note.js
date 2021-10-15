const noteRouter = require('express').Router()
const Note = require('../models/note')

noteRouter.get('/', (request, response) => {
    Note.find({}).then(result => {
        response.json(result)
    })
})

noteRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if(note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

noteRouter.post('/', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important,
        date: new Date()
    })

    note.save().then(saveNote => {
        response.json(saveNote)
    }).catch(error => next(error))
})

noteRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

noteRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new : true })
        .then(updateNote => {
            response.json(updateNote)
        })
        .catch(error => next(error))
})

module.exports = noteRouter