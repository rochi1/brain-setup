# Terraform (placeholder)

Cloud bootstrap stubs go here. Recommended modules per cloud:

- **AWS:** VPC, RDS Postgres (multi-AZ), S3 bucket per tenant prefix, IAM
  roles for API + worker, Secrets Manager, CloudWatch / Grafana Cloud.
- **Azure:** Vnet, Postgres Flexible Server, Storage Account, Key Vault,
  Managed Identities.
- **GCP:** VPC, Cloud SQL Postgres, GCS, Workload Identity, Secret Manager.

Avoid coupling tenant data residency to the provider — pick the region per
tenant, not per environment.
