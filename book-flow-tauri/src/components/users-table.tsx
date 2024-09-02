import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { User, UserInvokeResponse, UserLevels } from "@/models/User"
import { invoke } from "@tauri-apps/api"
import { useEffect, useState } from "react"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  userIsRegistered: boolean
  setUserIsRegistered: (value: boolean) => void
  className?: ClassNameValue
}

export default function UsersTable({ className, userIsRegistered, setUserIsRegistered }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    try {
      setIsLoading(true)
      getUsers()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [userIsRegistered])

  const roleOptions = Object.keys(UserLevels).map((option, index) => {
    return {
      label: Object.values(UserLevels)[index],
      value: Object.keys(UserLevels)[index]
    }
  })

  async function handleRoleChange(value: string, userId: string) {
    const level = value as keyof typeof UserLevels

    try {
      await invoke("update_user_role", { data: { id: userId, level } })
      await getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  async function getUsers() {
    const response = await invoke<[UserInvokeResponse]>("get_all_users")

    const users = response.map(User.fromInvoke).filter(Boolean).filter(user => user?.name !== "admin") as User[]

    setUsers(users)
  }

  if (userIsRegistered) {
    setUserIsRegistered(false)
  }


  return (
    <Table className={cn("bg-card rounded-lg", className)}>
      <TableCaption>A list of registered users</TableCaption>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className='text-center'>Loading...</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className='text-center'>No users found</TableCell>
            </TableRow>
          )}
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell className='min-w-6 max-w-6'>
                <Select
                  value={user.level}
                  onValueChange={(event) => handleRoleChange(event, user.id)}
                >
                  <SelectTrigger className='border-none'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
      }
    </Table >
  )
}