import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";
import JsonLd from "@/components/seo/JsonLd";
import { generateSiteMetadata, generateWebsiteJsonLd } from "@/lib/seo";
import { getLocale, getDictionary } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n/context";

export const metadata: Metadata = generateSiteMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Satoshi Font from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* UnifrakturMaguntia — Old English blackletter masthead */}
        <link
          href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={generateWebsiteJsonLd()} />
        {adsenseId && !adsenseId.startsWith("ca-pub-XXXX") && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Monetag */}
        <script
          async
          src="https://alwingulla.com/88/tag.min.js"
          data-zone="3256030"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <LocaleProvider initialLocale={locale} initialDict={dict}>
          <Header />
          <AuthProvider>
            <main className="flex-1">{children}</main>
          </AuthProvider>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
