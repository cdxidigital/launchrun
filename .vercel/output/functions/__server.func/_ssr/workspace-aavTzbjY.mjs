import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as getWorkspace } from "./router-Dd3uoXY6.mjs";
import { M as roleAllows } from "./domain-DOC0tJs4.mjs";
import { h as useCurrentUserState } from "./ui-BVcXVmeN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-aavTzbjY.js
function useWorkspace() {
	const { user, isPending } = useCurrentUserState();
	return useQuery({
		queryKey: ["workspace"],
		queryFn: () => getWorkspace(),
		enabled: !isPending && !!user
	});
}
function useMutate(fn) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
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
		}
	});
}
function useActive() {
	return useWorkspace().data?.active ?? null;
}
function canEdit(role, min = "operator") {
	return !!role && roleAllows(role, min);
}
//#endregion
export { useWorkspace as i, useActive as n, useMutate as r, canEdit as t };
