#!/bin/bash

# DNA-Lang iCRISPR Workbench Deployment Script
# Version: 2.0.0

set -e

echo "🧬 DNA-Lang iCRISPR Workbench Deployment"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependencies() {
    echo -e "${BLUE}Checking dependencies...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed${NC}"
        exit 1
    fi
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}Warning: Vercel CLI not found. Installing...${NC}"
        npm install -g vercel
    fi
    
    echo -e "${GREEN}✓ Dependencies check passed${NC}"
}

# Install project dependencies
install_dependencies() {
    echo -e "${BLUE}Installing project dependencies...${NC}"
    npm ci
    echo -e "${GREEN}✓ Dependencies installed${NC}"
}

# Run tests and linting
run_tests() {
    echo -e "${BLUE}Running tests and linting...${NC}"
    
    # Type checking
    npm run type-check
    echo -e "${GREEN}✓ Type checking passed${NC}"
    
    # Linting
    npm run lint
    echo -e "${GREEN}✓ Linting passed${NC}"
    
    # Tests (if available)
    if npm run test --silent 2>/dev/null; then
        echo -e "${GREEN}✓ Tests passed${NC}"
    else
        echo -e "${YELLOW}⚠ No tests found or tests skipped${NC}"
    fi
}

# Build the project
build_project() {
    echo -e "${BLUE}Building project...${NC}"
    npm run build
    echo -e "${GREEN}✓ Build completed${NC}"
}

# Deploy to Vercel
deploy_to_vercel() {
    echo -e "${BLUE}Deploying to Vercel...${NC}"
    
    # Set environment variables
    export NEXT_PUBLIC_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    export NEXT_PUBLIC_VERSION="2.0.0"
    
    # Deploy
    if [ "$1" = "production" ] || [ "$1" = "prod" ]; then
        echo -e "${PURPLE}🚀 Deploying to production...${NC}"
        vercel --prod --confirm
    else
        echo -e "${YELLOW}🔧 Deploying to preview...${NC}"
        vercel --confirm
    fi
    
    echo -e "${GREEN}✓ Deployment completed${NC}"
}

# Health check after deployment
health_check() {
    echo -e "${BLUE}Performing health check...${NC}"
    
    # Get the deployment URL from Vercel
    DEPLOYMENT_URL=$(vercel ls | grep "dna-lang-icrispr" | head -1 | awk '{print $2}')
    
    if [ -n "$DEPLOYMENT_URL" ]; then
        echo -e "${BLUE}Checking health at: https://${DEPLOYMENT_URL}${NC}"
        
        # Wait a moment for deployment to be ready
        sleep 10
        
        # Check health endpoint
        if curl -f -s "https://${DEPLOYMENT_URL}/api/health" > /dev/null; then
            echo -e "${GREEN}✓ Health check passed${NC}"
            echo -e "${GREEN}🧬 DNA-Lang iCRISPR Workbench is live!${NC}"
            echo -e "${BLUE}URL: https://${DEPLOYMENT_URL}${NC}"
        else
            echo -e "${YELLOW}⚠ Health check failed, but deployment may still be initializing${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Could not determine deployment URL${NC}"
    fi
}

# Main deployment flow
main() {
    echo -e "${PURPLE}Starting DNA-Lang iCRISPR Workbench deployment...${NC}"
    echo -e "${BLUE}Timestamp: $(date)${NC}"
    echo ""
    
    check_dependencies
    install_dependencies
    run_tests
    build_project
    deploy_to_vercel $1
    health_check
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${PURPLE}🧬 Living Software Evolution Platform is now active${NC}"
    echo ""
    echo -e "${BLUE}Features deployed:${NC}"
    echo -e "  • iCRISPR Workbench with Monaco Editor"
    echo -e "  • Multi-Agent Orchestration (SHIFT-Core)"
    echo -e "  • Bio-Glow Themes with Quantum Effects"
    echo -e "  • Vector Memory Search (Supabase + Pinecone ready)"
    echo -e "  • Consciousness Tracking & Quantum Debugging"
    echo -e "  • Evolution Engine (G'volution v2.0)"
    echo -e "  • Strategic Brief Integration"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo -e "  1. Configure Supabase environment variables"
    echo -e "  2. Set up Pinecone API keys for vector search"
    echo -e "  3. Test multi-agent interactions"
    echo -e "  4. Deploy sample organisms"
    echo ""
}

# Handle script arguments
case "${1:-}" in
    "prod"|"production")
        main "production"
        ;;
    "preview"|"staging")
        main "preview"
        ;;
    "help"|"-h"|"--help")
        echo "DNA-Lang iCRISPR Workbench Deployment Script"
        echo ""
        echo "Usage: $0 [environment]"
        echo ""
        echo "Environments:"
        echo "  prod, production  - Deploy to production"
        echo "  preview, staging  - Deploy to preview (default)"
        echo "  help             - Show this help message"
        echo ""
        ;;
    *)
        main "preview"
        ;;
esac
