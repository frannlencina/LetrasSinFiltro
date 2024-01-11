import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LoggedProvider } from '../context/LoggedContext';
export default function Layout({ children }) {
    return (
        <>
            <LoggedProvider>
                <Head>
                    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" rel="stylesheet"></link>
                    <title>LetrasSinFiltro</title>
                </Head>
                <header>
                    <Navbar />
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </LoggedProvider>
        </>
    )
}