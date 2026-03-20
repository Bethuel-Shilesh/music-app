# 🧺 Laundry Connect  
### 🚀 Your Laundry, Our Priority  

A **full-stack smart laundry marketplace** that seamlessly connects customers with nearby laundry service providers.  
Users can discover, book, and track laundry services, while shop owners and admins manage operations through dedicated dashboards.

---

## 🛠️ Tech Stack

### 👨‍💻 Core Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-grey?style=for-the-badge)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas)
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly)

---

## ✨ Features

### 👤 Customers
- 🔍 Discover nearby laundry services  
- 📦 Book orders with pickup & delivery scheduling  
- 📊 Track order status *(Pending → Washing → Delivered)*  
- ⭐ Rate and review services  

### 🏪 Shop Owners
- 📝 Register and manage laundry services  
- 💰 Set pricing and handle incoming orders  
- 📈 Monitor revenue and performance analytics  

### 👑 Admin Panel
- ✅ Approve or reject shop registrations  
- 👥 Manage users and platform activity  
- 📊 View system-wide analytics and insights  

---

## 🗄️ Database Schema
`users` · `laundry_shops` · `services` · `orders` · `reviews` · `payments`

---

## 🔌 API Endpoints

### 🔐 Auth
- `POST /auth/register`
- `POST /auth/login`

### 🏪 Shops & Services
- `GET /shops/`
- `POST /shops/`
- `PUT /shops/{id}`
- `POST /services/`

### 📦 Orders
- `POST /orders/`
- `PUT /orders/{id}/status`

### ⭐ Reviews & Payments
- `POST /reviews/`
- `POST /payments/`

### 👑 Admin
- `GET /admin/stats`
- `PUT /admin/shops/{id}/approve`

---

## 🚀 Run Locally

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary passlib python-jose python-multipart python-dotenv bcrypt "pydantic[email]"
uvicorn laundry.main:app --reload
