# Evaluasi Tengah Semester Pemrograman Berbasis Kerangka Kerja

## Anggota Kelompok 24
| Nama | NRP |
| --- | --- |
| Ahmad Faiz Tajuddin | 5025231291 |
| Kemal Tangguh Aji Rajasa | 5025231263 |
| M Rizal Febrianto | 5025231258 |

## 1. Deskripsi dan Ruang Lingkup Fitur Aplikasi Desktop Rich UI yang Dibuat
A. Deskripsi Aplikasi
FINLIT (Financial Literacy) atau Sanctuary of Financial Literacy merupakan aplikasi edukasi literasi keuangan digital yang dirancang untuk membantu pengguna memahami cara melindungi diri dari risiko keuangan, khususnya pinjaman online ilegal dan penipuan digital. Aplikasi ini menyediakan materi pembelajaran yang disusun secara terstruktur serta dilengkapi dengan kuis interaktif dan sistem penghargaan agar pengguna dapat belajar dengan lebih menarik. Sesuai dengan tujuan pada halaman utamanya, FINLIT mengajak pengguna mengenali risiko keuangan, mempelajari berbagai modus penipuan, dan meningkatkan kemampuan dalam mengambil keputusan finansial yang lebih aman. 【turn108222view0】

Dari sisi antarmuka, aplikasi FINLIT menerapkan konsep Rich User Interface (Rich UI), yaitu antarmuka yang menyediakan elemen visual dan interaksi untuk memudahkan pengguna dalam mengakses fitur. Antarmukanya menggunakan tata letak yang terstruktur, navigasi yang jelas, kartu informasi, ikon, indikator progres, serta elemen interaktif untuk mendukung aktivitas pembelajaran.

Catatan: Berdasarkan proyek ZIP yang diberikan dan website yang digunakan, FINLIT saat ini merupakan aplikasi berbasis web yang dikembangkan menggunakan Next.js dan React, dengan dukungan backend Node.js dan rancangan database PostgreSQL. Dengan demikian, konsep Rich UI diterapkan pada antarmuka webnya, bukan sebagai aplikasi desktop native.
B. Ruang Lingkup Fitur Aplikasi
Ruang lingkup fitur FINLIT meliputi beberapa bagian berikut.

1. Halaman utama (Home)

   Halaman utama menjadi tempat pengguna memperoleh gambaran mengenai tujuan aplikasi, topik pembelajaran, dan fitur yang tersedia. Halaman ini juga menyediakan ajakan untuk mulai belajar atau membuat akun.

2. Registrasi dan login pengguna

   Fitur ini memungkinkan pengguna membuat akun dan masuk ke dalam aplikasi. Dengan akun tersebut, pengguna dapat mengakses fitur pembelajaran serta menyimpan informasi terkait profil dan perkembangan belajarnya.

3. Modul pembelajaran literasi keuangan

   FINLIT menyediakan dua topik utama, yaitu:
- Anti Pinjol Ilegal, yang membahas ciri-ciri pinjaman online ilegal, risiko pinjaman, dan cara melindungi diri dari praktik pinjaman yang merugikan.
- Penipuan Digital, yang membahas modus phishing, social engineering, investasi bodong, dan berbagai risiko penipuan di dunia digital.
   Kedua topik tersebut dibagi ke dalam modul pembelajaran yang membantu pengguna mempelajari materi secara bertahap. 【turn108222view0】

4. Kuis interaktif dan evaluasi pembelajaran

   Pengguna dapat mengerjakan kuis untuk menguji pemahaman terhadap materi yang telah dipelajari. Kuis mencakup evaluasi awal dan kuis akhir. Pada beberapa modul, tersedia pula mini kuis sebagai bagian dari proses pembelajaran.

5. Sistem poin, badge, dan progres belajar

   Aplikasi menerapkan konsep gamifikasi melalui pemberian poin, badge atau lencana pencapaian, serta pencatatan progres belajar. Sistem ini bertujuan untuk mendorong pengguna menyelesaikan materi dan meningkatkan motivasi belajar.

6. Profil pengguna dan pengaturan privasi

   Pengguna dapat melihat informasi profil, pencapaian, progres pembelajaran, dan lencana yang diperoleh. Terdapat pula pengaturan privasi untuk mengelola visibilitas profil serta keikutsertaan dalam papan peringkat.

7. Leaderboard atau papan peringkat

   Fitur leaderboard menampilkan peringkat pengguna berdasarkan poin yang diperoleh. Fitur ini memberikan unsur kompetisi yang dapat mendorong pengguna untuk lebih aktif menyelesaikan pembelajaran.

8. Store dan inventory

   Aplikasi menyediakan toko virtual untuk memperoleh item menggunakan poin yang tersedia. Item tersebut dapat disimpan dalam inventory dan digunakan sesuai dengan fungsi masing-masing di dalam sistem.

9. Notifikasi dan navigasi aplikasi

   Fitur notifikasi membantu menyediakan informasi kepada pengguna, sedangkan navigasi utama memudahkan perpindahan antara halaman pembelajaran, leaderboard, profil, dan toko virtual.

