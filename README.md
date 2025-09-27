# Sales Data Visualization 📊

## 📌 Project Title

Sales Data Visualization Dashboard with React, Chart.js, and Express.js

## 📝 Description

A modern fullstack web application for managing and visualizing sales data.
This app provides an interactive dashboard with CRUD functionality, insightful charts, and quick statistics to help businesses analyze their sales performance.

## ⚙️ Technologies Used

- Frontend: React.js (Vite), React Router, TailwindCSS
- Charts: Chart.js + react-chartjs-2
- Backend: Node.js + Express.js
- Database: JSON file (can be upgraded to MongoDB/MySQL)
- Notifications: react-hot-toast
- Deployment: - Frontend → Vercel - Backend → Railway

## 🚀 Features

# 🏠 Home

- Welcome overview & quick navigation
- Sales summary (today / this month)
- Quick stats cards: total products, customers, transactions
- Mini charts (7-day sales trends)
- Notifications/alerts (e.g., sales drop warning)

# 📊 Data

- CRUD operations for sales data (add, edit, delete)
- Interactive data table (search, sort, filter, pagination)
- CSV/Excel export
- Upload CSV (bulk import)
- Smooth UX with loading states

# 📈 Insights

- Line chart: Sales over time
- Pie chart: Top products
- Bar chart: Sales per category
- Auto-generated insights (e.g., "Sales increased 20% compared to last week")
- Custom date range filters

## 🛠️ Setup Instructions

1. Clone repository

```bash
git clone https://github.com/iiksukira/data-visualization-app.git
cd data-visualization-app
```

2. Frontend setup

cd frontend
npm install
npm run dev

3. Backend setup

cd backend
npm install
node index.js

4. Environment Variables

VITE_API_URL=https://your-backend-url.up.railway.app/data

5. Run locally

- frontend → http://localhost:5173
- backend → http://localhost:3000

👨‍💻 Author

Developed with ❤️ by [iiksukira](https://github.com/iiksukira)
