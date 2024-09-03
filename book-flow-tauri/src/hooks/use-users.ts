import { getAllUsersInvoke, loginUserInvoke, registerUserInvoke, updateUserRoleInvoke } from "@/invokes"
import { UserCreateDto, UserLevels } from "@/models/User"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "./use-local-storage"
import { useNavigate } from "react-router-dom"

const useUsers = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setValue: setUserName } = useLocalStorage<string | null>("current_user", null)

  const { data: users, isFetching: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersInvoke
  })

  const { mutate: updateRole, isPending: isUpdatingRole } = useMutation({
    mutationKey: ["update_user_role"],
    mutationFn: ({ id, level }: { id: string, level: UserLevels }) => {
      return updateUserRoleInvoke(id, level)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["users"] })
    }
  })

  const { mutateAsync: login, isPending: isAwaitingForLogin, error: loginError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { userName: string, password: string }) => {

      const user = await loginUserInvoke(data)
      if (user) {
        setUserName(user.userName)
        queryClient.setQueryData(["user"], user)
      } else {
        setUserName(null)
        queryClient.setQueryData(["user"], null)
      }
      return user
    }
  })

  const logout = () => {
    setUserName(null)
    queryClient.setQueryData(["user"], null)
    navigate("/")
  }

  const { mutateAsync: registerUser, isPending: isRegisteringUser } = useMutation({
    mutationKey: ["register_user"],
    mutationFn: async (data: UserCreateDto) => await registerUserInvoke(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["users"] })
    }
  })

  return { users, isLoadingUsers, updateRole, isUpdatingRole, login, logout, isAwaitingForLogin, loginError, registerUser, isRegisteringUser }
}

export default useUsers