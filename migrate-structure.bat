@echo off
REM Migration script - Reorganize F1 ARCADE project structure
REM This script moves files from root to src/ subdirectories

echo =====================================
echo F1 ARCADE - Project Reorganization
echo =====================================
echo.

REM Create directories
echo Creating directory structure...
if not exist "src\components" mkdir src\components
if not exist "src\hooks" mkdir src\hooks
if not exist "src\utils" mkdir src\utils
if not exist "src\styles" mkdir src\styles
if not exist "public" mkdir public
if not exist "docs" mkdir docs

echo ✓ Directories created

REM Move components
echo.
echo Moving components...
move src-components-App.jsx src\components\App.jsx
move src-components-ReactionGame.jsx src\components\ReactionGame.jsx
move src-components-TyreGame.jsx src\components\TyreGame.jsx
echo ✓ Components moved

REM Move hooks
echo.
echo Moving hooks...
move src-hooks-useReactionTimer.js src\hooks\useReactionTimer.js
move src-hooks-useF1Audio.js src\hooks\useF1Audio.js
echo ✓ Hooks moved

REM Move utils
echo.
echo Moving utils...
move src-utils-constants.js src\utils\constants.js
move src-utils-game-rules.js src\utils\game-rules.js
echo ✓ Utils moved

REM Move styles
echo.
echo Moving styles...
move src-styles-index.css src\styles\index.css
echo ✓ Styles moved

REM Move main.jsx
echo.
echo Moving main entry point...
move src-main.jsx src\main.jsx
echo ✓ Main.jsx moved

REM Move documentation to docs folder
echo.
echo Moving documentation...
if exist README.md move README.md docs\README.md
if exist ARCHITECTURE.md move ARCHITECTURE.md docs\ARCHITECTURE.md
if exist QUICKSTART.md move QUICKSTART.md docs\QUICKSTART.md
if exist INDEX.md move INDEX.md docs\INDEX.md
if exist DEPLOYMENT.md move DEPLOYMENT.md docs\DEPLOYMENT.md
echo ✓ Documentation moved

REM Keep test-validation.js at root for easy access
REM Keep constants.js and game-rules.js at root for reference

echo.
echo =====================================
echo ✓ MIGRATION COMPLETE!
echo =====================================
echo.
echo New structure:
echo fun-f1/
echo ├── src/
echo │   ├── components/
echo │   ├── hooks/
echo │   ├── utils/
echo │   ├── styles/
echo │   └── main.jsx
echo ├── public/
echo ├── docs/
echo └── config files...
echo.
echo Next steps:
echo 1. npm install
echo 2. npm run dev
echo.
pause
