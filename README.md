
# Excel BOP

Aplikasi Sederhana sebagai solusi untuk pendataan buku, dimana saat ini pendataan buku masih memanfaatkan excel sebagai alatnya, dan karena hal ini, data yang diakses tergolong tidak konsisten, harus dicari secara manual, bahkan kesulitan untuk filter data. Aplikasi ini dibuat agar seluruh data tersentralisasi.
## Tech Stack (MEVN)

**Client:** Vue, AntDesign

**Server:** Node, Express, Mongoose(Used MongoDB)


## Documentation

- [Vue 2](https://v2.vuejs.org/v2/guide/)
- [AntDesign](https://1x.antdv.com/docs/vue/introduce/)
- [Vue XLSX](https://vue-xlsx.netlify.app/guide/#installation)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

## Features

- Simple CRUD
- Import Excel
- Advanced Search and Filter Data


## Installation

Projek ini menggunakan stack MEVN, jadi anda harus menginstal mevn-cli terlebih dahulu.

```bash
  // Abaikan kalau sudah menginstal mevn-cli
  npm install -g mevn-cli
``` 


Clone the project

```bash
  git clone git@github.com:hannnkusa/excel-bop.git
```

Go to the project directory

```bash
  cd excel-bop
```

Pada mevn serve anda diberikan 2 pilihan untuk melakukan serve terhadap client atau server. Jadi, pada tahap ini, anda harus membuka 2 cmd sekaligus untuk melakukan serve pada client dan server. 

```bash
  mevn serve
```

Lalu dimana npm install nya? saat melakukan mevn serve, mevn akan melakukan npm install sebelum melakukan serve pada client/server. (Perlu diingat, bahwa hal ini berlaku sekali di saat pertama kali dijalankan)

Jika ingin menambahkan package sendiri, maka bisa langsung ke directory client/server untuk menambahkan package yang diinginkan.