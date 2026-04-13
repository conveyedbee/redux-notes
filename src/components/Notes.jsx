import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNote } from '../requests'

const queryClient = useQueryClient()

const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
})

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : 'not important'}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({ filter, notes }) => {
        if (filter ==='ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    })

    return (
        <ul>
            {notes.map(note => (
                <Note 
                key={note.id}
                note={note}
                handleClick={() => dispatch(toggleImportanceOf(note.id))}
                />
            ))}
        </ul>
    )
}

export default Notes