import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  className?: ClassNameValue
}

export default function UsersTable({ className }: Props) {
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
      <TableBody>
        <TableRow>
          <TableCell>Thiago Elias</TableCell>
          <TableCell>telias</TableCell>
          <TableCell>admin</TableCell>
        </TableRow>
      </TableBody>
    </Table>

  )
}
