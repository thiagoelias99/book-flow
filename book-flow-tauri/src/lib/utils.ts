import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getEnumKeyByValue<T extends { [key: string]: string }>(enumObj: T, value: T[keyof T]): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(key => enumObj[key] === value)
}

export function getEnumValueByKey<T extends { [key: string]: string }>(enumObj: T, key: keyof T): T[keyof T] {
  return enumObj[key]
}