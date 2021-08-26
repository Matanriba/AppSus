export function NoteImg({note}) {
    console.log('noteImg:', note)
    return <img src={note.info.url} alt="" />
}