import AdminAreaSectionHeader from "@/components/admin-area-section-header"
import UsersTable from "@/components/users-table"

export default function ManageUsers() {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <AdminAreaSectionHeader header="Manage Users" buttonLabel="Register" />
      <UsersTable className="mt-4" />
    </div>
  )
}
