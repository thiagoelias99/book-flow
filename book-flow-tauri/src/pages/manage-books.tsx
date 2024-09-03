import AdminAreaSectionHeader from "@/components/admin-area-section-header"
import BooksRegisterForm from "@/components/books-register-form"
import BooksTable from "@/components/books-table"
import { useState } from "react"

export default function ManageBooks() {
  // const [userIsRegistered, setUserIsRegistered] = useState(false)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  function handleHeaderButtonClick() {
    setIsRegisterDialogOpen(true)
  }

  return (
    <div className='max-w-screen-xl mx-auto'>
      <AdminAreaSectionHeader
        header="Manage Books"
        buttonLabel="Register"
        buttonHandler={handleHeaderButtonClick}
      />
      <BooksTable
        className="mt-4"
      // userIsRegistered={userIsRegistered}
      // setUserIsRegistered={setUserIsRegistered}
      />
      <BooksRegisterForm
        // setUserIsRegistered={setUserIsRegistered}
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      />
    </div>
  )
}
