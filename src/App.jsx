import { useQuery } from '@tanstack/react-query'
import { getNotes } from './requests'

import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })

  if (result.isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
