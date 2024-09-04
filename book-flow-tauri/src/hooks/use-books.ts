import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Book, BookCreateDto } from "@/models/Book"
import { getAllBooksInvoke, registerBookInvoke } from "@/invokes"
import { useState } from "react"

const useBooks = () => {
  const queryClient = useQueryClient()
  const [filteredBooks, setFilteredBook] = useState<Book[]>([])

  const { data: books, isFetching: isLoadingBooks } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooksInvoke
  })

  const { mutateAsync: registerBook, isPending: isRegisteringBook } = useMutation({
    mutationKey: ["register_book"],
    mutationFn: async (data: BookCreateDto) => await registerBookInvoke(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["books"] })
    }
  })

  const setFilters = (filter: string) => {
    const books = queryClient.getQueryData<Book[]>(["books"])
    const filteredBooks = books?.filter((book) => book.title.includes(filter) || book.author.includes(filter))
    setFilteredBook(filteredBooks || [])
  }

  return { registerBook, isRegisteringBook, books, isLoadingBooks, filteredBooks, setFilters }
}

export default useBooks