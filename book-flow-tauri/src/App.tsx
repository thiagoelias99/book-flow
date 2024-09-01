import { useEffect, useState } from "react"
import "./App.css"

import { invoke } from "@tauri-apps/api/tauri"
import { User, UserInvokeResponse } from "./models/User"
import AdminRegisterForm from "./components/admin-register-form"

function App() {
  const [adminIsRegistered, setAdminIsRegistered] = useState(false)

  useEffect(() => {
    async function checkIfAdminExists() {
      const admin = User.fromInvoke(await invoke<UserInvokeResponse>("get_user_by_user_name", { userName: "telias" }))
      setAdminIsRegistered(!!admin)
    }

    checkIfAdminExists()
  }, [])

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center'>
      {adminIsRegistered ? (<></>) : (
        <AdminRegisterForm />
      )}
    </main>
  )
}

export default App
