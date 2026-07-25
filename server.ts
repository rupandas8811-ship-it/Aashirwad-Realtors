import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index.js';
import { readinessTests, consultations, staff } from './src/db/schema.js';
import { eq, desc } from 'drizzle-orm';
import "dotenv/config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // Ensure default admin user exists
  try {
    const existingStaff = await db.select().from(staff).limit(1);
    if (existingStaff.length === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await db.insert(staff).values({
        username: 'admin',
        passwordHash
      });
      console.log('Created default admin user (admin / admin123)');
    }
  } catch (err) {
    console.error("Failed to verify/create admin user", err);
  }

  // Readiness Test Submission
  app.post('/api/readiness', async (req, res) => {
    try {
      const data = req.body;
      let score = data.score;
      let category = data.category;
      
      const result = await db.insert(readinessTests).values({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        answers: data.answers,
        score,
        category,
      }).returning();
      
      res.json(result[0]);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // Consultation Submission
  app.post('/api/consultation', async (req, res) => {
    try {
      const data = req.body;
      const result = await db.insert(consultations).values({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        lookingFor: data.lookingFor,
      }).returning();
      
      res.json(result[0]);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // Admin Login Endpoint
  app.post('/api/admin/login', async (req, res) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      const { username, password } = req.body || {};
      
      if (!username || !password) {
        return res.status(401).json({ success: false, message: "Invalid mobile number or password" });
      }
      
      const adminUser = await db.select().from(staff).where(eq(staff.username, username)).limit(1);
      
      if (!adminUser || adminUser.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid mobile number or password" });
      }

      const isValid = await bcrypt.compare(password, adminUser[0].passwordHash);
      if (!isValid) {
        return res.status(401).json({ success: false, message: "Invalid mobile number or password" });
      }

      const token = jwt.sign({ id: adminUser[0].id, username: adminUser[0].username }, JWT_SECRET, {
        expiresIn: '24h'
      });

      return res.json({ success: true, user: { id: adminUser[0].id, username: adminUser[0].username }, token });
    } catch (e: any) {
      console.error("Login endpoint error:", e);
      return res.status(500).json({ success: false, message: "Unable to login. Please try again." });
    }
  });

  // Admin APIs (Protected by JWT)
  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };

  app.get('/api/admin/submissions', requireAdmin, async (req, res) => {
    try {
      const readiness = await db.select().from(readinessTests).orderBy(desc(readinessTests.createdAt));
      const consults = await db.select().from(consultations).orderBy(desc(consultations.createdAt));
      res.json({ readiness, consults });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch('/api/admin/readiness/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const updateData: any = { updatedAt: new Date() };
      if (status !== undefined) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      
      const result = await db.update(readinessTests)
        .set(updateData)
        .where(eq(readinessTests.id, parseInt(id)))
        .returning();
      res.json(result[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch('/api/admin/consultation/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const updateData: any = { updatedAt: new Date() };
      if (status !== undefined) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      
      const result = await db.update(consultations)
        .set(updateData)
        .where(eq(consultations.id, parseInt(id)))
        .returning();
      res.json(result[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, esbuild outputs to dist/server.cjs. 
    // The dist directory contains index.html
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
