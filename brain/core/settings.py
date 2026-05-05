"""Runtime settings loaded from environment.

Single source of truth for configuration. Never read os.environ directly elsewhere.
"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Optional


def _env(key: str, default: Optional[str] = None) -> Optional[str]:
    val = os.environ.get(key, default)
    return val if val not in ("", None) else default


def _env_bool(key: str, default: bool = False) -> bool:
    raw = _env(key)
    if raw is None:
        return default
    return raw.lower() in ("1", "true", "yes", "on")


@dataclass(frozen=True)
class PostgresSettings:
    dsn: str = field(default_factory=lambda: _env(
        "POSTGRES_DSN",
        "postgresql://brain:brain@localhost:5432/brain",
    ))
    pool_min: int = field(default_factory=lambda: int(_env("POSTGRES_POOL_MIN", "2")))
    pool_max: int = field(default_factory=lambda: int(_env("POSTGRES_POOL_MAX", "10")))


@dataclass(frozen=True)
class CogneeSettings:
    url: str = field(default_factory=lambda: _env("COGNEE_URL", "http://localhost:8001"))
    api_key: Optional[str] = field(default_factory=lambda: _env("COGNEE_API_KEY"))
    default_dataset: str = field(default_factory=lambda: _env("COGNEE_DEFAULT_DATASET", "company_brain"))


@dataclass(frozen=True)
class GraphitiSettings:
    url: str = field(default_factory=lambda: _env("GRAPHITI_URL", "bolt://localhost:7687"))
    user: str = field(default_factory=lambda: _env("GRAPHITI_USER", "neo4j"))
    password: Optional[str] = field(default_factory=lambda: _env("GRAPHITI_PASSWORD"))


@dataclass(frozen=True)
class Mem0Settings:
    url: str = field(default_factory=lambda: _env("MEM0_URL", "http://localhost:8002"))
    api_key: Optional[str] = field(default_factory=lambda: _env("MEM0_API_KEY"))


@dataclass(frozen=True)
class ObjectStoreSettings:
    backend: str = field(default_factory=lambda: _env("OBJECT_STORE_BACKEND", "filesystem"))
    bucket_or_path: str = field(default_factory=lambda: _env("OBJECT_STORE_PATH", "/var/lib/brain/blobs"))


@dataclass(frozen=True)
class MicrosoftGraphSettings:
    tenant_id: Optional[str] = field(default_factory=lambda: _env("MS_TENANT_ID"))
    client_id: Optional[str] = field(default_factory=lambda: _env("MS_CLIENT_ID"))
    client_secret: Optional[str] = field(default_factory=lambda: _env("MS_CLIENT_SECRET"))


@dataclass(frozen=True)
class PlexaSettings:
    base_url: Optional[str] = field(default_factory=lambda: _env("PLEXA_BASE_URL"))
    api_key: Optional[str] = field(default_factory=lambda: _env("PLEXA_API_KEY"))


@dataclass(frozen=True)
class SupabaseSettings:
    url: Optional[str] = field(default_factory=lambda: _env("SUPABASE_URL"))
    service_key: Optional[str] = field(default_factory=lambda: _env("SUPABASE_SERVICE_KEY"))


@dataclass(frozen=True)
class Settings:
    env: str = field(default_factory=lambda: _env("BRAIN_ENV", "local"))
    debug: bool = field(default_factory=lambda: _env_bool("BRAIN_DEBUG", False))
    log_level: str = field(default_factory=lambda: _env("BRAIN_LOG_LEVEL", "INFO"))
    business_dir: str = field(default_factory=lambda: _env("BRAIN_BUSINESS_DIR", "your-business"))

    postgres: PostgresSettings = field(default_factory=PostgresSettings)
    cognee: CogneeSettings = field(default_factory=CogneeSettings)
    graphiti: GraphitiSettings = field(default_factory=GraphitiSettings)
    mem0: Mem0Settings = field(default_factory=Mem0Settings)
    object_store: ObjectStoreSettings = field(default_factory=ObjectStoreSettings)

    microsoft_graph: MicrosoftGraphSettings = field(default_factory=MicrosoftGraphSettings)
    plexa: PlexaSettings = field(default_factory=PlexaSettings)
    supabase: SupabaseSettings = field(default_factory=SupabaseSettings)


_settings: Optional[Settings] = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings
