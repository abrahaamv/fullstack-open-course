import axios from 'axios'

const PHONEBOOK_API_URI = 'http://localhost:3001/persons'

const getAll = () => axios.get(PHONEBOOK_API_URI).then(response => response.data)

const createPerson = (newPerson) => axios.post(PHONEBOOK_API_URI, newPerson).then(response => response.data)

const updateOne = (person, newPersonObject) => axios.put(`${PHONEBOOK_API_URI}/${person.id}`, newPersonObject).then(response => response.data)

const deleteOne = (id) => axios.delete(`${PHONEBOOK_API_URI}/${id}`).then(response => response.data)

export default { getAll, createPerson, updateOne, deleteOne }