module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'no-trailing-spaces': 'off', // Menonaktifkan peringatan tentang spasi ekstra pada akhir baris
    'indent': ['error', 2], // Menentukan indentasi 2 spasi
    'space-before-function-paren': 'off', // Menonaktifkan aturan spasi sebelum tanda kurung buka dalam deklarasi fungsi
  },
};
