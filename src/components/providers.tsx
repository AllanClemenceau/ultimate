'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ProgressionProvider } from '@/contexts/progression-context';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ProgressionProvider>
        {children}
      </ProgressionProvider>
    </NextThemesProvider>
  );
}
