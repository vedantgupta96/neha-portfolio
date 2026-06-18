import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/theme/ThemeProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

// Set theme before first paint to avoid a flash of the wrong theme.
const noFlash = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
