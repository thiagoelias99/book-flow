import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import useAdmin from "@/hooks/use-admin"


export default function AdminRegisterForm() {
  const { setAdmin, isSettingAdmin } = useAdmin()
  const { toast } = useToast()

  const formSchema = z.object({
    password: z.string().min(6).max(20)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await setAdmin({ password: values.password })
      form.reset()
      toast({
        title: "Admin registered",
        description: "Admin user has been registered",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error registering admin",
        description: "An error occurred while registering the admin",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Welcome to Book Flow</CardTitle>
        <CardDescription>Let`s register the application admin user!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    This password must be kept safe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full'
              type="submit"
              isLoading={isSettingAdmin}
            >Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}