import { Inter } from 'next/font/google'
import './globals.css'
import RealtimeProvider from '@/components/context/realtime-provider'
import QueryProvider from '@/components/context/query-provider'
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Vyapar',
  description: 'Vyapar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <RealtimeProvider>
            {children}
          </RealtimeProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
