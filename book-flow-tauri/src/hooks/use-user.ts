import { useQuery } from "@tanstack/react-query"
import { getUserInvoke } from "@/invokes"
import { useLocalStorage } from "./use-local-storage"

const useUser = (userName: string | null | undefined) => {
  const { storedValue } = useLocalStorage<string | null>("current_user", null)

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUserInvoke(userName || storedValue || "")
    },
  })

  return { user }
}

export default useUser