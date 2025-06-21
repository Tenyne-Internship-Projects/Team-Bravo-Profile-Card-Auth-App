# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🧑‍💼 KConnect Profile Card (Frontend)

This is the **frontend** portion of the KConnect Profile Card web app built with **React.js** and **Tailwind CSS**. It allows users to register, view, and edit their profile with real-time animations and clean UI design.

---

## ✨ Features

- ✅ Animated profile card with Framer Motion
- ✅ Register new profile with image upload
- ✅ Edit profile and preview instantly
- ✅ Display skills and tools using styled tags
- ✅ Responsive and mobile-friendly UI
- ✅ Uses Context API for global state management

---

## 🛠 Tech Stack

- React.js
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Toastify

---

## 📸 Screenshots

| Register Page | Profile View | Edit Profile |
|---------------|--------------|--------------|
| ![Register](./screenshots/register.png) | ![Profile](./screenshots/profile.png) | ![Edit](./screenshots/edit.png) |

---

## 📂 Project Structure (Frontend)

```
client/
├── public/
├── src/
│   ├── assets/            # Images and logos
│   ├── components/        # Reusable UI components
│   ├── context/           # AppContext for global state
│   ├── pages/             # Register, Profile, Edit Profile
│   ├── App.js             # Main router config
│   └── index.js           # Entry point
├── .env                   # Environment config
├── tailwind.config.js     # Tailwind CSS config
└── package.json
```

---

## 🚀 Getting Started (Frontend)

### 1. Navigate to the client folder
```bash
cd client
```

### 2. Setup environment variables
Create a `.env` file in the `client/` directory:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the frontend app
```bash
npm start
```

App will be available at: `http://localhost:3000`
You can also checck: `https://team-bravo-profile-card-auth-app.vercel.app/`

---

## 🌐 Pages

| Path | Component | Description |
|------|-----------|-------------|
| `/register` | Register.jsx | Create a new profile |
| `/profile` | ProfileCard.jsx | View user profile |
| `/edit-profile` | EditProfile.jsx | Edit profile information |

---



## 📦 API Integration
All data is fetched or submitted to the backend via Axios using the base URL set in `.env`:

```js
axios.post(`${process.env.VITE_BACKEND_URL}/api/...`)
```

---

## 🙋‍♂️ Author

**Team Bravo**  

