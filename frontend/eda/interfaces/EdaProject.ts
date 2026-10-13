import { EdaCredentialRef, Project, ProjectCreateRequest, ProjectRead } from './generated/eda-api';

export type EdaProject = Omit<Project, 'scm_update_on_launch'> & {
  update_revision_on_launch: boolean;
  scm_update_cache_timeout: number;
};
export type EdaProjectRead = Omit<ProjectRead, 'scm_update_on_launch'> & {
  update_revision_on_launch: boolean;
  scm_update_cache_timeout: number;
  last_synced_at: string;
  webhook_credential?: EdaCredentialRef | null;
  webhook_path?: string | null;
};
export type EdaProjectCreate = Omit<ProjectCreateRequest, 'scm_update_on_launch'> & {
  update_revision_on_launch: boolean;
  scm_update_cache_timeout: number;
  webhook_credential_id?: number | null;
};
