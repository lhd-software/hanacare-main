#!/bin/bash
# Pre-commit hook to run linting and formatting

echo "Running Biome check..."
bun run lint:fix

echo "Formatting code..."
bun run format

echo "Type checking..."
bun run typecheck

echo "✅ Pre-commit checks passed!"

