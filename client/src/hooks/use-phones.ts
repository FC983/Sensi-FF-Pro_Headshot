import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePhones(search?: string) {
  return useQuery({
    queryKey: [api.phones.list.path, search],
    queryFn: async () => {
      const url = search 
        ? `${api.phones.list.path}?search=${encodeURIComponent(search)}`
        : api.phones.list.path;
        
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch phones");
      return api.phones.list.responses[200].parse(await res.json());
    },
  });
}

export function usePhone(id: number) {
  return useQuery({
    queryKey: [api.phones.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.phones.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch phone details");
      return api.phones.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}
