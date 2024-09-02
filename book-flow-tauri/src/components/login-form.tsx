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
import { useState } from "react"
import { invoke } from "@tauri-apps/api"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { User, UserInvokeResponse } from "@/models/User"

const formSchema = z.object({
  userName: z.string().min(3),
  password: z.string().min(6).max(20)
})

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { setValue } = useLocalStorage<User | null>("current_user", null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const user = User.fromInvoke(await invoke<UserInvokeResponse>("login", { data: values }))
      form.reset()
      toast({
        title: "Login successful",
        description: "You have successfully logged in",
      })
      setValue(user)
      navigate("/logged-area")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error logging in",
        description: "An error occurred while logging in",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
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
          isLoading={isSubmitting}
        >Submit</Button>
      </form>
    </Form>
  )
}
