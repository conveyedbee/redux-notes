import { useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, updateNote } from '../requests'

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : 'not important'}</strong>
        </li>
    )
}

const Notes = () => {
    const queryClient = useQueryClient()
    const filter = useSelector(state => state.filter)

    const { data: notes = [], isPending } = useQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
        refetchOnWindowFocus: false
    })

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    if (isPending) return <div>Loading data...</div>


    const filteredNotes = filter === 'ALL' ? notes
        : filter === 'IMPORTANT' ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)

    return (
        <ul>
            {filteredNotes.map(note => (
                <Note 
                key={note.id}
                note={note}
                handleClick={() => updateNoteMutation.mutate({ ...note, important: !note.important })}
                />
            ))}
        </ul>
    )
}

export default Notes