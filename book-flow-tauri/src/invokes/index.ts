import { Book, BookCreateDto, BookInvokeResponse } from "@/models/Book"
import { User, UserCreateDto, UserInvokeResponse, UserLevels } from "@/models/User"
import { invoke } from "@tauri-apps/api"

export const getAllUsersInvoke = async () => {
  const response = await invoke<[UserInvokeResponse]>("get_all_users")

  return response.map(User.fromInvoke).filter(Boolean).filter(user => user?.name !== "admin") as User[]
}

export const getUserInvoke = async (userName: string) => User.fromInvoke(await invoke<UserInvokeResponse>("get_user_by_user_name", { userName }))

export const updateUserRoleInvoke = async (id: string, level: UserLevels) => invoke("update_user_role", { data: { id, level } })

export const getAdminInvoke = async () => User.fromInvoke(await invoke<UserInvokeResponse>("get_user_by_user_name", { userName: "admin" }))

export const setAdminInvoke = async (password: string) => {
  return await invoke("register_user", {
    userRegisterDto: {
      name: "admin",
      userName: "admin",
      level: "admin",
      password,
    }
  })
}

export const registerUserInvoke = async (userRegisterDto: UserCreateDto) => {
  return await invoke("register_user", {
    userRegisterDto
  })
}

export const loginUserInvoke = async (data: { userName: string, password: string }) => {
  const response = await invoke<UserInvokeResponse>("login", { data })

  return User.fromInvoke(response)
}

export const registerBookInvoke = async (data: BookCreateDto) => {
  return await invoke("register_book", {
    data
  })
}

export const getAllBooksInvoke = async () => {
  const response = await invoke<[BookInvokeResponse]>("get_all_books")
  console.log(response)

  return response.map(Book.fromInvoke).filter(Boolean)
}