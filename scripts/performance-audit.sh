#!/bin/bash

# Comprehensive Performance Audit Script
# Tests performance, accessibility, SEO, and best practices

set -e

echo "🚀 Starting comprehensive performance audit..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are available
check_dependencies() {
    print_status "Checking dependencies..."
    
    local missing_deps=()
    
    if ! command -v lighthouse &> /dev/null; then
        missing_deps+=("lighthouse")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_status "Install with: npm install -g lighthouse"
        exit 1
    fi
    
    print_success "All dependencies found"
}

# Build the application
build_app() {
    print_status "Building application..."
    if npm run build; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Run Lighthouse audits
run_lighthouse() {
    print_status "Running Lighthouse audits..."
    
    # Create reports directory
    mkdir -p reports/lighthouse
    
    # URLs to test
    local urls=(
        "http://localhost:3000"
        "http://localhost:3000/services/ai-ml"
        "http://localhost:3000/services/website-development"
        "http://localhost:3000/services/digital-marketing"
        "http://localhost:3000/services/erp-software"
        "http://localhost:3000/contact"
    )
    
    # Start the server in background
    print_status "Starting development server..."
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Run lighthouse for each URL
    for url in "${urls[@]}"; do
        local page_name=$(basename "$url")
        if [ "$page_name" = "3000" ]; then
            page_name="home"
        fi
        
        print_status "Auditing $url..."
        
        lighthouse "$url" \
            --output=html \
            --output-path="reports/lighthouse/${page_name}-report.html" \
            --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
            --only-categories=performance,accessibility,best-practices,seo \
            --budget-path=lighthouse.config.js \
            --quiet || print_warning "Lighthouse audit failed for $url"
    done
    
    # Kill the server
    kill $SERVER_PID || true
    
    print_success "Lighthouse audits completed"
}

# Analyze bundle size
analyze_bundle() {
    print_status "Analyzing bundle size..."
    
    if ANALYZE=true npm run build; then
        print_success "Bundle analysis completed - check .next/analyze/"
    else
        print_warning "Bundle analysis failed"
    fi
}

# Check for unused dependencies
check_unused_deps() {
    print_status "Checking for unused dependencies..."
    
    if command -v depcheck &> /dev/null; then
        depcheck --json > reports/unused-deps.json
        local unused_count=$(jq '.dependencies | length' reports/unused-deps.json)
        
        if [ "$unused_count" -gt 0 ]; then
            print_warning "Found $unused_count unused dependencies"
            jq '.dependencies' reports/unused-deps.json
        else
            print_success "No unused dependencies found"
        fi
    else
        print_warning "depcheck not installed. Install with: npm install -g depcheck"
    fi
}

# Generate performance report
generate_report() {
    print_status "Generating performance report..."
    
    cat > reports/performance-summary.md << EOF
# Performance Audit Summary

Generated on: $(date)

## Lighthouse Reports
- [Home Page](lighthouse/home-report.html)
- [AI/ML Services](lighthouse/ai-ml-report.html)
- [Website Development](lighthouse/website-development-report.html)
- [Digital Marketing](lighthouse/digital-marketing-report.html)
- [ERP Software](lighthouse/erp-software-report.html)
- [Contact Page](lighthouse/contact-report.html)

## Bundle Analysis
Check the bundle analysis in \`.next/analyze/\` directory.

## Recommendations
1. Monitor Core Web Vitals in production
2. Optimize images using WebP/AVIF formats
3. Implement proper caching strategies
4. Consider code splitting for large components
5. Monitor bundle size growth over time

## Performance Metrics Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Performance Score: > 90
- Accessibility Score: > 95
- SEO Score: > 95

EOF

    print_success "Performance report generated at reports/performance-summary.md"
}

# Main execution
main() {
    # Create reports directory
    mkdir -p reports
    
    check_dependencies
    build_app
    run_lighthouse
    analyze_bundle
    check_unused_deps
    generate_report
    
    print_success "Performance audit completed!"
    print_status "Check the reports/ directory for detailed results"
}

# Run main function
main "$@"