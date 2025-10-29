-- Add missing enum values to roadmap_category
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'system_design';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'ai_ml';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'data_science';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'frontend';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'backend';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'fullstack';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'devops';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'react';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'machine_learning';