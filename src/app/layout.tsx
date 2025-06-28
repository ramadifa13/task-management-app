import './globals.css';
import { ReactNode } from 'react';
import StoreProvider from '@/store/storeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
