'use strict';
const bcrypt = require("bcrypt"); // Import bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kliniks', [{
      nama: "Klinik Peliharaan Sejati",
      tentang: "klinik terbaik untuk para pria sejati",
      lokasi: "Bandung",
      fasilitas: "toilet,whiskas gratis",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      adminId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "RUMAH SAKIT HEWAN JAWA BARAT",
      tentang: "Rumah Sakit Khusus Hewan Terbesar di Daerah Jawa Barat",
      lokasi: "Bandung",
      fasilitas: "Makanan Hewan, Animal Toys, Grooming, Sterilisasi",
      foto: "https://jabarprov.go.id/assets/images/galeri/843_DSC_2927.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 8,
    },
    {
      nama: "RSH Prof. Soeparwi",
      tentang: "We Care, We Cure -- Rumah Sakit Hewan Prof. Soeparwi terletak di Kampus UGM, Yogyakarta, Indonesia & berkomitmen untuk memberikan pelayanan kesehatan terbaik kepada hewan kesayangan Anda.",
      lokasi: "Jogja",
      fasilitas: "Pemeriksaan, Rawat inap & penitipan sehat, Penelitian, Grooming, Vaksinasi, Laboratorium X-ray & USG, Ambulance antar-jemput",
      foto: "https://lh3.googleusercontent.com/p/AF1QipPPISMN-LC96rHNKM98ZCv1tERFSbIUgzcx0F8l=s1600-w1000",      
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 9,
    },
    {
      nama: "RSH RAGUNAN",
      tentang: "Rumah Sakit hewan terbaik yang lengkap untuk hewan peliharaan anda",
      lokasi: "Jakarta",
      fasilitas: "general checkup, surgery, daycare, lab checking, ugd, vaksin, apotek, kremasi",
      foto: "http://www.rumahsakithewanjakarta.com/img/aboutus/660939871.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 10,
    },
    {
      nama: "Klinik Hewan Waras Satwa",
      tentang: "Pemeriksaan kesehatan Pemeriksaan lab Ultrasonografi Pemeriksaan darah Vaksinasi Perawatan intensif Rawat inap",
      lokasi: "Surabaya",
      fasilitas: "Layanan kesehatan hewan, makanan hewan",
      foto: "https://lh3.googleusercontent.com/K1Cz3io9S6i8Ak0rJC1Tk0uzzUfzeaYa1UrpNn2GO_GEl2xbcNgLh1MrcRIW07fR99lCDZloHA=w1080-h608-p-no-v0",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 11,
    },
    {
      nama: "Klinik Hewan Jogja",
      tentang: "Pemeriksaan monitoring kesehatan hewan yang menyediakan pelayanan untuk pemeriksaan klinis rutin dan general check up",
      lokasi: "Jogja",
      fasilitas: "Fasilitas Ruang dan Fasilitas Medis",
      foto: "https://klinikhewanjogja.com/main/wp-content/uploads/2014/03/IMG_9733-980x445.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 12,
    },
      
    {
      nama: "Rumah Sakit Hewan Dinas Peternakan Jawa Timur",
      tentang: "Rumah sakit ini buka setiap Senin hingga Sabtu. Buka mulai pukul 07.30 hingga 17.00. Kecuali hari Jum at dan Sabtu. Khusus hari Jum at pelayanan hingga pukul 14.30. Sedangkan untuk hari Sabtu hanya sampai pukul 12.00.",
      lokasi: "Surabaya",
      fasilitas: "pemeriksaan hewan,grooming, penitipan hewan, pet shop",
      foto: "https://steemitimages.com/p/vM1pGHgNcyCXUWJECrZbvn1NMPj1oFGUo3gYfF3NNPRD9VFdGKMsE3s4rh9zSN6oLgsmxavZ7huWjjyyi5A1YWJdhv4avadQS9JRZh8ZXGSk6TNjPhUNaKzq7BX9UgbG1SLYKCz?format=match&mode=fit&width=640",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 13,
    },
    {
      nama: "RS Hewan Setail Surabaya",
      tentang: "Dengan peralatan yang memadai dan tenaga medis yang berpengalaman, tarif layanan perawatan hewan kesayangan di tempat milik Pemprov Jatim ini juga terjangkau.",
      lokasi: "Surabaya",
      fasilitas: "pemeriksaan hewan, vaksin",
      foto: "https://jatimnow.com/po-content/uploads/2383886__lj3KuGzlNCSVxn-VffIHdfIgvQaR7bAlRqyZJPeCm4.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 14,
    },
    ])

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
