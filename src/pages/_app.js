import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import Layout from '../app/layouts/Layout';
import { LoggedProvider } from '../app/context/LoggedContext';
export default function MyApp({ Component, pageProps }) {

  return (
    <LoggedProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoggedProvider>
  )
}