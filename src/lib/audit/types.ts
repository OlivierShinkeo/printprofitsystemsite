import type { AppRole, AuditStatus } from "./status";

export interface Profile {
  id: string;
  role: AppRole;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuditListItem {
  id: string;
  company_name: string;
  country: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  status: AuditStatus;
  invited_at: string;
  submitted_at: string | null;
  last_saved_at: string | null;
  progress_percent: number;
}
