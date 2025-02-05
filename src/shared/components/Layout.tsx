import { Navbar } from "./Navbar";

interface ICompenentProps {
    children: React.ReactNode;
    label: string
}

export function Layout({children}: ICompenentProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
}
