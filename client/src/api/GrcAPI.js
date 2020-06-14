import axios from "axios"

const API_URL = "http://localhost:3000/grc/"

// async function createTodo(name) {
//   const { data: newTodo } = await axios.post(API_URL, {
//     name,
//   })
//   return newTodo
// }

// async function deleteTodo(id) {
//   const message = await axios.delete(`${API_URL}${id}`)
//   return message
// }

// async function updateTodo(id, payload) {
//   const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
//   return newTodo
// }

async function getAllItems() {
  const { data: items } = await axios.get(API_URL)
  console.log("Hello")
  return items
}

// export default { createTodo, deleteTodo, updateTodo, getAllItems }
export default { getAllItems }