# 📚 Course Platform - Web-Based Course Recommender (Capstone Project)

Project ini adalah prototipe sistem rekomendasi kursus online berbasis web yang dibuat menggunakan React, dengan integrasi model rekomendasi berbasis machine learning. Cocok dijalankan secara lokal menggunakan Docker.

---

## 🖥️ Cara Menjalankan di Windows (dengan Docker)

### 1. 🔧 Instalasi Docker Desktop

Jika belum ada Docker di Windows:

- Download Docker Desktop dari: https://www.docker.com/products/docker-desktop
- Install seperti biasa
- Aktifkan WSL2 saat diminta (jika Windows Home)
- Restart PC setelah instalasi selesai

### 2. 🗂️ Ekstrak Project

- Ekstrak file `course-platform.zip`
- Buka folder hasil ekstraksi, misalnya `course-platform`

### 3. ▶️ Build & Jalankan dengan Docker

Buka **PowerShell** atau **Terminal** di folder tersebut, lalu jalankan:

```
docker build -t course-platform .
docker run -p 3000:3000 course-platform
```

### 4. 🌐 Akses Aplikasi

### 5. Buka browser, lalu kunjungi:


http://localhost:3000

