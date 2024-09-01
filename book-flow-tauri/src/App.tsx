import { useState } from "react"
import "./App.css"

import { invoke } from "@tauri-apps/api/tauri"

function App() {
  // const [input, setInput] = useState("");
  const [response, setResponse] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = (e.target as HTMLFormElement).input.value
    console.log(input)
    const response: string = await invoke("get_user_by_user_name", { userName: input })
    setResponse(response)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name='input' placeholder="Enter a book title" />
        <button type='submit'>Send</button>
      </form>
      <p>{response}</p>
    </main>
  )
}

export default App
