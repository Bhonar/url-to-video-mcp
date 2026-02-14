#!/bin/bash

set -e

echo "URL to Video MCP + Skill Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "Node.js $NODE_VERSION"
echo ""

# Setup MCP server
echo "Setting up MCP server..."
cd mcp-server
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created mcp-server/.env — please edit with your API keys"
fi
npm install
npm run build
cd ..
echo "MCP server ready"
echo ""

# Setup Remotion project
echo "Setting up Remotion project..."
cd remotion-project
npm install
cd ..
echo "Remotion project ready"
echo ""

# Create output directory
mkdir -p ~/Videos/url-to-video

echo "=================================="
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit mcp-server/.env with your API keys:"
echo "   - TABSTACK_API_KEY (https://tabstack.ai)"
echo "   - MINIMAX_API_KEY  (https://platform.minimax.chat)"
echo ""
echo "2. Add MCP server to your Claude Code config:"
echo "   claude mcp add url-to-video -- node $(pwd)/mcp-server/dist/server.js"
echo ""
echo "3. Install the skill:"
echo "   Copy skill/SKILL.md to .claude/skills/ or symlink it"
echo ""
echo "4. Use with Claude Code:"
echo "   claude"
echo "   Then try: \"Turn https://example.com into a video\""
echo ""
