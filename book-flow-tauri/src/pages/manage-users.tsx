import AdminAreaSectionHeader from "@/components/admin-area-section-header"
import UserRegisterForm from "@/components/users-register-form"
import UsersTable from "@/components/users-table"
import useUsers from "@/hooks/use-users"
import { UserLevels } from "@/models/User"
import { useState } from "react"

export default function ManageUsers() {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const {filteredUsers, users, setFilters, isLoadingUsers, updateRole} = useUsers()

  function handleHeaderButtonClick() {
    setIsRegisterDialogOpen(true)
  }

  function handleSearch(search: string) {
    setFilters(search)
  }

  async function handleRoleChange(value: string, userId: string) {
    const level = value as UserLevels

    try {
      await updateRole({ id: userId, level })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='max-w-screen-xl mx-auto'>
      <AdminAreaSectionHeader
        header="Manage Users"
        buttonLabel="Register"
        buttonHandler={handleHeaderButtonClick}
        searchHandler={handleSearch}
      />
      <UsersTable
        className="mt-4"
        users={filteredUsers.length > 0 ? filteredUsers : users}
        isLoadingUsers={isLoadingUsers}
        handleRoleChange={handleRoleChange}
      />
      <UserRegisterForm
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      />
    </div>
  )
}
