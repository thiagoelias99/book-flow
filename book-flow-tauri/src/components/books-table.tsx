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
import { UserLevels } from "@/models/User"
import { ClassNameValue } from "tailwind-merge"
import useUsers from "@/hooks/use-users"

interface Props {
  // userIsRegistered: boolean
  // setUserIsRegistered: (value: boolean) => void
  className?: ClassNameValue
}

export default function BooksTable({ className }: Props) {
  const { users, isLoadingUsers: isLoading, updateRole } = useUsers()
  const roleOptions = Object.keys(UserLevels).map((_option, index) => {
    return {
      label: Object.values(UserLevels)[index],
      value: Object.keys(UserLevels)[index]
    }
  })

  async function handleRoleChange(value: string, userId: string) {
    const level = value as UserLevels

    try {
      await updateRole({ id: userId, level })
    } catch (error) {
      console.error(error)
    }
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
          {users?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className='text-center'>No users found</TableCell>
            </TableRow>
          )}
          {users?.map((user) => (
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