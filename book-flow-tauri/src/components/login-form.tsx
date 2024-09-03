import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "./ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import useUsers from "@/hooks/use-users"

const formSchema = z.object({
  userName: z.string().min(3),
  password: z.string().min(6).max(20)
})

export default function LoginForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { login, isAwaitingForLogin } = useUsers()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values)

      form.reset()
      toast({
        title: "Login successful",
        description: "You have successfully logged in",
      })
      navigate("/profile")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error logging in",
        description: "An error occurred while logging in",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button
          className='w-full'
          type="submit"
          isLoading={isAwaitingForLogin}
        >Submit</Button>
      </form>
    </Form>
  )
}