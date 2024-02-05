import './globals.css'
import RealtimeProvider from '@/components/context/realtime-provider'
import QueryProvider from '@/components/context/query-provider'
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Vyapar',
  description: 'Vyapar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='w-screen h-screen bg-red-500'>
      <body>
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
