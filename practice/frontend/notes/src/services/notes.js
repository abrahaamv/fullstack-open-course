import axios from 'axios'
const NOTES_API_URI = '/api/notes'

const getAll = () =>  {
    return axios.get(NOTES_API_URI).then(response => response.data)
}

const createNote = newNote => axios.post(NOTES_API_URI, newNote).then(res => res.data)

const updateNote = (id, newObject) => axios.patch(`${NOTES_API_URI}/${id}`, newObject).then(res => res.data)

const deleteNote = id => axios.delete(`${NOTES_API_URI}/${id}`).then(res => res.data)

export default { getAll, createNote, updateNote, deleteNote }