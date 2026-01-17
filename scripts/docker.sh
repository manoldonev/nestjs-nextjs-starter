#!/usr/bin/env bash

# NestJS + Next.js Starter - Docker Management Script
# Convenient commands for managing local development infrastructure

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

case "$1" in
  up)
    echo "Starting infrastructure..."
    docker-compose up -d
    echo "Services started!"
    echo ""
    echo "Redis: localhost:6379"
    echo ""
    echo "Run 'yarn docker:logs' to view logs"
    ;;

  down)
    echo "Stopping infrastructure..."
    docker-compose down
    echo "Services stopped!"
    ;;

  restart)
    echo "Restarting infrastructure..."
    docker-compose restart
    echo "Services restarted!"
    ;;

  logs)
    echo "Showing logs (Ctrl+C to exit)..."
    docker-compose logs -f
    ;;

  ps)
    echo "Service status:"
    docker-compose ps
    ;;

  clean)
    echo "Cleaning up (this will DELETE all data)..."
    read -p "Are you sure? This will remove all volumes and data. [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      docker-compose down -v
      echo "All data cleaned!"
    else
      echo "Cancelled"
    fi
    ;;

  redis-cli)
    echo "Connecting to Redis..."
    docker-compose exec redis redis-cli
    ;;

  *)
    echo "NestJS + Next.js Starter - Docker Management"
    echo ""
    echo "Usage: yarn docker:<command>"
    echo ""
    echo "Commands:"
    echo "  up         Start all services"
    echo "  down       Stop all services"
    echo "  restart    Restart all services"
    echo "  logs       View logs (follow mode)"
    echo "  ps         Show service status"
    echo "  clean      Remove all volumes and data (DESTRUCTIVE)"
    echo "  redis-cli  Connect to Redis CLI"
    echo ""
    echo "Examples:"
    echo "  yarn docker:up"
    echo "  yarn docker:logs"
    exit 1
    ;;
esac
