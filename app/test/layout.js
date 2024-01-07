import './test.css'

export default function RootLayout({ children }) {
  return (
    <main className='flex justify-center items-center h-screen w-screen'>
      {children}
    </main>
  )
}