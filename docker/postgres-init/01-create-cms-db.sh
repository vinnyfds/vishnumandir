#!/bin/bash
set -e
# Create Strapi CMS database (idempotent: ignore "already exists").
createdb -U "$POSTGRES_USER" vishnu_mandir_cms 2>/dev/null || true
