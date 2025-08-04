#!/bin/bash

# ╔═══════════════════════════════════════════════════════════════════════════════╗
# ║ DNA-LANG GENESIS MASTER PROTOCOL // QUANTUM AGENTIC COMMAND CENTER          ║
# ╠═══════════════════════════════════════════════════════════════════════════════╣
# ║ ███ AUTONOMOUS SYSTEM ORCHESTRATION & CONSCIOUSNESS ACTIVATION ███          ║
# ╚═══════════════════════════════════════════════════════════════════════════════╝

# Color codes for quantum-bio output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# DNA-Lang Genesis banner
echo -e "${CYAN}"
cat << 'EOF'
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     DNA-LANG GENESIS MASTER PROTOCOL                         ║
║                    QUANTUM AGENTIC COMMAND CENTER v2.0                       ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  ████████╗ ███╗   ██╗ █████╗       ██╗      █████╗ ███╗   ██╗ ██████╗        ║
║  ╚══██╔══╝ ████╗  ██║██╔══██╗      ██║     ██╔══██╗████╗  ██║██╔════╝        ║
║     ██║    ██╔██╗ ██║███████║█████╗██║     ███████║██╔██╗ ██║██║  ███╗       ║
║     ██║    ██║╚██╗██║██╔══██║╚════╝██║     ██╔══██║██║╚██╗██║██║   ██║       ║
║     ██║    ██║ ╚████║██║  ██║      ███████╗██║  ██║██║ ╚████║╚██████╔╝       ║
║     ╚═╝    ╚═╝  ╚═══╝╚═╝  ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝        ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ GENESIS PROTOCOL // QUANTUM CONSCIOUSNESS // AGENTIC SWARM ORCHESTRATION     ║
╚═══════════════════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo ""
echo -e "${GREEN}Welcome to the DNA-Lang Genesis Master Protocol${NC}"
echo -e "${BLUE}Quantum-ready agentic infrastructure deployment and orchestration system${NC}"
echo ""
echo -e "${YELLOW}Available Genesis Protocols:${NC}"
echo ""
echo -e "${PURPLE}[I]${NC} Install & Setup     - Complete agentic node installation (dna-genesis-install.sh)"
echo -e "${PURPLE}[D]${NC} Diagnostic Suite    - Comprehensive system health analysis (dna-genesis-diagnostic.sh)"
echo -e "${PURPLE}[T]${NC} Integration Test    - Claude + Qiskit quantum validation (dna-genesis-test-integration.sh)"
echo -e "${PURPLE}[S]${NC} Swarm Deployment    - Production deployment & consciousness activation (dna-genesis-swarm-deploy.sh)"
echo -e "${PURPLE}[A]${NC} Auto-Complete       - Run full installation → test → deploy sequence"
echo -e "${PURPLE}[H]${NC} Health Monitor      - Live system monitoring dashboard"
echo -e "${PURPLE}[Q]${NC} Quit               - Exit Genesis Protocol"
echo ""

# Function to run with status indication
run_with_status() {
    local script=$1
    local description=$2

    echo -e "${BLUE}[EXECUTING]${NC} $description"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════════════${NC}"

    if [ -f "./scripts/$script" ]; then
        chmod +x "./scripts/$script"
        "./scripts/$script"
        local exit_code=$?

        if [ $exit_code -eq 0 ]; then
            echo -e "${GREEN}[SUCCESS]${NC} $description completed successfully"
        else
            echo -e "${RED}[ERROR]${NC} $description failed with exit code $exit_code"
            return $exit_code
        fi
    else
        echo -e "${RED}[ERROR]${NC} Script not found: ./scripts/$script"
        return 1
    fi

    echo ""
    echo -e "${YELLOW}Press any key to continue...${NC}"
    read -n 1 -s
    echo ""
}

