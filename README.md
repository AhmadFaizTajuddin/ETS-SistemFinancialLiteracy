### 1.1 Tujuan Produk

1. Mengubah konten edukasi OJK yang sudah ada (modul, majalah, artikel, video) menjadi pengalaman belajar interaktif.
2. Mendorong masyarakat menyelesaikan materi literasi keuangan melalui poin, badge, level, dan progress tracking.
3. Mengukur pemahaman pengguna secara terstruktur lewat quiz pre dan post pada setiap learning path.
4. Menyediakan jalur belajar singkat yang dapat diselesaikan di sela waktu, dengan progres yang tersimpan.
5. Memberikan data insight bagi tim literasi OJK untuk menilai efektivitas materi dan kampanye.

### 1.2 Pernyataan Produk

Untuk masyarakat umum yang ingin memahami pinjol ilegal dan penipuan digital, serta tim literasi OJK yang perlu mengukur dampak edukasinya, platform gamifikasi EPK menyediakan learning path terstruktur yang menggabungkan modul mini, quiz berskenario, sistem reward, dan dashboard analitik dalam satu lingkungan belajar mandiri.

### 2. Latar Belakang dan Permasalahan

1. Konten edukasi OJK tersebar di banyak halaman dan berformat satu arah (PDF, artikel), sehingga engagement rendah dan pemahaman sulit diukur.
2. Pengguna tidak memiliki cara untuk mengetahui apakah mereka benar-benar sudah paham materi yang dibaca.
3. Volume pengaduan melalui APPK tinggi (48.355 aduan per November 2025), menunjukkan kebutuhan edukasi preventif yang lebih kuat.
4. Tim literasi kesulitan mengukur dampak kampanye dan mengidentifikasi materi mana yang perlu disederhanakan.
5. Edukasi belum dipersonalisasi dan belum mendukung target SNLIK 2029 (literasi 69,35%, inklusi 93%) secara terukur.

### 3. Sasaran, Indikator, dan Batasan

| Sasaran | Indikator keberhasilan awal |
| --- | --- |
| Learning path | Minimal 2 path live (“Anti-Pinjol Ilegal”, “Penipuan Digital & Aktivitas Keuangan Ilegal”), masing-masing ≥4 modul mini dengan total ≤30 menit. |
| Penyelesaian materi | ≥60% peserta yang memulai path menyelesaikan minimal 1 modul penuh. |
| Quiz engine | Quiz 5–10 soal MCQ dengan skor langsung dan penjelasan 2–3 kalimat setiap jawaban salah. |
| Peningkatan pemahaman | Rata-rata skor post-quiz naik ≥20 poin dibanding pre-quiz pada topik yang sama. |
| Progress & reward | Progres dan skor tersimpan untuk user terdaftar maupun guest; ≥50% penyelesai path memperoleh ≥1 badge. |
| Engagement | Rata-rata durasi sesi ≥5 menit; return rate ≥30% dalam 30 hari. |
| Pengelolaan konten | Admin dapat menambah/mengubah modul, urutan, bobot poin, dan bank soal tanpa deployment baru. |
| Integrasi kanal | CTA tersedia di halaman EPK dan chatbot dapat menawarkan quiz dari path terkait. |
| Analitik | Dashboard menampilkan completion rate, distribusi skor, dan modul dengan error rate >40%; minimal 3 jenis laporan dapat diekspor. |
| Performa | Page load ≤3 detik, mendukung 1.000 concurrent users, uptime 99% pada jam kerja (08:00–17:00 WIB). |
| Kualitas UI | Mobile-first, responsif, memenuhi WCAG 2.1 Level A, dengan onboarding singkat untuk first-time user. |
| Keamanan dasar | Guest mode + login opsional (SSO OJK bila tersedia), HTTPS/TLS, validasi dan sanitasi seluruh input. |

**Batasan.** Target seperti ≥5.000 akun unik dan ≥60% completion rate berlaku untuk periode pilot 3 bulan dan harus diverifikasi dari data platform, bukan diasumsikan. Perlu dicatat bahwa dokumen sumber memuat dua angka berbeda untuk sasaran yang sama: bagian OKR menyebut ≥5.000 akun unik, sementara tabel Success Metrics menyebut ≥100 unique users untuk periode yang sama. Selisih ini perlu dikonfirmasi ke Product Owner sebelum dijadikan acuan.

Integrasi penuh via API dengan APPK dan sistem lain berada di luar lingkup MVP; fase ini menggunakan deep link atau redirect sederhana. Dukungan Bahasa Inggris juga ditargetkan untuk fase 2.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
