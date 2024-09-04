import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
import { Book } from "@/models/Book"

interface Props {
  books: (Book | null)[] | undefined
  isLoadingBooks: boolean
  className?: ClassNameValue
}

export default function BooksTable({ className, books, isLoadingBooks }: Props) {

  return (
    <>
      <Table className={cn("bg-card rounded-lg", className)}>
        <TableCaption>A list of registered books</TableCaption>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {isLoadingBooks ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className='text-center'>Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {books?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>No books found</TableCell>
              </TableRow>
            )}
            {books?.map((book) => (
              <TableRow key={book?.id}>
                <TableCell>{book?.title}</TableCell>
                <TableCell>{book?.author}</TableCell>
                <TableCell>{book?.isbn}</TableCell>
                <TableCell>{book?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )
        }
      </Table >
    </>

  )
}