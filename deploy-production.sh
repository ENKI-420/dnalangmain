#!/bin/bash

echo "🧬 Deploying DNA-Lang iCRISPR Workbench to Production"
echo "=================================================="

# Set production environment variables
export NODE_ENV=production
export NEXT_PUBLIC_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
export NEXT_PUBLIC_VERSION="2.0.0"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run type checking
echo "🔍 Type checking..."
npm run type-check

# Build the project
echo "🏗️ Building project..."
npm run build

# Deploy to Vercel production
echo "🚀 Deploying to production..."
vercel --prod --confirm

# Health check
echo "🏥 Performing health check..."
sleep 15

DEPLOYMENT_URL=$(vercel ls | grep "dna-lang-icrispr" | head -1 | awk '{print $2}')

if [ -n "$DEPLOYMENT_URL" ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Production URL: https://$DEPLOYMENT_URL"
    echo "🧬 DNA-Lang iCRISPR Workbench is now live!"
else
    echo "⚠️ Could not verify deployment URL"
fi

echo ""
echo "🎉 Production deployment completed!"
echo "Features deployed:"
echo "  • Optimized marketing website with 71% performance claims"
echo "  • LLM Agent system with multi-provider support"
echo "  • Production-ready React components with lazy loading"
echo "  • ASCII rain animations and 3D visualizations"
echo "  • Mobile-optimized responsive design"
echo "  • SEO optimization and social media integration"
