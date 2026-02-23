if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker registered!'))
      .catch(err => console.log('Service Worker failed', err));
  });
}
// main.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// مسار قاعدة البيانات
const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath);

// إنشاء جدول إذا لم يكن موجود
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      amount REAL
    )
  `);

  // إضافة بيانات
  db.run(`INSERT INTO users (name, amount) VALUES (?, ?)`, ['محمد', 100], function(err) {
    if (err) return console.error(err.message);
    console.log(`تم إضافة المستخدم بالـ ID: ${this.lastID}`);
  });

  // قراءة البيانات
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) throw err;
    console.log('البيانات الحالية في قاعدة البيانات:');
    console.log(rows);
  });
});



