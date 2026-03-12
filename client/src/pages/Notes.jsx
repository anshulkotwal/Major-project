import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Plus, Trash2, Edit, Save } from 'lucide-react'
import { motion } from 'framer-motion'

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Math Formulas', content: 'Pythagorean theorem: a² + b² = c²', color: 'blue', date: '2 days ago' },
    { id: 2, title: 'Physics Notes', content: 'F = ma (Force = mass × acceleration)', color: 'purple', date: '1 week ago' },
    { id: 3, title: 'Chemistry', content: 'H₂O - Water molecule structure', color: 'green', date: '3 days ago' }
  ])
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '', color: 'blue' })

  const colors = ['blue', 'purple', 'green', 'yellow', 'pink', 'red']

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { ...newNote, id: Date.now(), date: 'Just now' }])
      setNewNote({ title: '', content: '', color: 'blue' })
      setIsAdding(false)
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Quick Notes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Jot down important points</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Note</span>
          </button>
        </div>

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass dark:glass-dark rounded-xl p-6"
          >
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setNewNote({ ...newNote, color })}
                    className={`w-8 h-8 rounded-full bg-${color}-500 ${
                      newNote.color === color ? 'ring-4 ring-offset-2 ring-blue-500' : ''
                    }`}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg glass dark:glass-dark"
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-xl bg-gradient-to-br from-${note.color}-500 to-${note.color}-600 text-white relative group`}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex space-x-2">
                <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-3">{note.title}</h3>
              <p className="text-white/90 mb-4">{note.content}</p>
              <p className="text-xs text-white/70">{note.date}</p>
            </motion.div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="glass dark:glass-dark rounded-xl p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">No notes yet. Create your first note!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Notes
