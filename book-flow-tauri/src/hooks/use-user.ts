import { useQuery } from "@tanstack/react-query"
import { getUserInvoke } from "@/invokes"

const useUser = (userName: string) => {
  const { data: user } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUserInvoke(userName),
  })

  return { user }
}

export default useUser