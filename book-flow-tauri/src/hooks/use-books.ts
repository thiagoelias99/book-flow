import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BookCreateDto } from "@/models/Book"
import { getAllBooksInvoke, registerBookInvoke } from "@/invokes"

const useBooks = () => {
  const queryClient = useQueryClient()

  // const { data: books, isFetching: isLoadingBooks } = useQuery({
  //   queryKey: ["books"],
  //   queryFn: getAllBooksInvoke
  // })

  const { mutateAsync: registerBook, isPending: isRegisteringBook } = useMutation({
    mutationKey: ["register_book"],
    mutationFn: async (data: BookCreateDto) => await registerBookInvoke(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["books"] })
    }
  })

  return { registerBook, isRegisteringBook }
}

export default useBooks