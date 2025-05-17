# NextCourse - Personalized Course Recommender

> ✨ **The Next Step Starts Here**

NextCourse adalah platform rekomendasi kursus yang memanfaatkan teknologi Machine Learning untuk memberikan saran pembelajaran yang dipersonalisasi berdasarkan minat dan tujuan pengguna.

---

## 📦 Struktur Proyek

capstonelai/
├── backend/ # Flask API Backend
│ ├── app/
│ │ ├── init.py
│ │ ├── routes.py
│ │ └── model.py
│ ├── run.py
│ ├── requirements.txt
│ └── .gitignore
├── frontend/ # Next.js Frontend
│ ├── components/
│ ├── pages/
│ │ └── index.tsx (Home Page)
│ └── ...
├── README.md


---

## 🚀 Menjalankan Aplikasi Secara Lokal

### 1. Jalankan Backend (Flask)

```
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Server backend akan berjalan di http://localhost:5000

