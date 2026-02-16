import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function PageContainer({ title, children, action }: PageContainerProps) {
  return (
    <div className="min-h-screen">
      <header className="bg-primary-600 dark:bg-primary-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          {action && <div>{action}</div>}
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
