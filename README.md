# SecureSight Dashboard

A modern, dark-themed CCTV monitoring dashboard built with Next.js 15 and Tailwind CSS. It displays real-time incidents detected by computer vision models, allowing admins to view, resolve, and manage incidents across multiple cameras.

---

## 🔧 Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **Tailwind CSS** for modern styling
- **Prisma** for DB ORM
- **Lucide Icons** for UI
- **Deployed on Vercel**

---

## 🚀 Live Demo

🌐 [View Live on Vercel](https://securesight-dashboard.vercel.app)  
📁 [Source Code on GitHub](https://github.com/Anshumaan-25/securesight-dashboard)

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Anshumaan-25/securesight-dashboard.git
cd securesight-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed   # Seeds some initial incidents
```

### 4. Start the App

```bash
npm run dev
```

### 5. Environment Variables

Create a `.env` file and include (if needed):

```env
DATABASE_URL="file:./dev.db"
```

---

## 📌 Tech Decisions

- **Next.js App Router** used for modern file-based routing.
- **Prisma ORM** used for database modeling and type safety.
- **TailwindCSS** adopted for fast prototyping and consistent dark theme.
- **Lucide Icons** chosen for lightweight, flexible SVG icons.

---

## 💡 If I Had More Time...

- Add **authentication** (e.g., admin login)
- Implement **pagination and filtering** in the incident list
- Add a **notification system** for real-time alerts
- Connect actual **CCTV feeds** or use socket-based updates
- Create a mobile-responsive version of the dashboard
- Add unit and integration **tests** for components

---

## 🧠 Author

Made with ❤️ by [Anshumaan Singh](https://github.com/Anshumaan-25)
