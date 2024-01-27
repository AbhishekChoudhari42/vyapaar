import './test.css'
import RealtimeProvider from '../../components/test_components/RealtimeProvider'

export default function RootLayout({ children }) {

    return (
        <RealtimeProvider>
            <main className='flex justify-center items-center h-screen w-screen'>
                {children}
            </main>
        </RealtimeProvider>
    )
}