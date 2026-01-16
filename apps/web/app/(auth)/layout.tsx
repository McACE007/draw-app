import { ReactNode } from "react";

function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="w-screen h-screen p-10 flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}

export default AuthLayout;
