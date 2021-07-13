const storiesItem = [
  {
    _id: 1,
    title: `Mengapa kecepatan penting?`,
    desc: `Konsumen semakin mengandalkan seluler untuk mengakses konten dan layanan digital, dan jika Anda melihat analitik situs Anda, Anda mungkin akan melihat cerita ini diputar di data Anda sendiri. Konsumen juga lebih menuntut daripada sebelumnya, dan ketika mereka menimbang pengalaman di situs Anda, mereka tidak hanya membandingkan Anda dengan pesaing Anda, mereka menilai Anda berdasarkan layanan terbaik di kelasnya yang mereka gunakan setiap hari .`,
    url: `https://web.dev/why-speed-matters/`,
  },
  {
    _id: 2,
    title: `Apa itu kecepatan?`,
    desc: `Jadi, kecepatan itu penting, tapi apa sebenarnya yang kita maksud dengan itu? Apa artinya memiliki situs yang cepat? Adalah umum untuk mendengar orang berbicara tentang pemuatan situs web mereka dalam x.xx detik atau serupa, tetapi pemuatan bukanlah satu momen dalam waktu; ini adalah pengalaman yang tidak dapat ditangkap oleh satu metrik pun sepenuhnya. Ada beberapa momen selama pengalaman memuat yang dapat memengaruhi apakah pengguna menganggapnya 'cepat', dan jika Anda hanya fokus pada satu, Anda mungkin melewatkan pengalaman buruk yang terjadi selama sisa waktu.`,
    url: `https://web.dev/what-is-speed/`,
  },
  {
    _id: 3,
    title: `Bagaimana mengukur kecepatan?`,
    desc: `Kinerja dunia nyata sangat bervariasi karena perbedaan perangkat pengguna, koneksi jaringan, dan faktor lainnya. Misalnya, jika Anda memuat situs web Anda menggunakan koneksi jaringan kabel di kantor Anda dan membandingkannya dengan beban menggunakan WiFi di kedai kopi, pengalamannya kemungkinan akan sangat berbeda. Ada banyak alat di pasaran yang dapat membantu Anda mengumpulkan data lab atau lapangan untuk menilai kinerja halaman.`,
    url: `https://web.dev/how-to-measure-speed/`,
  },
  {
    _id: 4,
    title: `Bagaimana cara tetap cepat?`,
    desc: `Merek yang mengoptimalkan kecepatan akan sering mengalami kemunduran dengan cepat. Ini karena kinerja situs web sangat mirip dengan menjadi bugar: tidak cukup untuk melakukan upaya satu kali; Anda harus mengubah gaya hidup Anda. Studi internal Google telah menemukan bahwa 40% merek mengalami kemunduran pada kinerja web setelah 6 bulan.`,
    url: `https://web.dev/how-to-stay-fast/`,
  },
  {
    _id: 5,
    title: `Ukur kinerja dengan model RAIL`,
    desc: `RAIL adalah model kinerja yang berpusat pada pengguna yang menyediakan struktur untuk memikirkan kinerja. Model tersebut memecah pengalaman pengguna menjadi tindakan utama (misalnya, ketuk, gulir, muat) dan membantu Anda menentukan sasaran kinerja untuk masing-masing tindakan tersebut.`,
    url: `https://web.dev/rail/`,
  },
  {
    _id: 6,
    title: `Hindari teks yang tidak terlihat selama pemuatan font`,
    desc: `Font sering kali merupakan file besar yang membutuhkan waktu beberapa saat untuk dimuat. Untuk mengatasinya, beberapa browser menyembunyikan teks hingga font dimuat ("flash of invisible text"). Jika Anda mengoptimalkan kinerja, Anda sebaiknya menghindari "flash teks tak terlihat" dan langsung menampilkan konten kepada pengguna menggunakan font sistem ("flash teks tanpa gaya").`,
    url: `https://web.dev/avoid-invisible-text/`,
  },
  {
    _id: 7,
    title: `Optimalkan pemuatan dan rendering WebFont`,
    desc: `WebFont "penuh" yang mencakup semua varian gaya, yang mungkin tidak Anda perlukan, ditambah semua mesin terbang, yang mungkin tidak digunakan, dapat dengan mudah menghasilkan unduhan multi-megabyte. Dalam posting ini Anda akan mengetahui cara mengoptimalkan pemuatan WebFont sehingga pengunjung hanya mengunduh apa yang akan mereka gunakan.`,
    url: `https://web.dev/optimize-webfont-loading/`,
  },
  {
    _id: 8,
    title: `Kurangi Ukuran WebFont`,
    desc: `Tipografi sangat penting untuk desain, branding, keterbacaan, dan aksesibilitas yang baik. WebFont memungkinkan semua hal di atas dan banyak lagi: teks dapat dipilih, dicari, diperbesar, dan ramah DPI tinggi, memberikan rendering teks yang konsisten dan tajam terlepas dari ukuran dan resolusi layar. WebFont sangat penting untuk desain, UX, dan kinerja yang baik.`,
    url: `https://web.dev/reduce-webfont-size/`,
  },
  {
    _id: 9,
    title: `Penyajian adaptif berdasarkan kualitas jaringan`,
    desc: `Memuat situs web bisa menjadi pengalaman yang sangat berbeda tergantung pada kondisi jaringan. Semuanya biasanya lancar ketika Anda berada di jaringan yang cepat, tetapi ketika Anda sedang bepergian dengan paket data yang terbatas dan koneksi yang tidak stabil, atau terjebak dengan laptop di Wi-Fi kedai kopi yang lambat, itu adalah cerita yang berbeda.`,
    url: `https://web.dev/adaptive-serving-based-on-network-quality/`,
  },
];

const articleTemplate = ({ _id, title, desc, url }) => `
  <article id="post-${_id}" class="card-wrapper">
    <div>
      <div class="img-card-wrapper">
        <img loading="lazy" src="./assets/img/story/pic-${_id}.webp" width="100%" height="100%" alt="story banner ${_id}">
      </div>
      <div class="content-card-wrapper">
        <a href="${url}">
          <h2>${title}</h2>
        </a>
        <p class="ellipsis">
          ${desc}
        </p>
        <a href="${url}" class="readmore" rel="noopener noreferrer">Baca lebih lanjut di <i>web.dev</i> -></a>
      </div>
    </div>
  </article>
`;

const cardsWrapper = document.getElementById("cards-wrapper");

storiesItem.forEach((story) =>
  cardsWrapper.insertAdjacentHTML("beforeend", articleTemplate(story)),
);

document.getElementById('copyright-year').innerText = new Date().getFullYear();