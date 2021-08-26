export function NoteVideo({ note }) {
    console.log('noteVideo:', note)
    // return <iframe src={note.info.url} frameborder="0" allowfullscreen></iframe>
    return <iframe  src={note.info.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

    // return <iframe  src={note.info.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
}