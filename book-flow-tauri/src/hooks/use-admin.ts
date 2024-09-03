import { getAdminInvoke, setAdminInvoke } from "@/invokes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useAdmin = () => {
  const queryClient = useQueryClient()

  const { data: adminData, isFetching: isLoadingAdmin } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminInvoke,
  })

  const { mutate: setAdmin, isPending: isSettingAdmin } = useMutation({
    mutationKey: ["set_admin"],
    mutationFn: ({ password }: { password: string }) => {
      return setAdminInvoke(password)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["admin"] })
    },
  })

  return { adminData, isLoadingAdmin, setAdmin, isSettingAdmin }
}

export default useAdmin