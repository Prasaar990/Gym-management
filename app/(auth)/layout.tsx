"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full  min-h-screen flex flex-col-reverse  md:flex-row  justify-center items-center mx-auto">
      {children}
    </div>
  );
}
