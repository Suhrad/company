@echo off
echo ===================================================
echo Starting Stocky Platform (Quick Start)...
echo ===================================================

:: Step 1: Verify PHP Composer dependencies are set up
echo [1/3] Checking PHP dependencies...
php composer.phar install --ignore-platform-reqs
if %ERRORLEVEL% NEQ 0 (
    echo Error: PHP configuration is incorrect.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 2: Run Database Setup & Key Generation (if needed)
echo [2/3] Setting up environment and database...
php artisan key:generate
php artisan migrate --force
if %ERRORLEVEL% NEQ 0 (
    echo Error: Database setup failed.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 3: Start Server and Open Webpage
echo [3/3] Launching local server at http://127.0.0.1:8000...
start "" "http://127.0.0.1:8000"
php artisan serve
