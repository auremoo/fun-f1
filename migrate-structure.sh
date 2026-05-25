#!/bin/bash

# Migration script - Reorganize F1 ARCADE project structure
# This script moves files from root to src/ subdirectories

echo "====================================="
echo "F1 ARCADE - Project Reorganization"
echo "====================================="
echo ""

# Create directories
echo "Creating directory structure..."
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/styles
mkdir -p public
mkdir -p docs

echo "✓ Directories created"

# Move components
echo ""
echo "Moving components..."
mv src-components-App.jsx src/components/App.jsx 2>/dev/null
mv src-components-ReactionGame.jsx src/components/ReactionGame.jsx 2>/dev/null
mv src-components-TyreGame.jsx src/components/TyreGame.jsx 2>/dev/null
echo "✓ Components moved"

# Move hooks
echo ""
echo "Moving hooks..."
mv src-hooks-useReactionTimer.js src/hooks/useReactionTimer.js 2>/dev/null
mv src-hooks-useF1Audio.js src/hooks/useF1Audio.js 2>/dev/null
echo "✓ Hooks moved"

# Move utils
echo ""
echo "Moving utils..."
mv src-utils-constants.js src/utils/constants.js 2>/dev/null
mv src-utils-game-rules.js src/utils/game-rules.js 2>/dev/null
echo "✓ Utils moved"

# Move styles
echo ""
echo "Moving styles..."
mv src-styles-index.css src/styles/index.css 2>/dev/null
echo "✓ Styles moved"

# Move main.jsx
echo ""
echo "Moving main entry point..."
mv src-main.jsx src/main.jsx 2>/dev/null
echo "✓ Main.jsx moved"

# Move documentation to docs folder
echo ""
echo "Moving documentation..."
[ -f README.md ] && mv README.md docs/README.md
[ -f ARCHITECTURE.md ] && mv ARCHITECTURE.md docs/ARCHITECTURE.md
[ -f QUICKSTART.md ] && mv QUICKSTART.md docs/QUICKSTART.md
[ -f INDEX.md ] && mv INDEX.md docs/INDEX.md
[ -f DEPLOYMENT.md ] && mv DEPLOYMENT.md docs/DEPLOYMENT.md
echo "✓ Documentation moved"

# Clean up old root files
echo ""
echo "Cleaning up old files..."
rm -f App.jsx ReactionGame.jsx TyreGame.jsx useF1Audio.js useReactionTimer.js
rm -f main.jsx index.css constants.js game-rules.js test-validation.js
echo "✓ Old files cleaned"

echo ""
echo "====================================="
echo "✓ MIGRATION COMPLETE!"
echo "====================================="
echo ""
echo "New structure:"
echo "fun-f1/"
echo "├── src/"
echo "│   ├── components/"
echo "│   ├── hooks/"
echo "│   ├── utils/"
echo "│   ├── styles/"
echo "│   └── main.jsx"
echo "├── public/"
echo "├── docs/"
echo "└── config files..."
echo ""
echo "Next steps:"
echo "1. npm install"
echo "2. npm run dev"
echo ""
