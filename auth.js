<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Заметки ЛСПК | Авторизация</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Общие стили для страницы авторизации */
        .auth-page {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            padding: 20px;
        }
        
        .auth-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 500px;
            padding: 30px;
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .auth-header h2 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .auth-tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .auth-tabs button {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        .auth-tabs button.active {
            border-bottom: 2px solid #4a6bff;
            color: #4a6bff;
            font-weight: 600;
        }
        
        .auth-form {
            display: none;
        }
        
        .auth-form.active {
            display: block;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: border 0.3s;
        }
        
        .form-group input:focus {
            border-color: #4a6bff;
            outline: none;
        }
        
        .btn-primary {
            width: 100%;
            padding: 12px;
            background-color: #4a6bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .btn-primary:hover {
            background-color: #3a5bef;
        }
        
        .auth-footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }
        
        .auth-footer a {
            color: #4a6bff;
            text-decoration: none;
        }
        
        @media (max-width: 768px) {
            .auth-container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Шапка -->
        <header class="app-header">
            <div class="logo-container">
                <img src="file:///E:/флешка%20(аня)/И3Б/ПП/продукт%20переделанный/ЛОГО.png" alt="Логотип Заметки ЛСПК" class="logo">
                <h1>Заметки ЛСПК</h1>
            </div>
            <nav class="main-nav">
                <a href="index.html">Главная</a>
                <a href="about.html">Мои заметки</a>
                <button id="auth-btn" class="btn-primary">Войти</button>
            </nav>
        </header>

        <!-- Основное содержимое - страница авторизации -->
        <main class="app-main auth-page">
            <div class="auth-container">
                <div class="auth-header">
                    <h2>Добро пожаловать</h2>
                    <p>Войдите в свою учетную запись или зарегистрируйтесь</p>
                </div>
                
                <div class="auth-tabs">
                    <button class="tab-btn active" data-tab="login">Вход</button>
                    <button class="tab-btn" data-tab="register">Регистрация</button>
                </div>
                
                <form id="login-form" class="auth-form active">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" placeholder="Введите ваш email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Пароль</label>
                        <input type="password" id="login-password" placeholder="Введите ваш пароль" required>
                    </div>
                    <button type="submit" class="btn-primary">Войти</button>
                    <div class="auth-footer">
                        <a href="#" class="forgot-password">Забыли пароль?</a>
                    </div>
                </form>
                
                <form id="register-form" class="auth-form">
                    <div class="form-group">
                        <label for="register-name">Имя</label>
                        <input type="text" id="register-name" placeholder="Введите ваше имя" required>
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" placeholder="Введите ваш email" required>
                    </div>
                    <div class="form-group">
                        <label for="register-password">Пароль</label>
                        <input type="password" id="register-password" placeholder="Придумайте пароль" required>
                    </div>
                    <div class="form-group">
                        <label for="register-confirm">Подтвердите пароль</label>
                        <input type="password" id="register-confirm" placeholder="Повторите пароль" required>
                    </div>
                    <button type="submit" class="btn-primary">Зарегистрироваться</button>
                </form>
            </div>
        </main>

        <!-- Подвал -->
        <footer class="app-footer">
            <p>&copy; 2025 Заметки ЛСПК. Все права защищены.</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-vk"></i></a>
                <a href="#"><i class="fab fa-telegram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        </footer>
    </div>

    <script>
        // Скрипт для переключения между вкладками входа и регистрации
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const authForms = document.querySelectorAll('.auth-form');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Удаляем активный класс у всех кнопок и форм
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    authForms.forEach(form => form.classList.remove('active'));
                    
                    // Добавляем активный класс текущей кнопке и соответствующей форме
                    this.classList.add('active');
                    const tabName = this.getAttribute('data-tab');
                    document.getElementById(`${tabName}-form`).classList.add('active');
                });
            });
            
            // Обработчики форм
            document.getElementById('login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                // Здесь будет логика входа
                alert('Форма входа отправлена');
            });
            
            document.getElementById('register-form').addEventListener('submit', function(e) {
                e.preventDefault();
                // Здесь будет логика регистрации
                alert('Форма регистрации отправлена');
            });
        });
    </script>
</body>
</html>