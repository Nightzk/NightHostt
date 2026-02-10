import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type CreateContactMessageInput } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useContactMessages() {
  return useQuery({
    queryKey: [api.contact.list.path],
    queryFn: async () => {
      const res = await fetch(api.contact.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao buscar mensagens de contato.");
      const json = await res.json();
      return parseWithLogging(api.contact.list.responses[200], json, "contact.list");
    },
  });
}

export function useCreateContactMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateContactMessageInput) => {
      const validated = api.contact.create.input.parse(input);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errJson = await res.json().catch(() => ({}));
          const err = parseWithLogging(api.contact.create.responses[400], errJson, "contact.create.400");
          throw new Error(err.field ? `${err.message} (${err.field})` : err.message);
        }
        throw new Error("Não foi possível enviar sua mensagem. Tente novamente.");
      }

      const json = await res.json();
      return parseWithLogging(api.contact.create.responses[201], json, "contact.create.201");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.contact.list.path] });
    },
  });
}
