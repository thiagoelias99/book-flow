import AdminAreaSectionHeader from "@/components/admin-area-section-header"
import UserRegisterForm from "@/components/users-register-form"
import UsersTable from "@/components/users-table"
import { useState } from "react"

export default function ManageUsers() {
  const [userIsRegistered, setUserIsRegistered] = useState(false)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  function handleHeaderButtonClick() {
    setIsRegisterDialogOpen(true)
  }

  return (
    <div className='max-w-screen-xl mx-auto'>
      <AdminAreaSectionHeader
        header="Manage Users"
        buttonLabel="Register"
        buttonHandler={handleHeaderButtonClick}
      />
      <UsersTable
        className="mt-4"
        userIsRegistered={userIsRegistered}
        setUserIsRegistered={setUserIsRegistered}
      />
      <UserRegisterForm
        setUserIsRegistered={setUserIsRegistered}
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      />
    </div>
  )
}
