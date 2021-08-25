import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    updateNote
}

const KEY_DB = 'notesDB'
const gNotes = storageService.loadFromStorage(KEY_DB) || _getDefaultNotes()
_saveNotesToStorage()

function query(filterBy) {
    const { byType, bySearch } = filterBy
    if (byType || bySearch) {
        let notesToShow = gNotes.filter(note => { return note.type === byType })
        if (!notesToShow) notesToShow = ['No matches found']
        return Promise.resolve(notesToShow)
    }
    return Promise.resolve(gNotes)
}

function addNote(noteDetails) {
    gNotes.unshift(_createNote(noteDetails))
    _saveNotesToStorage()
    return Promise.resolve()
}

function removeNote(noteId) {
    const noteIdx = gNotes.findIndex(note => { return noteId === note.id })
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNote(noteId, newDetails) {
    const note = _getNoteById(noteId)
    const { info, style, isPinned } = newDetails
    if (info) note.info = info
    if (style) note.style = style
    if (isPinned) note.isPinned = isPinned
    return Promise.resolve()
}

function _getNoteById(noteId) {
    return Promise.resolve(gNotes.filter(note => note.id === noteId))
}

function _createNote(noteDetails) {
    const { type, info } = noteDetails
    let { style } = noteDetails
    if (!style) style = { backgroundColor: "#fff" }
    return {
        id: utilService.makeId(),
        type,
        info,
        style,
        isPinned: false
    }
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
                url: "https://cutt.ly/fWrCAJz",
                title: "Bobi"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-video",
            info: {
                url: "https://www.youtube.com/watch?v=e-OPyR_P7rU",
                title: "Dog fails"
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