import { useEffect, useState } from "react"
import "./App.css"

import { invoke } from "@tauri-apps/api/tauri"
import { User, UserInvokeResponse } from "./models/User"
import AdminRegisterForm from "./components/admin-register-form"

function App() {
  const [adminIsRegistered, setAdminIsRegistered] = useState(false)

  useEffect(() => {
    async function checkIfAdminExists() {
      const admin = User.fromInvoke(await invoke<UserInvokeResponse>("get_user_by_user_name", { userName: "admin" }))
      setAdminIsRegistered(!!admin)
    }

    checkIfAdminExists()
  }, [adminIsRegistered])

  return (
    <main className='w-full h-full flex flex-col justify-center items-center'>
      {adminIsRegistered ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold'>Welcome to Book Flow</h1>
        </div>) : (
        <AdminRegisterForm setAdminIsRegistered={setAdminIsRegistered} />
      )}
    </main>
  )
}

export default App