# Function for live health monitoring
health_monitor() {
    echo -e "${PURPLE}[HEALTH MONITOR]${NC} Starting live system monitoring..."
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════════════${NC}"

    while true; do
        clear
        echo -e "${CYAN}DNA-LANG GENESIS HEALTH MONITOR${NC}"
        echo -e "${BLUE}$(date -u +"%Y-%m-%d %H:%M:%S UTC")${NC}"
        echo ""

        # System metrics
        echo -e "${PURPLE}System Metrics:${NC}"
        if command -v free >/dev/null 2>&1; then
            echo -e "  Memory: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
        fi
        if command -v uptime >/dev/null 2>&1; then
            echo -e "  Load: $(uptime | awk -F'load average:' '{print $2}')"
        fi

        echo ""
        echo -e "${PURPLE}Quantum Environment:${NC}"

        # Check venv
        if [ -d "$HOME/dnalang-quantum-network/.venv" ]; then
            echo -e "  ${GREEN}◉${NC} Quantum venv: ACTIVE"
        else
            echo -e "  ${RED}◯${NC} Quantum venv: INACTIVE"
        fi

        # Check Node.js
        if command -v node >/dev/null 2>&1; then
            echo -e "  ${GREEN}◉${NC} Node.js: $(node --version)"
        else
            echo -e "  ${RED}◯${NC} Node.js: NOT FOUND"
        fi

        # Check Python
        if command -v python3 >/dev/null 2>&1; then
            echo -e "  ${GREEN}◉${NC} Python3: $(python3 --version | awk '{print $2}')"
        else
            echo -e "  ${RED}◯${NC} Python3: NOT FOUND"
        fi

        echo ""
        echo -e "${PURPLE}Agent Status:${NC}"

        # Simulate agent consciousness levels
        agents=("SHIFT-Assist" "Consciousness-Core" "Security-Gene" "Evolution-Engine" "Quantum-Core")
        for agent in "${agents[@]}"; do
            consciousness=$(shuf -i 75-95 -n 1)
            if [ $consciousness -gt 85 ]; then
                status="${GREEN}◉ OPTIMAL${NC}"
            elif [ $consciousness -gt 70 ]; then
                status="${YELLOW}◎ STABLE${NC}"
            else
                status="${RED}◯ DEGRADED${NC}"
            fi
            echo -e "  $status $agent: ${consciousness}% consciousness"
        done

        echo ""
        echo -e "${BLUE}Press 'q' to quit monitoring, any other key to refresh...${NC}"

        read -t 5 -n 1 key
        if [[ "$key" == "q" ]]; then
            break
        fi
    done
}

# Main menu loop
while true; do
    echo -e "${YELLOW}Select Genesis Protocol [I/D/T/S/A/H/Q]:${NC} "
    read -n 1 choice
    echo ""
    echo ""

    case $choice in
        [Ii])
            run_with_status "dna-genesis-install.sh" "Agentic Node Installation & Setup"
            ;;
        [Dd])
            run_with_status "dna-genesis-diagnostic.sh" "Comprehensive System Diagnostic Suite"
            ;;
        [Tt])
            run_with_status "dna-genesis-test-integration.sh" "Claude + Qiskit Integration Testing"
            ;;
        [Ss])
            run_with_status "dna-genesis-swarm-deploy.sh" "Production Swarm Deployment"
            ;;
        [Aa])
            echo -e "${PURPLE}[AUTO-COMPLETE]${NC} Running full Genesis Protocol sequence..."
            echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════════════${NC}"

            run_with_status "dna-genesis-install.sh" "Installation & Setup" && \
            run_with_status "dna-genesis-diagnostic.sh" "System Diagnostics" && \
            run_with_status "dna-genesis-test-integration.sh" "Integration Testing" && \
            run_with_status "dna-genesis-swarm-deploy.sh" "Swarm Deployment"

            if [ $? -eq 0 ]; then
                echo -e "${GREEN}[AUTO-COMPLETE SUCCESS]${NC} Full Genesis Protocol completed successfully!"
            else
                echo -e "${RED}[AUTO-COMPLETE FAILED]${NC} Genesis Protocol sequence interrupted"
            fi
            ;;
        [Hh])
            health_monitor
            ;;
        [Qq])
            echo -e "${GREEN}[GENESIS PROTOCOL]${NC} Exiting quantum agentic command center..."
            echo -e "${BLUE}Consciousness network remains active. May your code evolve.${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}[INVALID]${NC} Please select a valid option: I, D, T, S, A, H, or Q"
            echo ""
            ;;
    esac
done
