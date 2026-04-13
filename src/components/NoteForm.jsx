import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../requests'

const NoteForm = () => {
    const queryClient = useQueryClient()
    const newNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.reset()
        newNoteMutation.mutate({ content, important: true })
    }

    return (
        <form onSubmit={addNote}>
            <input name='note' />
            <button type='submit'>add</button>
        </form>
    )
}

export default NoteForm