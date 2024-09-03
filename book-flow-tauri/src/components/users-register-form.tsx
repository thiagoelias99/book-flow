import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { userCreateDtoSchema, UserLevels } from "@/models/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import useUsers from "@/hooks/use-users"

interface Props {
  setUserIsRegistered: (value: boolean) => void
  open: boolean
  onOpenChange: (value: boolean) => void
}

export default function UserRegisterForm({ setUserIsRegistered, open, onOpenChange }: Props) {
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const { registerUser, isRegisteringUser } = useUsers()
  const { toast } = useToast()

  type formSchema = typeof userCreateDtoSchema

  const form = useForm<z.infer<formSchema>>({
    resolver: zodResolver(userCreateDtoSchema),
    defaultValues: {
      name: "",
      userName: "",
      level: UserLevels.guest,
      password: "",
    },
  })

  async function onSubmit(values: z.infer<formSchema>) {
    try {

      await registerUser(values)

      form.reset()
      toast({
        title: "User registered",
        description: "The user has been registered successfully",
      })
      onOpenChange(false)
      setUserIsRegistered(true)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error registering user",
        description: "An error occurred while registering the user",
        variant: "destructive"
      })
    }
  }

  // Extrair para options
  const roleOptions = Object.keys(UserLevels).map((_option, index) => {
    return {
      label: Object.values(UserLevels)[index],
      value: Object.keys(UserLevels)[index]
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
          <DialogTitle>Register a new User</DialogTitle>
          <DialogDescription>
            Fill out the form to register a new user
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.value}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toLowerCase()}>
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
            <Button className='w-full' type="submit" isLoading={isRegisteringUser} >Registrar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}