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

### 2. Jalankan Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di http://localhost:3000

🔗 Integrasi Frontend ↔ Backend
Untuk menghubungkan frontend ke backend secara lokal:

Gunakan fetch('http://localhost:5000/predict', {...}) di frontend untuk mengirim data ke Flask.

Pastikan flask-cors aktif agar CORS tidak diblokir.

```
const res = await fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_input: "example input",
  }),
});
const data = await res.json();
```

📌 Catatan Tambahan
Endpoint /predict di backend saat ini masih dummy, dan akan dihubungkan ke model ML saat sudah tersedia.

Tim ML akan menambahkan file dan logika model ke dalam backend/app/model.py

👥 Tim Pengembang
Frontend Engineers: [Iwan Aslich - A704YBM231, Falih Fauzan - A008YBF154]

Backend Engineers: [Falih Fauzan - A008YBF154, Iwan Aslich - A704YBM231]

ML Engineers : [Joanne Landy Tantreece - A704XBM236, Rendika N. Suharto - A121YBM420]

Project Manager: [Joanne Landy Tantreece - A704XBM236]

📃 Lisensi
Proyek ini dibuat sebagai bagian dari Capstone Project Laskar AI x Dicoding x Lintasarta.