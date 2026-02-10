import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existing = await storage.listContactMessages();
  if (existing.length > 0) return;

  await storage.createContactMessage({
    name: "Rafael Almeida",
    email: "rafael.almeida@nighthost.com.br",
    company: "NightHost",
    subject: "Boas-vindas",
    message:
      "Esta \u00e9 uma mensagem de exemplo para validar o formul\u00e1rio de contato. Em produ\u00e7\u00e3o, ela n\u00e3o aparecer\u00e1 automaticamente para visitantes; \u00e9 apenas um seed inicial.",
  });

  await storage.createContactMessage({
    name: "Mariana Souza",
    email: "mariana.souza@startup.com.br",
    company: "Startup Aurora",
    subject: "D\u00favida sobre migra\u00e7\u00e3o",
    message:
      "Oi! Quero migrar um site WordPress para a NightHost com foco em desempenho e seguran\u00e7a. Voc\u00eas ajudam com a migra\u00e7\u00e3o e certificados SSL?",
  });

  await storage.createContactMessage({
    name: "Felipe Costa",
    email: "felipe.costa@agencia.com.br",
    company: "Ag\u00eancia Nebula",
    subject: "Revenda de dom\u00ednios",
    message:
      "Tenho uma carteira de clientes e gostaria de revender dom\u00ednios e hospedagem. Existe um plano recomendado para ag\u00eancias?",
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  await seedDatabase();

  app.get(api.contact.list.path, async (_req, res) => {
    const messages = await storage.listContactMessages();
    res.json(messages);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const created = await storage.createContactMessage(input);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message ?? "Dados inv\u00e1lidos",
          field: err.errors[0]?.path?.join("."),
        });
      }
      throw err;
    }
  });

  app.post("/api/chatbot/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Mensagem é obrigatória" });
      
      // Template para integração futura com IA
      const reply = `Olá! Sou o assistente da NightHost. Recebi sua mensagem: "${message}". Como posso ajudar com sua hospedagem hoje?`;
      
      res.json({ reply });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no chatbot" });
    }
  });

  return httpServer;
}
