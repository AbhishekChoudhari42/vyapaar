import './globals.css'
import QueryProvider from '@/components/context/query-provider'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: 'Vyapar',
  description: 'Vyapar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='w-screen h-screen bg-red-500'>
      <body>
       
        <QueryProvider>
          {children}
        </QueryProvider>

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
