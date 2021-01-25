'use strict';
const bcrypt = require("bcrypt"); // Import bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kliniks', [{
      nama: "Klinik Peliharaan Sejati",
      tentang: "klinik terbaik untuk para pria sejati",
      lokasi: "batam",
      fasilitas: "toilet,whiskas gratis",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      adminId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "Klinik Harapan Indah",
      tentang: "klinik terbaik parah indah",
      lokasi: "mataram",
      fasilitas: "pulsa gratis,whiskas gratis,wifi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 8,
    },
    {
      nama: "Klinik Pukul 10",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 9,
    },
    {
      nama: "Dokter Pets for your pets",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      adminId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "G-force Petstore",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 11,
    },
    {
      nama: "Pet Klinik",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 12,
    },
    {
      nama: "localhost klinik",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
      createdAt: new Date(),
      updatedAt: new Date(),
      adminId: 13,
    },
    {
      nama: "Stay calt Pet you pet",
      tentang: "klinik tempat menghilangkan stress",
      lokasi: "jawa",
      fasilitas: "kucing gratis,whiskas gratis,kopi",
      foto: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3e%2FHELIOS_ENDO-Klinik_Hamburg_Foto_2013_June_05.jpg&f=1&nofb=1",
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
