import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    getNoteById,
    getNotes
}

const KEY_DB = 'notesDB'
const gNotes = storageService.loadFromStorage(KEY_DB) || _getDefaultNotes()
_saveNotesToStorage()

function getNotes() {
    return Promise.resolve(gNotes)
}

function getNoteById(noteId) {
    return Promise.resolve(gNotes.filter(note => note.id === noteId))
}

function removeNote(noteId) {

}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY_DB, gNotes)
}

function _getDefaultNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ]
}