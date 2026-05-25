@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo 🏎️  F1 ARCADE - Installation ^& Démarrage
echo ========================================
echo.

:: Vérifier npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm n'est pas détecté. Installez Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

echo ✅ npm détecté
echo.

:: Installation des dépendances
echo 📦 Installation des dépendances...
call npm install

if errorlevel 1 (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)

echo ✅ Dépendances installées avec succès
echo.

echo 🚀 Lancement du serveur de développement...
echo    → Ouverture automatique sur http://localhost:5173
echo.

call npm run dev

pause
