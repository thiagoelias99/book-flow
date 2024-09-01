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
import { z } from "@/lib/pt-zod"
import { userCreateDtoSchema } from "@/models/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./ui/password-input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { invoke } from "@tauri-apps/api"


export default function AdminRegisterForm({ setAdminIsRegistered }: { setAdminIsRegistered: (value: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  type formSchema = typeof userCreateDtoSchema

  const form = useForm<z.infer<formSchema>>({
    resolver: zodResolver(userCreateDtoSchema),
    defaultValues: {
      name: "admin",
      userName: "admin",
      level: "admin",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<formSchema>) {
    setIsSubmitting(true)
    try {
      console.log(values)
      await invoke("register_user", { userRegisterDto: values })
      form.reset()
      toast({
        title: "Administrador registrado",
        description: "O usuário administrador foi registrado com sucesso",
      })
      setAdminIsRegistered(true)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao registrar administrador",
        description: "Ocorreu um erro ao registrar o usuário administrador",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Bem vindo ao Book Flow</CardTitle>
        <CardDescription>Vamos registrar o usuário administrador da aplicação</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    Esta senha precisa ser armazenada em segurança
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit" isLoading={isSubmitting} >Registrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}