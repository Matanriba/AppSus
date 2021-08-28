import { utilService } from '../../../services/util.service.js'
// import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    updateNote,
    dupNote
}

const KEY_DB = 'notesDB'
const gNotes = _getDefaultNotes()
// const gNotes = storageService.loadFromStorage(KEY_DB) || _getDefaultNotes()
// _saveNotesToStorage()

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
    // _saveNotesToStorage()
    return Promise.resolve()
}

function dupNote(noteId) {
    const noteIdx = _getNoteIdx(noteId)
    const note = JSON.parse(JSON.stringify(_getNoteById(noteId)))
    note.id = utilService.makeId()
    gNotes.splice(noteIdx, 0, note)
    // _saveNotesToStorage()
    return Promise.resolve()
}

function removeNote(noteId) {
    const noteIdx = _getNoteIdx(noteId)
    gNotes.splice(noteIdx, 1)
    // _saveNotesToStorage()
    return Promise.resolve()
}

function updateNote(updatedNote) {
    const noteIdx = _getNoteIdx(updatedNote.id)
    gNotes[noteIdx] = updatedNote
    // _saveNotesToStorage()
    return Promise.resolve()
}

function _getNoteById(noteId) {
    return gNotes.filter(note => note.id === noteId)[0]
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
            // isPinned: true,
            info: {
                // title: "FS",
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "https://cutt.ly/fWrCAJz",
                // title: "Bobi",
                txt: "OMG Bobi 😍"
            },
            style: {
                backgroundColor: "#00d"
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
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", isDone: false },
                    { txt: "Coding power", isDone: false }
                ]
            },
            isPinned: true
        }
    ]
}

// function _saveNotesToStorage() {
//     storageService.saveToStorage(KEY_DB, gNotes)
// }