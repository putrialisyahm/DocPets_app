'use strict';
const bcrypt = require("bcrypt"); // Import bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pass = await bcrypt.hashSync("password", 10)
    return queryInterface.bulkInsert('Users', [{
      nama: "sastro wijoyo",
      gender: "female",
      email: "satu@gmail.com",
      telepon: "21123123",
      foto: "default.png",
      role: "user",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "aksfdjkdlsjfa",
      gender: "female",
      email: "dua@gmail.com",
      telepon: "123123",
      foto: "default.png",
      role: "dokter",
      waktuKerja: "21:00,23:00",
      pengalaman: "5",
      status: "active",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "mamake ksksk",
      gender: "male",
      email: "tiga@gmail.com",
      telepon: "123123",
      foto: "default.png",
      role: "dokter",
      waktuKerja: "21:00,23:00",
      pengalaman: "5",
      status: "active",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "admin",
      gender: "male",
      email: "admin@admin.com",
      telepon: "21123123",
      foto: "default.png",
      role: "klinik",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "admin",
      gender: "male",
      email: "admin1@admin.com",
      telepon: "21123123",
      foto: "default.png",
      role: "klinik",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "admin",
      gender: "male",
      email: "admin2@admin.com",
      telepon: "21123123",
      foto: "default.png",
      role: "klinik",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "admin",
      gender: "male",
      email: "admin3@admin.com",
      telepon: "21123123",
      foto: "default.png",
      role: "klinik",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
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
