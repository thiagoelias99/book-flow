import AdminAreaSectionHeader from "@/components/admin-area-section-header"
import BooksRegisterForm from "@/components/books-register-form"
import BooksTable from "@/components/books-table"
import useBooks from "@/hooks/use-books"
import { useState } from "react"

export default function ManageBooks() {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const { setFilters, filteredBooks, books, isLoadingBooks } = useBooks()

  function handleHeaderButtonClick() {
    setIsRegisterDialogOpen(true)
  }

  function handleSearch(search: string) {
    setFilters(search)
  }

  return (
    <div className='max-w-screen-xl mx-auto'>
      <AdminAreaSectionHeader
        header="Manage Books"
        buttonLabel="Register"
        buttonHandler={handleHeaderButtonClick}
        searchHandler={handleSearch}
      />
      <BooksTable
        className="mt-4"
        books={filteredBooks.length > 0 ? filteredBooks : books}
        isLoadingBooks={isLoadingBooks}
      />
      <BooksRegisterForm
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      />
    </div>
  )
}
