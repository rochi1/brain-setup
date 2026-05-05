"""Operator CLI.

Usage:
    python -m brain.cli.main ingest --tenant T1 --actor admin --connector filesystem --root ./data
    python -m brain.cli.main search --tenant T1 --actor admin --query "RFI 247"
    python -m brain.cli.main audit  --tenant T1 --actor admin
"""
from __future__ import annotations

import argparse
import json
import sys
import uuid
from typing import Any

from brain.api.container import build_default_container
from brain.api.routes.audit import get_audit
from brain.api.routes.ingest import ingest as do_ingest
from brain.api.routes.search import search as do_search
from brain.core.context import Actor, RequestContext
from brain.core.logging import configure_logging
from brain.core.settings import get_settings


def _ctx(args: argparse.Namespace) -> RequestContext:
    return RequestContext(
        tenant_id=args.tenant,
        actor=Actor(type=args.actor_type, id=args.actor),
        request_id=str(uuid.uuid4()),
        purpose=args.purpose,
    )


def _print(obj: Any) -> None:
    print(json.dumps(obj, indent=2, default=str))


def main(argv: list[str] | None = None) -> int:
    settings = get_settings()
    configure_logging(settings.log_level)

    parser = argparse.ArgumentParser(prog="brain")
    parser.add_argument("--tenant", required=True)
    parser.add_argument("--actor", required=True)
    parser.add_argument("--actor-type", default="user", choices=["user", "agent", "connector", "system"])
    parser.add_argument("--purpose", default=None)

    sub = parser.add_subparsers(dest="cmd", required=True)

    p_ingest = sub.add_parser("ingest")
    p_ingest.add_argument("--connector", required=True)
    p_ingest.add_argument("--root", help="Filesystem connector root", default=None)
    p_ingest.add_argument("--config-json", help="JSON-encoded extra config", default="{}")

    p_search = sub.add_parser("search")
    p_search.add_argument("--query", required=True)
    p_search.add_argument("--limit", type=int, default=10)
    p_search.add_argument("--as-of", default=None)

    p_audit = sub.add_parser("audit")
    p_audit.add_argument("--action", default=None)
    p_audit.add_argument("--actor-id-filter", default=None)

    args = parser.parse_args(argv)
    container = build_default_container()
    ctx = _ctx(args)

    if args.cmd == "ingest":
        config = json.loads(args.config_json or "{}")
        if args.root:
            config["root"] = args.root
        _print(do_ingest(ctx, container, connector=args.connector, config=config))
        return 0

    if args.cmd == "search":
        _print(do_search(ctx, container, query=args.query, limit=args.limit, as_of=args.as_of))
        return 0

    if args.cmd == "audit":
        _print(get_audit(ctx, container, action=args.action, actor_id=args.actor_id_filter))
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    sys.exit(main())
