import { z } from "zod"

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
    public readonly level: UserLevels
  ) { }

  static fromInvoke(data: UserInvokeResponse): User | null {
    if (!data) {
      return null
    }

    return new User(
      data.id,
      data.name,
      data.user_name,
      data.level as UserLevels
    )
  }
}

export enum UserLevels {
  // keys = values
  admin = "Admin",
  manager = "Manager",
  student = "Student",
  teacher = "Teacher",
  guest = "Guest",
}

export const userCreateDtoSchema = z.object({
  name: z.string().min(3),
  userName: z.string().min(3),
  level: z.union([
    z.string().refine((value) => Object.keys(UserLevels).includes(value), {
      message: "Invalid user level"
    }).transform((value) => value as UserLevels),
    z.nativeEnum(UserLevels).transform((value) => value.toLowerCase() as UserLevels),
  ]),
  password: z.string().min(6).max(20),
})

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>