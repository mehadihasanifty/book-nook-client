import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Navbar from './component/Navbar';

export const metadata: Metadata = {
  title: 'BookNook | Discover & Borrow Books',
  description: 'BookNook is a community-driven digital library: add a book, borrow a book, return a book.',
};

// The copyright year must be cacheable so the prerendered shell is deterministic


export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
       <Navbar/>
          {children}      </body>
    </html>
  );
}
