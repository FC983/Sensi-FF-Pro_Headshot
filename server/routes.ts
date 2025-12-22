import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { isAuthenticated, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register auth routes
  registerAuthRoutes(app);

  // Public: List phones (without sensitive settings)
  app.get(api.phones.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const phones = await storage.getPhones(search);
    // Return only public info without settings
    const publicPhones = phones.map(({ generalSensitivity, redDotSensitivity, x2ScopeSensitivity, x4ScopeSensitivity, sniperScopeSensitivity, freeLookSensitivity, ...publicData }) => publicData);
    res.json(publicPhones);
  });

  // Protected: Get full phone details with settings
  app.get(api.phones.get.path, isAuthenticated, async (req, res) => {
    const phone = await storage.getPhone(Number(req.params.id));
    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }
    // Return full details including settings
    res.json(phone);
  });

  // Seed data function
  async function seedDatabase() {
    const existing = await storage.getPhones();
    if (existing.length === 0) {
      const seedData = [
        // Samsung
        { brand: "Samsung", model: "Galaxy A10s", dpi: 500, generalSensitivity: 100, redDotSensitivity: 98, x2ScopeSensitivity: 95, x4ScopeSensitivity: 90, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Samsung", model: "Galaxy A20s", dpi: 550, generalSensitivity: 100, redDotSensitivity: 95, x2ScopeSensitivity: 93, x4ScopeSensitivity: 90, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Samsung", model: "Galaxy A02s", dpi: 450, generalSensitivity: 100, redDotSensitivity: 99, x2ScopeSensitivity: 98, x4ScopeSensitivity: 95, sniperScopeSensitivity: 40, freeLookSensitivity: 40 },
        { brand: "Samsung", model: "Galaxy A03s", dpi: 460, generalSensitivity: 100, redDotSensitivity: 98, x2ScopeSensitivity: 96, x4ScopeSensitivity: 92, sniperScopeSensitivity: 42, freeLookSensitivity: 42 },
        { brand: "Samsung", model: "Galaxy A12", dpi: 480, generalSensitivity: 100, redDotSensitivity: 97, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 45, freeLookSensitivity: 45 },
        { brand: "Samsung", model: "Galaxy A13", dpi: 500, generalSensitivity: 98, redDotSensitivity: 94, x2ScopeSensitivity: 92, x4ScopeSensitivity: 90, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Samsung", model: "Galaxy A21s", dpi: 600, generalSensitivity: 99, redDotSensitivity: 95, x2ScopeSensitivity: 90, x4ScopeSensitivity: 88, sniperScopeSensitivity: 46, freeLookSensitivity: 46 },
        { brand: "Samsung", model: "Galaxy A30", dpi: 520, generalSensitivity: 100, redDotSensitivity: 95, x2ScopeSensitivity: 92, x4ScopeSensitivity: 88, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Samsung", model: "Galaxy A50", dpi: 480, generalSensitivity: 98, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Samsung", model: "Galaxy A51", dpi: 480, generalSensitivity: 95, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 52, freeLookSensitivity: 52 },
        { brand: "Samsung", model: "Galaxy A71", dpi: 450, generalSensitivity: 92, redDotSensitivity: 88, x2ScopeSensitivity: 85, x4ScopeSensitivity: 80, sniperScopeSensitivity: 55, freeLookSensitivity: 55 },
        { brand: "Samsung", model: "Galaxy M11", dpi: 520, generalSensitivity: 100, redDotSensitivity: 96, x2ScopeSensitivity: 94, x4ScopeSensitivity: 90, sniperScopeSensitivity: 47, freeLookSensitivity: 47 },
        // Redmi / Xiaomi / POCO
        { brand: "Redmi", model: "Note 8", dpi: 460, generalSensitivity: 96, redDotSensitivity: 92, x2ScopeSensitivity: 90, x4ScopeSensitivity: 88, sniperScopeSensitivity: 45, freeLookSensitivity: 45 },
        { brand: "Redmi", model: "Note 9", dpi: 490, generalSensitivity: 98, redDotSensitivity: 95, x2ScopeSensitivity: 92, x4ScopeSensitivity: 90, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Redmi", model: "9", dpi: 450, generalSensitivity: 100, redDotSensitivity: 98, x2ScopeSensitivity: 95, x4ScopeSensitivity: 93, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Redmi", model: "9A", dpi: 440, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 98, x4ScopeSensitivity: 95, sniperScopeSensitivity: 55, freeLookSensitivity: 55 },
        { brand: "Redmi", model: "9C", dpi: 440, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 98, x4ScopeSensitivity: 95, sniperScopeSensitivity: 55, freeLookSensitivity: 55 },
        { brand: "Redmi", model: "10C", dpi: 480, generalSensitivity: 97, redDotSensitivity: 94, x2ScopeSensitivity: 92, x4ScopeSensitivity: 90, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Redmi", model: "Note 10", dpi: 480, generalSensitivity: 94, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 45, freeLookSensitivity: 45 },
        { brand: "Redmi", model: "Note 11", dpi: 500, generalSensitivity: 95, redDotSensitivity: 91, x2ScopeSensitivity: 89, x4ScopeSensitivity: 86, sniperScopeSensitivity: 46, freeLookSensitivity: 46 },
        { brand: "POCO", model: "M3", dpi: 460, generalSensitivity: 98, redDotSensitivity: 94, x2ScopeSensitivity: 92, x4ScopeSensitivity: 90, sniperScopeSensitivity: 49, freeLookSensitivity: 49 },
        { brand: "POCO", model: "X3 Pro", dpi: 420, generalSensitivity: 90, redDotSensitivity: 85, x2ScopeSensitivity: 80, x4ScopeSensitivity: 75, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        // Infinix
        { brand: "Infinix", model: "Hot 8", dpi: 440, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 40, freeLookSensitivity: 40 },
        { brand: "Infinix", model: "Hot 9", dpi: 440, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 40, freeLookSensitivity: 40 },
        { brand: "Infinix", model: "Hot 10", dpi: 440, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 40, freeLookSensitivity: 40 },
        { brand: "Infinix", model: "Smart 5", dpi: 400, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 98, x4ScopeSensitivity: 95, sniperScopeSensitivity: 38, freeLookSensitivity: 38 },
        { brand: "Infinix", model: "Smart 6", dpi: 400, generalSensitivity: 100, redDotSensitivity: 100, x2ScopeSensitivity: 98, x4ScopeSensitivity: 95, sniperScopeSensitivity: 38, freeLookSensitivity: 38 },
        { brand: "Infinix", model: "Note 10", dpi: 480, generalSensitivity: 95, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Infinix", model: "Note 11", dpi: 480, generalSensitivity: 95, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        // Realme / Oppo
        { brand: "Realme", model: "C11", dpi: 450, generalSensitivity: 100, redDotSensitivity: 96, x2ScopeSensitivity: 94, x4ScopeSensitivity: 90, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Realme", model: "C15", dpi: 450, generalSensitivity: 100, redDotSensitivity: 96, x2ScopeSensitivity: 94, x4ScopeSensitivity: 90, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
        { brand: "Realme", model: "C21Y", dpi: 470, generalSensitivity: 98, redDotSensitivity: 95, x2ScopeSensitivity: 92, x4ScopeSensitivity: 88, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Realme", model: "C35", dpi: 470, generalSensitivity: 98, redDotSensitivity: 95, x2ScopeSensitivity: 92, x4ScopeSensitivity: 88, sniperScopeSensitivity: 48, freeLookSensitivity: 48 },
        { brand: "Oppo", model: "A15", dpi: 500, generalSensitivity: 100, redDotSensitivity: 98, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 45, freeLookSensitivity: 45 },
        { brand: "Oppo", model: "A16", dpi: 500, generalSensitivity: 100, redDotSensitivity: 98, x2ScopeSensitivity: 95, x4ScopeSensitivity: 92, sniperScopeSensitivity: 45, freeLookSensitivity: 45 },
        { brand: "Oppo", model: "A53", dpi: 480, generalSensitivity: 97, redDotSensitivity: 93, x2ScopeSensitivity: 90, x4ScopeSensitivity: 88, sniperScopeSensitivity: 47, freeLookSensitivity: 47 },
        { brand: "Oppo", model: "A54", dpi: 480, generalSensitivity: 97, redDotSensitivity: 93, x2ScopeSensitivity: 90, x4ScopeSensitivity: 88, sniperScopeSensitivity: 47, freeLookSensitivity: 47 },
        // Huawei
        { brand: "Huawei", model: "Y7 Prime", dpi: 450, generalSensitivity: 100, redDotSensitivity: 95, x2ScopeSensitivity: 92, x4ScopeSensitivity: 90, sniperScopeSensitivity: 52, freeLookSensitivity: 52 },
        { brand: "Huawei", model: "Y9 Prime", dpi: 460, generalSensitivity: 95, redDotSensitivity: 90, x2ScopeSensitivity: 88, x4ScopeSensitivity: 85, sniperScopeSensitivity: 50, freeLookSensitivity: 50 },
      ];

      for (const phone of seedData) {
        await storage.createPhone(phone);
      }
      console.log("Database seeded with phones");
    }
  }

  // Run seed
  seedDatabase().catch(console.error);

  return httpServer;
}