Secara keseluruhan, ruang lingkup FINLIT berfokus pada penyediaan pengalaman belajar keuangan digital melalui materi, evaluasi, pengelolaan progres, dan gamifikasi. Aplikasi ini ditujukan sebagai sarana edukasi, bukan sebagai layanan pemberi pinjaman atau platform transaksi investasi.
## 2. Latar Belakang dan Manfaat Aplikasi Dibuat
A. Latar Belakang
Perkembangan teknologi digital telah memudahkan masyarakat dalam mengakses berbagai layanan keuangan. Namun, kemudahan tersebut juga diikuti oleh risiko, seperti pinjaman online ilegal, penyalahgunaan data pribadi, phishing, penipuan melalui rekayasa sosial, dan penawaran investasi bodong. Pengguna yang belum memiliki pemahaman literasi keuangan dan keamanan digital yang memadai dapat mengalami kesulitan dalam membedakan layanan yang aman dari layanan yang berpotensi merugikan.

Di sisi lain, pembelajaran mengenai risiko keuangan sering kali dianggap sulit dipahami apabila hanya disampaikan melalui penjelasan teoritis. Pengguna membutuhkan media pembelajaran yang informatif, mudah diakses, dan mampu memberikan gambaran mengenai permasalahan yang dapat dijumpai dalam kehidupan sehari-hari.

Berdasarkan permasalahan tersebut, FINLIT dikembangkan sebagai media edukasi yang menggabungkan materi literasi keuangan dengan pembelajaran interaktif. Pengguna dapat mempelajari topik yang relevan, memahami studi kasus atau skenario risiko, mengerjakan kuis, serta memperoleh badge sebagai bentuk pencapaian belajar. Pendekatan ini selaras dengan konsep pembelajaran yang ditampilkan pada website FINLIT. 【turn108222view0】

Selain materi edukasi, penggunaan Rich UI menjadi salah satu pendekatan untuk membuat aplikasi lebih mudah digunakan. Penyajian informasi melalui navigasi yang terstruktur, komponen visual, indikator progres, dan elemen interaktif diharapkan dapat membantu pengguna memahami informasi tanpa harus menghadapi tampilan yang membingungkan.
B. Manfaat Aplikasi
Pembuatan aplikasi FINLIT diharapkan memberikan manfaat sebagai berikut.

1. Meningkatkan literasi keuangan digital

Aplikasi membantu pengguna memahami karakteristik pinjaman online ilegal, mengenali berbagai modus penipuan digital, dan mengetahui langkah pencegahan yang dapat dilakukan.

2. Meningkatkan kesadaran terhadap keamanan digital

Melalui materi dan skenario pembelajaran, pengguna dapat lebih waspada terhadap tautan mencurigakan, permintaan data pribadi, penawaran investasi yang tidak wajar, dan teknik manipulasi yang digunakan oleh pelaku penipuan.

3. Menyediakan media pembelajaran yang interaktif

Kombinasi materi, mini kuis, kuis evaluasi, dan indikator progres membuat proses belajar tidak hanya berisi bacaan, tetapi juga melibatkan pengguna secara aktif.

4. Meningkatkan motivasi belajar

Sistem poin, badge, streak, dan leaderboard memberikan tujuan yang dapat dicapai selama proses pembelajaran. Mekanisme tersebut diharapkan mendorong pengguna agar lebih konsisten mempelajari materi.

5. Memudahkan pemantauan perkembangan belajar

Fitur profil dan progres memungkinkan pengguna melihat pencapaian yang telah diperoleh serta mengetahui perkembangan pembelajaran yang sudah diselesaikan.

6. Menghadirkan antarmuka yang lebih mudah digunakan

Penerapan Rich UI membantu menyusun informasi dan fitur secara terstruktur sehingga pengguna dapat menemukan materi, mengakses kuis, dan memahami status pencapaiannya dengan lebih mudah.

7. Mendukung pembelajaran yang fleksibel

Karena dikembangkan sebagai aplikasi web, FINLIT dapat diakses melalui browser pada perangkat yang kompatibel tanpa mengharuskan pengguna memasang aplikasi desktop native secara khusus.
Kesimpulan
FINLIT dikembangkan sebagai media pembelajaran literasi keuangan digital yang menggabungkan edukasi, interaksi, dan gamifikasi dalam satu aplikasi. Fokus utamanya adalah membantu pengguna mengenali bahaya pinjaman online ilegal dan penipuan digital sekaligus meningkatkan pemahaman mengenai cara melindungi diri ketika menggunakan layanan keuangan digital.

Melalui penerapan Rich UI, aplikasi berupaya menghadirkan pengalaman belajar yang terstruktur, menarik, dan mudah diakses. Dengan demikian, FINLIT diharapkan dapat menjadi sarana edukasi yang mendukung peningkatan pengetahuan, kewaspadaan, dan kemampuan pengguna dalam mengambil keputusan finansial secara lebih bijak.

## Poster Infografis Aplikasi

<img width="1024" height="1536" alt="Infografis FINLIT_ Literasi Finansial Interaktif" src="https://github.com/user-attachments/assets/73f514fb-51bd-4b6e-801d-2da37de54e38" />

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
