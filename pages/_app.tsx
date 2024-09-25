// pages/_app.tsx
import { SessionProvider } from 'next-auth/react'; // Import the SessionProvider from NextAuth.js
import { AppProps } from 'next/app';
import '../styles/global.css'; // Import global CSS

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Wrap your app in the SessionProvider
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
