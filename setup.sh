#!/bin/bash

set -e

echo "🎬 URL to Video MCP + Skill Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo "✓ Docker $(docker --version | cut -d ' ' -f 3)"
echo ""

# Setup MCP server
echo "📦 Setting up MCP server..."
cd mcp-server
cp .env.example .env
echo "⚠️  Please edit mcp-server/.env with your API keys"
npm install
npm run build
cd ..
echo "✓ MCP server ready"
echo ""

# Setup Remotion project
echo "🎥 Setting up Remotion project..."
cd remotion-project
npm install
cd ..
echo "✓ Remotion project ready"
echo ""

# Start Brand Identity Extractor
echo "🐳 Starting Brand Identity Extractor..."
docker-compose up -d
echo "✓ Brand Identity Extractor running on http://localhost:8000"
echo ""

# Install skill
echo "📚 Installing skill..."
if command -v npx &> /dev/null; then
    npx skills add ./skill
    echo "✓ Skill installed"
else
    echo "⚠️  Could not install skill automatically."
    echo "   Run: npx skills add ./skill"
fi
echo ""

echo "=================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit mcp-server/.env with your API keys:"
echo "   - TABSTACK_API_KEY"
echo "   - MINIMAX_API_KEY"
echo "   - MINIMAX_GROUP_ID"
echo ""
echo "2. Test the MCP server:"
echo "   cd mcp-server && npm start"
echo ""
echo "3. Preview Remotion templates:"
echo "   cd remotion-project && npm run dev"
echo ""
echo "4. Use with Claude Code:"
echo "   claude"
echo "   Then try: \"Turn https://example.com into a video\""
echo ""
echo "🎬 Happy video making!"
