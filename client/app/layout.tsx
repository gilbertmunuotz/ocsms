import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          {children}
          <Toaster
            position="top-center"
            richColors
          />
        </SessionProvider>
      </body>
    </html>
  );
}
