import { z } from "@/lib/pt-zod"

export type UserInvokeResponse = {
  id: string,
  name: string,
  user_name: string,
  password: string,
  level: string,
}

export class User {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly userName: string,
    public readonly level: string
  ) { }

  static fromInvoke(data: UserInvokeResponse): User | null {
    if (!data) {
      return null
    }

    return new User(
      data.id,
      data.name,
      data.user_name,
      data.level
    )
  }
}

export const userCreateDtoSchema = z.object({
  name: z.string().min(3),
  userName: z.string().min(3),
  level: z.string().min(3),
  password: z.string().min(6).max(20),
})

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>