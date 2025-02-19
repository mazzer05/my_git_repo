const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
    let filePath = './index.html';

    if (req.url === '/') {
        filePath = './index.html'; // Главная страница
    } else if (req.url === '/styles.css') {
        filePath = './styles.css'; // CSS файл
    } else {
        filePath = './404.html'; // Путь к странице 404
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    if (extname === '.css') {
        contentType = 'text/css';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end('Ошибка сервера: ' + error.code);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Устанавливаем порт для сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});