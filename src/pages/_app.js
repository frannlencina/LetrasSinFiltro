import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import Layout from '../app/layouts/Layout';

export default function MyApp({ Component, pageProps }) {
  
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}