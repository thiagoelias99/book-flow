import "./App.css"

import AdminRegisterForm from "./components/admin-register-form"
import useAdmin from "./hooks/use-admin"

function App() {
  const { adminData, isLoadingAdmin } = useAdmin()

  return (
    <main className='w-full h-full flex flex-col justify-center items-center'>
      {isLoadingAdmin && <h1>Loading...</h1>}
      {adminData ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold'>Welcome to Book Flow</h1>
        </div>) : (
        <AdminRegisterForm />
      )}
    </main>
  )
}

export default App
