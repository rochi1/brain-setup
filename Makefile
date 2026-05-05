.PHONY: help setup install test lint fmt typecheck dev api worker validate clean

PYTHON ?= python3
PIP ?= pip

help:
	@echo "Targets:"
	@echo "  setup       Create venv + install dev deps"
	@echo "  install     Install package + extras"
	@echo "  test        Run pytest"
	@echo "  lint        Run ruff"
	@echo "  fmt         Format with ruff"
	@echo "  typecheck   Run mypy"
	@echo "  dev         Bring up local stack (docker-compose)"
	@echo "  api         Run the API locally"
	@echo "  worker      Run a one-off filesystem ingest"
	@echo "  validate    Quick syntax + JSON/YAML lint"
	@echo "  clean       Remove caches + builds"

setup:
	$(PYTHON) -m venv .venv
	. .venv/bin/activate && $(PIP) install -U pip && $(PIP) install -e '.[dev,api]'

install:
	$(PIP) install -e '.[dev,api]'

test:
	$(PYTHON) -m pytest

lint:
	ruff check brain

fmt:
	ruff format brain

typecheck:
	mypy brain

dev:
	cd infra/docker && docker compose up -d

api:
	$(PYTHON) -m uvicorn brain.api.app:create_app --factory --reload --port 8080

worker:
	$(PYTHON) -m brain.cli.main --tenant local --actor admin --actor-type system \
		ingest --connector filesystem --root ./your-business

validate:
	$(PYTHON) -m compileall -q brain
	$(PYTHON) -c "import yaml, glob; [yaml.safe_load(open(p)) for p in glob.glob('infra/**/*.y*ml', recursive=True)]"
	$(PYTHON) -c "import json, glob; [json.load(open(p)) for p in glob.glob('seed/*.json')]"

clean:
	rm -rf .pytest_cache .mypy_cache .ruff_cache build dist *.egg-info
	find . -type d -name __pycache__ -exec rm -rf {} +
