import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <h1>App Token Bucket</h1>
      {children}
    </div>
  );
};

export default AuthLayout;