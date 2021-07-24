# Aplikasi Web Rakbuku (Shelfbook)


## Nama:
Rakbuku


## Akses melalui:
- Development: [di sini](https://60fbb156362bb589c4742fb6--rakbuku-dicoding.netlify.app/) (spesifik terhadap dokumen ini)
- Production: [di sini](https://rakbuku-dicoding.netlify.app/)


## Deskripsi:
Aplikasi berbasis web yang ditujukan untuk mengelola daftar buku bacaan. Aplikasi dibangun hanya menggunakan HTML, CSS, dan Javascript. Menggunakan *library Sweetalert2* untuk notifikasi dan pesan popup, tanpa *framework* dan *library* lainnya. Menggunakan **local storage* browser* sebagai basis data utama.


## Pra uji:
### A. Syarat minimum:
1. Perangkat:
   - Desktop:
     Menggunakan peramban Google Chrome 51++, Mozilla Firefox 54++, Safari 10++, Opera 38++, atau Microsoft Edge 15++.
   - Mobile/Tablet:
     Menggunakan peramban Chrome for Android 91++, Firefox for Andro 89++, Safari on iOS 10++, Opera Mobile 62++, Android Browser 91++, UC Browser for Andro 12.12++, atau Samsung Internet 5++.

     Disarankan untuk menggunakan Chrome atau Firefox, baik untuk desktop ataupun mobile/tablet.

2. Penyimpanan:
   - Seluruh data buku disimpan di dalam *local storage* yang terpasang pada setiap peramban. Jika fitur penyimpanan tidak berfungsi dengan baik, bisa dilakukan pengecekan pada peramban yang digunakan apakah fitur *local storage* dapat digunakan atau tidak. Bila masih tidak bisa dilakukan perbaikan, maka silakan gunakan peramban yang lain.

2. Konektivitas:
   - Menggunakan jaringan *3G* atau *UMTS*.
   - Disarankan untuk menggunakan jaringan *H+* atau *HSPA+* ke atas.

### B. Hal yang perlu diperhatikan:
- Kami tidak menyimpan data seperti alamat IP, lokasi, peramban atau gawai yang digunakan, dan hal sensitif lainnya ke dalam basis data kami ataupun tempat penyimpanan lainnya.
- Data yang kami simpan hanya berupa data buku. Spesifikasi data buku dijelaskan di bagian Fitur di bawah.
- Setiap data buku ditampilkan dalam satu data kartu (*card data*). Setiap data kartu berisi informasi dan aksi yang diperlukan untuk memodifikasi masing-masing data buku terkait.
- Setiap aksi yang diperlukan untuk memodifikasi data buku terdapat di dalam popup menu kecil yang muncul ketika *three dot symbol* (⋮) diklik/ditekan, selanjutnya disebut popup menu opsi.
- Popup menu opsi dapat diakses melalui klik/tekan *three dot symbol* (⋮), yang selanjutnya disebut tombol opsi, di sebelah kanan pada masing-masing data kartu.


## Istilah:
- Rakbuku
- Basis data
- Rak buku (kategori)
- Tombol opsi
- Popup menu opsi
- Data kartu
- *etc.*


## Fitur:
-  Setiap data buku memiliki
   - ID, berupa angka acak.
   - Judul Buku, berupa teks.
   - Nama Pengarang, berupa teks.
   - Tahun Terbit, berupa angka.
   - Kategori Buku, berupa benar (sudah selesai dibaca) atau salah (belum selesai atau belum dibaca).
-  Total data buku maksimal sebanyak 500 data buku ketika data di kedua kategori sudah digabungkan.
-  Tambah data buku baru, dengan mengisi data buku di atas.
-  Tandai buku untuk masuk ke dalam kategori benar (sudah selesai dibaca) dan juga sebaliknya.
-  Perbarui/ubah data buku yang sudah ada.
-  Hapus data buku dari daftar buku bacaan secara permanen.
-  *Undo* penghapusan data buku terakhir. Hanya data terakhir dan selama notifikasi untuk melakukan *undo* masih tampil.
-  Pencarian di masing-masing rak buku (kategori), pencarian bisa dilakukan untuk mencari Judul Buku, Nama Pengarang, atau Tahun Terbit di rak buku terkait.


## Proses tes:
### A. Skenario Tes:
1. Buka salah satu rak buku (kategori) dengan klik/tekan (*click/tap*).
2. Akan tampil kotak pencarian di bagian atas dan Daftar Buku yang masih kosong yang menampilkan teks "Masih kosong nih, yuk isi... 😎😎😎".
3. Bila sekarang fitur pencarian digunakan tidak akan terjadi apapun.
4. Tambah data dengan klik/tekan tombol lingkaran berwarna merah mudah yang terdapat ikon tambah (+) di pojok kanan bawah layar.
5. Isi seluruh (tiga) data yang diminta dan klik/tekan "Simpan" untuk menyimpan. Akan muncul notifikasi berhasil jika seluruh data diisi dengan benar. Jika ada satu data yang salah atau proses penyimpanan data ke basis data gagal, maka muncul notifikasi gagal.
6. Buku akan masuk ke rak "Belum selesai" yang secara *default* akan dianggap bahwa buku belum selesai/belum dibaca.
7. Setiap proses pada sub bagian di bawah diawali dengan klik/tekan tombol opsi di sebelah kanan pada setiap data kartu buku. Kemudian, akan muncul popup menu opsi di sebelah tombol opsi. Silakan lakukan seluruh proses di bawah tanpa perlu melakukannya sesuai urutan.
   1. Tandai buku sebagai sudah selesai atau tandai sebagai belum selesai. Kemudian, akan muncul notifikasi sukses dan data kartu buku tersebut dipindahkan ke rak buku (kategori) satunya.
   2. Perbarui/ubah data buku. Kemudian, akan muncul popup menu "Perbarui Data Buku", isi seluruh kolom yang diminta atau isi beberapa yang perlu untuk diubah, bila ada kolom yang diubah menjadi kosong, maka dianggap tidak terjadi perubahan pada kolom tersebut. Jika ada data yang tidak ingin diubah maka biarkan. Lalu, klik/tekan "Simpan" dan data kartu sudah diperbarui akan muncul notifikasi. Akan muncul notifikasi berhasil jika seluruh data diisi dengan benar.
   3. Hapus data buku. Kemudian, akan muncul popup konfirmasi "Yakin ingin menghapus buku ini?". Jika tombol "Batal" diklik/ditekan, maka popup konfirmasi akan tertutup dan tidak ada data yang diubah sama sekali. Jika tombol "Ya, hapus" diklik/ditekan, maka data buku terkait akan dihapus pada basis data dan kartu data juga akan hilang dari tampilan.
   4. Khusus untuk proses hapus data buku, terdapat fitur *undo* yang dapat digunakan untuk mengembalikan data terakhir yang dihapus. Jika tombol *undo* yang terdapat di notifikasi setelah proses hapus data diklik/ditekan, maka data di basis data dan di tampilan akan dikembalikan. Jika notifikasi sudah hilang atau halaman dimuat ulang (*refresh*), maka data akan terhapus secara permanen.
   5. Dalam seluruh proses di sub bagian ini, jika ada satu data yang salah atau proses penyimpanan data ke basis data gagal, maka muncul notifikasi gagal.
8. Lakukan pencarian menggunakan kotak pencarian yang dimiliki oleh masing-masing rak buku (kategori) yang berwarna putih dan terdapat ikon kaca pembesar di sebelah kanannya, kotak pencarian terdapat di bawah tombol untuk memilih rak buku (kategori). Jika data buku yang dicari ditemukan, maka data buku yang relevan dengan kata kunci pencarian akan ditampilkan dan buku lainnya akan dihilangkan dari tampilan. Jika data buku tidak satupun ditemukan, maka akan tampil teks "Buku ngga ada...😭😭😭". Batasan pencarian terdapat di bagian Fitur di atas.
9. Lakukan kembali proses pada tahap ketujuh dan tidak harus sesuai dengan urutannya. Bisa dilakukan berulang-ulang untuk meminimalisir kemungkinan *bug* dengan memaksimalkan jumlah uji coba.
10. Muat ulang (*refresh*) halaman untuk melihat semua perubahan apakah sudah benar-benar tersimpan di basis data atau belum. Jika tampilan sebelum dan sesudah halaman dimuat ulang tetap sama, maka selamat Anda telah berhasil mengikuti langkah-langkah dalam proses tes mikro ini.

Jika sampai Skenario Tes nomor 10 sudah terpenuhi dan tidak ada kendala atau masalah selama proses tes berlangsung, silakan untuk mencoba seluruh fitur secara acak di luar alur yang dijelaskan di atas. Jika terdapat kendala atau masalah silakan untuk menyempatkan dan menghubungi kontak yang terdapat di paling bawah dokumen ini atau dapat membuka situs pribadi milik penulis yang dapat dilihat di bagian paling bawah dari aplikasi web Rakbuku itu sendiri. Kami akan sangat senang untuk dapat mendengar dan membicarakan terkait aplikasi web Rakbuku.


## Hal Penting:
Edit#2:  
Per waktu dan tanggal 13:17 PM 7/24/2021, aplikasi web Rakbuku sudah masuk tahap produksi dan sejauh ini belum ditemukan kembali *bug* yang *fatal*. Secara visual dan fungsionalitas sudah disesuaikan untuk masing-masing gawai yang digunakan.


Edit#1:  
Per waktu dan tanggal 5:58 PM 7/23/2021, aplikasi web Rakbuku masih dalam tahap pengembangan dan belum dilakukan optimasi secara visual untuk digunakan di tablet maupun desktop. Namun, secara fitur dan fungsionalitas seharusnya tidak ada kendala baik di mobile/tablet/desktop.  

(untuk per waktu dan tanggal 11:41 PM 7/21/2021, aplikasi ini masih memiliki beberapa bug, target penyelesaian diperkirakan selesai pada 00:41 PM 7/24/2021)


## Pasca uji:
--


## Disclaimer:
Aplikasi web ini dibangun dengan tujuan sebagai tugas *submission* di salah satu *platform digital* untuk belajar pemrograman, Dicoding. Seluruh fitur terbatas hanya sesuai dengan ketentuan dan persyaratan dari pihak Dicoding yang tertera di modul *submission* pada kelas Belajar Membuat Front-End Web untuk Pemula. Terlepas dari fitur, di sisi *UI* dan *UX* seluruhnya dibuat senyaman mungkin layaknya *production level app*. Namun, terlepas itu semua kami sangat menerima saran dan masukan yang dapat menambah nilai dan manfaat terhadap aplikasi ini untuk digunakan lebih luas lagi dan mungkin masuk ke fase yang lebih serius kedepannya.


## Terima kasih

Terima kasih telah membaca dan mengikuti tahapan ini.

*Warm regards*,  
Dio Ilham Djatiadi, *(kinda) creator of Rakbuku*.


## Kontak:

[Website](https://dioilham.com)  
[E-mail](mailto:hai@dioilham.com?cc=projectwithdio@gmail.com&subject=Aplikasi%20Rakbuku)  
[Github](https://github.com/Milkywayrules)  
[LinkedIn](https://www.linkedin.com/in/dioilham)  
[Instagram](https://www.instagram.com/dioilham)  
