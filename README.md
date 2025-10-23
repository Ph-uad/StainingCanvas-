# Staining Canvas  
*Write and share anywhere and anytime.*

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
  
---

## 🖋 Overview  
**Staining Canvas** is a full-stack web application that allows GitHub users to sign in and write documents that can have subdocuments beneath them.  
Users can **publish, archive, restore, or delete** their writings, and share public documents via link.  
Unsigned visitors can view shared public documents, while signed-in users can create and manage their own writing space.

---

## ⚙️ Features  
- ✍️ Intuitive document editor with markdown support  
- 🧩 Subdocument hierarchy (parent → children)  
- 🕓 Versioning and draft management  
- 🚀 Publish, archive, and restore workflows  
- 🔐 GitHub OAuth for secure authentication  
- 🌍 Shareable public links for published docs  
- ⚡ Real-time updates powered by Convex

---

## 🧠 Tech Stack  

| Technology | Purpose |
|-------------|----------|
| **Next.js** | Full-stack framework for frontend and backend |
| **Convex** | Real-time database and backend logic |
| **Clerk** | Authentication and user management |
| **Zod** | Data validation and state management |
| **Shadcn/UI** | Styled components and UI primitives |
| **Lucide React** | Icons |
| **Vercel** | Deployment and hosting |

<div align="left">
  <img src="https://raw.githubusercontent.com/vercel/vercel/main/packages/frameworks/logos/next.svg" height="36" alt="Next.js" />
  <img src="https://avatars.githubusercontent.com/u/116117145?s=200&v=4" height="36" alt="Convex" />
  <img src="https://avatars.githubusercontent.com/u/105443040?s=200&v=4" height="36" alt="Clerk" />
</div>

---

## 🧩 Installation  

```bash
# 1. Clone the repository
git clone repo-url

# 2. Navigate into the directory
cd staining-canvas

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Start Convex locally (in a separate terminal)
npx convex dev
