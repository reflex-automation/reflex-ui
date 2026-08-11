import { LoadingState } from '@ansible/ansible-ui-framework/components/LoadingState';
import { AnsibleLogin } from '@ansible/common-ui/AnsibleLogin/AnsibleLogin';
import type { AuthOption } from '@ansible/common-ui/SocialAuthLogin';
import { requestGet } from '@ansible/common-ui/crud/Data';
import useSWR, { mutate } from 'swr';
import { edaAPI } from '../common/eda-utils';
import { useEdaActiveUser } from '../common/useEdaActiveUser';

type EdaUIAuth = {
  ssos?: AuthOption[];
  show_login_form?: boolean;
};

export function EdaLogin(props: Readonly<{ children: React.ReactNode }>) {
  const { activeEdaUser, refreshActiveEdaUser } = useEdaActiveUser();
  const { data: uiAuth } = useSWR<EdaUIAuth>(edaAPI`/ui_auth/`, requestGet);

  if (activeEdaUser === undefined) {
    return <LoadingState />;
  }

  if (!activeEdaUser) {
    return (
      <AnsibleLogin
        loginApiUrl={edaAPI`/auth/session/login/`}
        authOptions={uiAuth?.ssos}
        onSuccess={() => {
          refreshActiveEdaUser?.();
          void mutate(() => true);
        }}
        brandImg="/reflex-logo.svg"
        brandImgAlt={process.env.PRODUCT as unknown as string}
        showLoginForm={(uiAuth?.show_login_form ?? true) || !uiAuth?.ssos?.length}
      />
    );
  }

  return props.children;
}
