import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    updateNote,
    getById,
    dupNote
}

const KEY_DB = 'notesDB'
const gNotes = storageService.loadFromStorage(KEY_DB) || _getDefaultNotes()
_saveNotesToStorage()

function query(filterBy = {}) {
    const { type } = filterBy
    let { search } = filterBy
    let notesToShow = gNotes
    if (type) notesToShow = notesToShow.filter(note => { return note.type === type })
    if (search) {
        search = search.toLowerCase()
        notesToShow = notesToShow.filter(note => (
            (note.info.title && note.info.title.toLowerCase().includes(search)) ||
            (note.info.txt && note.info.txt.toLowerCase().includes(search)) ||
            (note.type === 'note-todos' &&
                note.info.todos.some(todo => todo.txt.toLocaleLowerCase().includes(search)))
        ))
    }
    return Promise.resolve(notesToShow)
}

function addNote(note) {
    gNotes.unshift(_createNote(note))
    _saveNotesToStorage()
    return Promise.resolve()
}

function dupNote(noteId) {
    const noteIdx = _getNoteIdx(noteId)
    const note = JSON.parse(JSON.stringify(_getNoteById(noteId)))
    note.id = utilService.makeId()
    gNotes.splice(noteIdx, 0, note)
    _saveNotesToStorage()
    return Promise.resolve()
}

function removeNote(noteId) {
    const noteIdx = _getNoteIdx(noteId)
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNote(updatedNote) {
    const noteIdx = _getNoteIdx(updatedNote.id)
    gNotes[noteIdx] = updatedNote
    _saveNotesToStorage()
    return Promise.resolve()
}

function getById(noteId) {
    const note = gNotes.find(currNote => noteId === currNote.id)
    return Promise.resolve(note)
}
function _getNoteById(noteId) {
    return gNotes.find(note => note.id === noteId)
}

function _getNoteIdx(noteId) {
    return gNotes.findIndex(note => { return noteId === note.id })
}

function _createNote(noteDetails) {
    const { type, info } = noteDetails
    if (type === 'note-video') info.url = _getEmbdYoutubeUrl(info.url)
    return {
        id: utilService.makeId(),
        type,
        info,
        isPinned: false
    }
}

function _getEmbdYoutubeUrl(url) {
    const videoId = url.split('=')[1].split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
}

function _getDefaultNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                txt: "My Google Map API KEY: kH8Ffj9Hdn4hj7Ssd5"
            },
            style: {
                backgroundColor: "#a7feeb"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "https://cutt.ly/fWrCAJz",
                txt: "OMG Bobi 😍"
            },
            style: {
                backgroundColor: "#fdcfe8"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                title: "Don't forget to:",
                todos: [
                    { txt: "Breath", isDone: false },
                    { txt: "Smile", isDone: false },
                    { txt: "Relax", isDone: false },
                    { txt: "Enjoy", isDone: false },
                ]
            },
            style: {
                backgroundColor: "#d7aefb"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-video",
            info: {
                url: "https://www.youtube.com/embed/e-OPyR_P7rU",
                title: "Dog fails",
                txt: "LOLOLOL"
            },
            style: {
                backgroundColor: "#ccff90"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                title: "Sprint3",
                todos: [
                    { txt: "Roll on floor", isDone: true },
                    { txt: "Cry", isDone: true },
                    { txt: 'Get my "stuff" together', isDone: false },
                    { txt: "Code", isDone: false },
                ]
            },
            isPinned: true
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "https://louisem.com/wp-content/uploads/2020/04/positive-quote-It-Will-Be-Okay.jpg"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-video",
            info: {
                url: "https://www.youtube.com/embed/tVqPx5mUj0g",
                title: "Drink the Sea"
            },
            style: {
                backgroundColor: "#fff475"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                title: "I'm a title",
                txt: "I'm a sample text note"
            },
            style: {
                backgroundColor: "#f28b82"
            }
        },
    ]
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY_DB, gNotes)
}