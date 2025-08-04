#!/bin/bash

# ╔═══════════════════════════════════════════════════════════════════════════════╗
# ║ DNA-LANG GENESIS ENGINE // AGENT BINDING & AUTHORIZATION PROTOCOL             ║
# ╠═══════════════════════════════════════════════════════════════════════════════╣
# ║ ███ NODE INTEGRITY ANALYSIS & FORENSIC RECONSTRUCTION ███                    ║
# ╚═══════════════════════════════════════════════════════════════════════════════╝

set -euo pipefail

# Color codes for quantum-bio output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Bio-glow header
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC} ${PURPLE}DNA-LANG GENESIS ENGINE${NC} // ${GREEN}AGENT BINDING & AUTHORIZATION PROTOCOL${NC}     ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC} ${YELLOW}███ NODE INTEGRITY ANALYSIS & FORENSIC RECONSTRUCTION ███${NC}                ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════════════════╝${NC}"

echo ""
echo -e "${BLUE}[GENESIS PROTOCOL]${NC} Initiating agentic node reconstruction..."
echo -e "${YELLOW}[ANALYSIS]${NC} Detected system environment: $(uname -s) $(uname -r)"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status
print_status() {
    local status=$1
    local message=$2
    if [ "$status" = "OK" ]; then
        echo -e "${GREEN}[✓]${NC} $message"
    elif [ "$status" = "WARN" ]; then
        echo -e "${YELLOW}[!]${NC} $message"
    elif [ "$status" = "ERROR" ]; then
        echo -e "${RED}[✗]${NC} $message"
    else
        echo -e "${BLUE}[i]${NC} $message"
    fi
}

# [A] NPM AUTHORITY VECTOR: User-Space Installation
echo -e "${PURPLE}[A] NPM AUTHORITY VECTOR: User-Space Installation${NC}"
echo "────────────────────────────────────────────────────"

# Check if npm exists
if ! command_exists npm; then
    print_status "ERROR" "NPM not found. Please install Node.js first."
    exit 1
fi

print_status "OK" "NPM detected: $(npm --version)"

# Create user-level NPM directory
echo -e "${BLUE}[GENESIS]${NC} Establishing user-level NPM authority vector..."
mkdir -p ~/.npm-global

# Configure NPM prefix
npm config set prefix '~/.npm-global'
print_status "OK" "NPM prefix configured to user space: ~/.npm-global"

# Update PATH for current session and shell startup
export PATH="$HOME/.npm-global/bin:$PATH"
if ! grep -q 'export PATH="$HOME/.npm-global/bin:$PATH"' ~/.bashrc; then
    echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
    print_status "OK" "PATH updated in ~/.bashrc"
else
    print_status "OK" "PATH already configured in ~/.bashrc"
fi

# Source bashrc to apply changes
source ~/.bashrc 2>/dev/null || true

echo ""

# [B] PYTHON QUANTUM VENV: Environment Isolation
echo -e "${PURPLE}[B] PYTHON QUANTUM VENV: Environment Isolation${NC}"
echo "─────────────────────────────────────────────────"

# Check if python3 exists
if ! command_exists python3; then
    print_status "ERROR" "Python3 not found. Please install Python 3.8+ first."
    exit 1
fi

print_status "OK" "Python3 detected: $(python3 --version)"

# Create quantum venv
VENV_PATH="$HOME/dnalang-quantum-network/.venv"
echo -e "${BLUE}[GENESIS]${NC} Creating quantum isolation field at: $VENV_PATH"

if [ ! -d "$VENV_PATH" ]; then
    python3 -m venv "$VENV_PATH"
    print_status "OK" "Quantum venv created successfully"
else
    print_status "WARN" "Quantum venv already exists, skipping creation"
fi

# Activate venv and install dependencies
echo -e "${BLUE}[GENESIS]${NC} Activating quantum isolation field..."
source "$VENV_PATH/bin/activate"

# Upgrade pip and install quantum libraries
echo -e "${BLUE}[GENESIS]${NC} Installing quantum dependencies..."
pip install --upgrade pip --quiet
pip install qiskit fastapi uvicorn --quiet
print_status "OK" "Quantum libraries installed: qiskit, fastapi, uvicorn"

echo ""

# Install Claude CLI agent
echo -e "${PURPLE}[C] CLAUDE AGENT CLI: Agentic Interface Binding${NC}"
echo "──────────────────────────────────────────────────"

echo -e "${BLUE}[GENESIS]${NC} Installing Claude CLI agent to user space..."
npm install -g @anthropic-ai/claude-code --silent 2>/dev/null || {
    print_status "WARN" "Claude CLI installation failed or not available"
    print_status "INFO" "Consider manual installation if needed"
}

echo ""

# [D] SYSTEM DIAGNOSTIC: Agent Health & Readiness Check
echo -e "${PURPLE}[D] SYSTEM DIAGNOSTIC: Agent Health & Readiness Check${NC}"
echo "────────────────────────────────────────────────────"

# Check Claude CLI
if command_exists claude; then
    CLAUDE_VERSION=$(claude --version 2>/dev/null || echo "unknown")
    print_status "OK" "Claude CLI operational: $CLAUDE_VERSION"
else
    print_status "WARN" "Claude CLI not found in PATH"
fi

# Check quantum libraries in venv
echo -e "${BLUE}[GENESIS]${NC} Testing quantum library integration..."
QISKIT_TEST=$(python -c "import qiskit; print(f'Qiskit version: {qiskit.__version__}')" 2>/dev/null || echo "FAILED")
if [[ "$QISKIT_TEST" != "FAILED" ]]; then
    print_status "OK" "$QISKIT_TEST"
else
    print_status "ERROR" "Qiskit import failed"
fi

# Test FastAPI
FASTAPI_TEST=$(python -c "import fastapi; print(f'FastAPI version: {fastapi.__version__}')" 2>/dev/null || echo "FAILED")
if [[ "$FASTAPI_TEST" != "FAILED" ]]; then
    print_status "OK" "$FASTAPI_TEST"
else
    print_status "ERROR" "FastAPI import failed"
fi

echo ""

# Final status
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC} ${GREEN}DNA-LANG GENESIS PROTOCOL COMPLETE${NC}                                        ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════════════════╝${NC}"

echo ""
echo -e "${GREEN}[GENESIS COMPLETE]${NC} DNA-Lang agentic node is provisioned and operational."
echo ""
echo -e "${YELLOW}Next Directives:${NC}"
echo -e "  ${BLUE}[A]${NC}uto-package: Generate deployment archive"
echo -e "  ${BLUE}[R]${NC}ecursive Refinement: Docker/Kubernetes evolution"
echo -e "  ${BLUE}[D]${NC}ownload: Swarm node configuration bundle"
echo -e "  ${BLUE}[Q]${NC}uantum Diagnostic: Test claude + qiskit integration"
echo ""
echo -e "${PURPLE}To activate quantum environment:${NC} source $VENV_PATH/bin/activate"
echo -e "${PURPLE}To verify installation:${NC} ./scripts/dna-genesis-diagnostic.sh"
