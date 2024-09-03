import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { bookCreateDtoSchema, BookStatus } from "@/models/Book"
import { getEnumKeyByValue } from "@/lib/utils"
import useBooks from "@/hooks/use-books"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export default function BooksRegisterForm({ open, onOpenChange }: Props) {
  const { registerBook, isRegisteringBook } = useBooks()
  const { toast } = useToast()

  type formSchema = typeof bookCreateDtoSchema

  const form = useForm<z.infer<formSchema>>({
    resolver: zodResolver(bookCreateDtoSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      status: getEnumKeyByValue(BookStatus, BookStatus.available)
    },
  })

  async function onSubmit(values: z.infer<formSchema>) {
    try {

      await registerBook(values)
      form.reset()
      toast({
        title: "Book registered",
        description: "The book has been registered successfully",
      })
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error registering book",
        description: "An error occurred while registering the book",
        variant: "destructive"
      })
    }
  }

  const roleOptions = Object.keys(BookStatus).map((_option, index) => {
    return {
      label: Object.values(BookStatus)[index],
      value: Object.keys(BookStatus)[index]
    }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className='w-full max-w-md'
      >
        <DialogHeader>
          <DialogTitle>Register a new Book</DialogTitle>
          <DialogDescription>
            Fill out the form to register a new book
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit" isLoading={isRegisteringBook} >Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}