@echo off
echo ===================================================
echo Starting Stocky Platform on Windows...
echo ===================================================

:: Step 1: Install PHP Dependencies (using the local composer.phar)
echo [1/5] Installing PHP dependencies via Composer...
php composer.phar install
if %ERRORLEVEL% NEQ 0 (
    echo Error: Composer install failed. Make sure PHP is installed and in your PATH.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 2: Install Node Dependencies
echo [2/5] Installing Node dependencies via NPM...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error: NPM install failed. Make sure Node.js is installed.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 3: Compile Frontend Assets
echo [3/5] Compiling frontend assets...
call npm run prod
if %ERRORLEVEL% NEQ 0 (
    echo Error: NPM production compilation failed.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 4: Setup Environment & Database
echo [4/5] Running migrations and generating key...
php artisan key:generate
php artisan migrate --force
if %ERRORLEVEL% NEQ 0 (
    echo Error: Migrations failed.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 5: Start Server and Open Webpage
echo [5/5] Launching local server at http://127.0.0.1:8000...
start "" "http://127.0.0.1:8000"
php artisan serve
