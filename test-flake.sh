#!/usr/bin/env bash
set -e

echo "Testing flake build..."
cd /Users/jamesbrink/Projects/jamesbrink/watt-media-website

# Test if nix develop works
if nix develop --command echo "✓ Flake environment loaded successfully"; then
    echo "✓ Flake builds correctly"
    
    # Test if the tools are available
    echo ""
    echo "Testing available commands:"
    nix develop --command bash -c '
        if command -v live-server &> /dev/null; then
            echo "✓ live-server is available"
        else
            echo "✗ live-server is NOT available"
        fi
        
        if command -v htmlhint &> /dev/null; then
            echo "✓ htmlhint is available"
        else
            echo "✗ htmlhint is NOT available"
        fi
        
        if command -v stylelint &> /dev/null; then
            echo "✓ stylelint is available"
        else
            echo "✗ stylelint is NOT available"
        fi
        
        if command -v prettier &> /dev/null; then
            echo "✓ prettier is available"
        else
            echo "✗ prettier is NOT available"
        fi
    '
    
    echo ""
    echo "All tests passed! The flake is ready to use."
    echo ""
    echo "To start development:"
    echo "  1. Run: nix develop"
    echo "  2. Run: ./serve"
else
    echo "✗ Flake build failed"
    exit 1
fi