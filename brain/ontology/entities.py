"""Core ontology entities.

These dataclasses define the shared vocabulary across connectors, agents, and
graph layers. If something cannot be expressed here, fix the ontology first
before working around it in a connector or agent.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime
from enum import Enum
from typing import Optional

from .provenance import Provenance


class EntityType(str, Enum):
    PROJECT = "Project"
    TENDER = "Tender"
    CLIENT = "Client"
    CONTACT = "Contact"
    SUBCONTRACTOR = "Subcontractor"
    TRADE = "Trade"
    DOCUMENT = "Document"
    DRAWING = "Drawing"
    RFI = "RFI"
    VARIATION = "Variation"
    CLAIM = "Claim"
    CONTRACT = "Contract"
    MEETING = "Meeting"
    TASK = "Task"
    RISK = "Risk"
    DECISION = "Decision"
    LESSON_LEARNED = "LessonLearned"


@dataclass
class _Base:
    id: str
    tenant_id: str
    name: str
    provenance: Provenance
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


@dataclass
class Project(_Base):
    client_id: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


@dataclass
class Tender(_Base):
    client_id: Optional[str] = None
    status: Optional[str] = None  # qualifying, bidding, submitted, won, lost, withdrawn
    submission_due: Optional[date] = None
    awarded_project_id: Optional[str] = None


@dataclass
class Client(_Base):
    industry: Optional[str] = None
    region: Optional[str] = None


@dataclass
class Contact(_Base):
    organisation_id: Optional[str] = None
    organisation_type: Optional[str] = None  # 'client' | 'subcontractor' | 'internal'
    email: Optional[str] = None
    role: Optional[str] = None


@dataclass
class Subcontractor(_Base):
    region: Optional[str] = None
    rating: Optional[float] = None


@dataclass
class Trade(_Base):
    pass


@dataclass
class Document(_Base):
    project_id: Optional[str] = None
    mime_type: Optional[str] = None
    size_bytes: Optional[int] = None
    storage_uri: Optional[str] = None


@dataclass
class Drawing(_Base):
    project_id: Optional[str] = None
    revision: Optional[str] = None
    document_id: Optional[str] = None


@dataclass
class RFI(_Base):
    project_id: str = ""
    number: Optional[str] = None
    status: Optional[str] = None  # open, in-review, responded, closed
    raised_by: Optional[str] = None
    responded_by: Optional[str] = None
    raised_at: Optional[datetime] = None
    responded_at: Optional[datetime] = None


@dataclass
class Variation(_Base):
    project_id: str = ""
    contract_id: Optional[str] = None
    number: Optional[str] = None
    status: Optional[str] = None
    cost_impact: Optional[float] = None
    time_impact_days: Optional[int] = None


@dataclass
class Claim(_Base):
    project_id: str = ""
    contract_id: Optional[str] = None
    amount: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[str] = None  # draft, submitted, certified, paid, disputed


@dataclass
class Contract(_Base):
    project_id: Optional[str] = None
    counterparty_id: Optional[str] = None
    counterparty_type: Optional[str] = None  # 'client' | 'subcontractor'
    value: Optional[float] = None
    currency: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


@dataclass
class Meeting(_Base):
    project_id: Optional[str] = None
    occurred_at: Optional[datetime] = None
    attendee_ids: list[str] = field(default_factory=list)


@dataclass
class Task(_Base):
    project_id: Optional[str] = None
    owner_id: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[date] = None


@dataclass
class Risk(_Base):
    project_id: Optional[str] = None
    owner_id: Optional[str] = None
    likelihood: Optional[str] = None
    impact: Optional[str] = None
    status: Optional[str] = None
    mitigation: Optional[str] = None


@dataclass
class Decision(_Base):
    project_id: Optional[str] = None
    decided_by: Optional[str] = None
    rationale: Optional[str] = None
    supersedes_id: Optional[str] = None
    decided_at: Optional[datetime] = None


@dataclass
class LessonLearned(_Base):
    project_id: Optional[str] = None
    theme: Optional[str] = None
    applies_to_future: bool = True


ENTITY_TYPES: dict[EntityType, type] = {
    EntityType.PROJECT: Project,
    EntityType.TENDER: Tender,
    EntityType.CLIENT: Client,
    EntityType.CONTACT: Contact,
    EntityType.SUBCONTRACTOR: Subcontractor,
    EntityType.TRADE: Trade,
    EntityType.DOCUMENT: Document,
    EntityType.DRAWING: Drawing,
    EntityType.RFI: RFI,
    EntityType.VARIATION: Variation,
    EntityType.CLAIM: Claim,
    EntityType.CONTRACT: Contract,
    EntityType.MEETING: Meeting,
    EntityType.TASK: Task,
    EntityType.RISK: Risk,
    EntityType.DECISION: Decision,
    EntityType.LESSON_LEARNED: LessonLearned,
}
