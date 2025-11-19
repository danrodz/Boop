/**
  {
    "api": 1,
    "name": "Makefile Generator",
    "description": "Generate Makefile for common tasks (input: node, python, go, docker)",
    "author": "Boop",
    "icon": "hammer",
    "tags": "makefile,build,make,automation,tasks"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'node';

    const makefiles = {
      node: `.PHONY: help install dev build test lint clean

help: ## Show this help
\t@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\\033[36m%-20s\\033[0m %s\\n", $$1, $$2}'

install: ## Install dependencies
\tnpm install

dev: ## Start development server
\tnpm run dev

build: ## Build for production
\tnpm run build

test: ## Run tests
\tnpm test

lint: ## Run linter
\tnpm run lint

clean: ## Clean build artifacts
\trm -rf node_modules dist build

deploy: build ## Deploy to production
\t@echo "Deploying..."
\t# Add deployment commands here`,

      python: `.PHONY: help venv install test lint clean

help: ## Show this help
\t@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\\033[36m%-20s\\033[0m %s\\n", $$1, $$2}'

venv: ## Create virtual environment
\tpython -m venv venv
\t@echo "Run: source venv/bin/activate"

install: ## Install dependencies
\tpip install -r requirements.txt

test: ## Run tests
\tpytest

lint: ## Run linter
\tflake8 .
\tblack --check .

format: ## Format code
\tblack .

clean: ## Clean build artifacts
\tfind . -type d -name __pycache__ -exec rm -rf {} +
\tfind . -type f -name '*.pyc' -delete
\trm -rf .pytest_cache
\trm -rf dist build *.egg-info`,

      docker: `.PHONY: help build run stop clean logs

IMAGE_NAME := myapp
VERSION := latest

help: ## Show this help
\t@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\\033[36m%-20s\\033[0m %s\\n", $$1, $$2}'

build: ## Build Docker image
\tdocker build -t $(IMAGE_NAME):$(VERSION) .

run: ## Run container
\tdocker run -d -p 3000:3000 --name $(IMAGE_NAME) $(IMAGE_NAME):$(VERSION)

stop: ## Stop container
\tdocker stop $(IMAGE_NAME)
\tdocker rm $(IMAGE_NAME)

clean: ## Remove image
\tdocker rmi $(IMAGE_NAME):$(VERSION)

logs: ## Show container logs
\tdocker logs -f $(IMAGE_NAME)

shell: ## Shell into container
\tdocker exec -it $(IMAGE_NAME) /bin/sh`,

      go: `.PHONY: help build test clean run

BINARY_NAME := myapp
VERSION := 1.0.0

help: ## Show this help
\t@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\\033[36m%-20s\\033[0m %s\\n", $$1, $$2}'

build: ## Build binary
\tgo build -o $(BINARY_NAME) -v

run: ## Run application
\tgo run .

test: ## Run tests
\tgo test -v ./...

clean: ## Clean build artifacts
\tgo clean
\trm -f $(BINARY_NAME)

deps: ## Download dependencies
\tgo mod download

tidy: ## Tidy dependencies
\tgo mod tidy`
    };

    const makefile = makefiles[type];

    if (!makefile) {
      const available = Object.keys(makefiles).join(', ');
      state.text = `Available templates: ${available}`;
      return;
    }

    state.text = makefile;
  } catch (error) {
    state.postError("Error generating Makefile: " + error.message);
  }
}
