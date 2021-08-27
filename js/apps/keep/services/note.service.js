import { utilService } from '../../../services/util.service.js'
// import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    updateNote
}

const KEY_DB = 'notesDB'
const gNotes = _getDefaultNotes()
// const gNotes = storageService.loadFromStorage(KEY_DB) || _getDefaultNotes()
// _saveNotesToStorage()

function query(filterBy={}/* , isGetPinned = false */) {
    const { byType, bySearch } = filterBy
    let notesToShow = gNotes
    if (byType) notesToShow = notesToShow.filter(note => { return note.type === byType })
    return Promise.resolve(notesToShow)
}

function addNote(noteDetails) {
    gNotes.unshift(_createNote(noteDetails))
    // _saveNotesToStorage()
    return Promise.resolve()
}

function removeNote(noteId) {
    const noteIdx = gNotes.findIndex(note => { return noteId === note.id })
    gNotes.splice(noteIdx, 1)
    // _saveNotesToStorage()
    return Promise.resolve()
}

function updateNote(updatedNote) {
    const updatedNoteIdx = gNotes.findIndex(currNote => currNote.id === updatedNote.id)
    gNotes[updatedNoteIdx] = updatedNote
    return Promise.resolve()
}

function _getNoteById(noteId) {
    return Promise.resolve(gNotes.filter(note => note.id === noteId))
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

// function _saveNotesToStorage() {
//     storageService.saveToStorage(KEY_DB, gNotes)
// }

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
                // url: "https://www.youtube.com/watch?v=e-OPyR_P7rU",
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

function _getEmbdYoutubeUrl(url) {
    const videoId = url.split("=")[1]
    console.log(videoId)
    return `https://www.youtube.com/embed/${videoId}`
}