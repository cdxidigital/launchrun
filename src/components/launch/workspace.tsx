import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { roleAllows, type MutationResult, type Role, type Workspace } from "@/lib/launch/domain";
import { getWorkspace } from "@/lib/launch/server";

export function useWorkspace() {
  const { user, isPending } = useCurrentUserState();
  return useQuery({
    queryKey: ["workspace"],
    queryFn: () => getWorkspace(),
    enabled: !isPending && !!user,
  });
}

export function useMutate<T>(fn: (input: { data: T }) => Promise<MutationResult>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: T) => {
      const result = await fn({ data: input });
      if (!result.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: (result) => {
      client.setQueryData(["workspace"], result.workspace);
      if (result.note) toast(result.note);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    },
  });
}

export function useActive() {
  const query = useWorkspace();
  return query.data?.active ?? null;
}

export function canEdit(role: Role | undefined, min: Role = "operator") {
  return !!role && roleAllows(role, min);
}

export type { Workspace };
