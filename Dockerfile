FROM node:18

# Set direktori kerja dalam container
WORKDIR /app

# Salin semua file project ke dalam container
COPY . .

# Install dependensi
RUN npm install --legacy-peer-deps

# Jalankan server development
EXPOSE 3000
CMD ["npm", "run", "dev"]
