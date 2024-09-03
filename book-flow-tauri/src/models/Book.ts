import { getEnumKeyByValue, getEnumValueByKey } from "@/lib/utils"
import { z } from "zod"

export type BookInvokeResponse = {
  id: string,
  title: string,
  author: string,
  isbn: string,
  status: string,
}

export class Book {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly isbn: string,
    public readonly status: BookStatus
  ) { }

  static fromInvoke(data: BookInvokeResponse): Book | null {
    if (!data) {
      return null
    }

    return new Book(
      data.id,
      data.title,
      data.author,
      data.isbn,
      getEnumValueByKey(BookStatus, data.status as keyof typeof BookStatus)
    )
  }
}

export enum BookStatus {
  // keys = values
  available = "Available",
  borrowed = "Borrowed",
  lost = "Lost",
  reserved = "Reserved",
}

export const bookCreateDtoSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  isbn: z.string().min(3),
  status: z.union([
    z.nativeEnum(BookStatus).default(BookStatus.available).transform((value) => getEnumKeyByValue(BookStatus, value)),
    z.string().refine((value) => Object.keys(BookStatus).includes(value), {
      message: "Invalid user level"
    })
  ])
})

export type BookCreateDto = z.infer<typeof bookCreateDtoSchema>