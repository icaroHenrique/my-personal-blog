import type { Metadata } from "next";
import { Archivo_Black, Bebas_Neue, Syne, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { MobileMenuButton } from "../components/MobileMenuButton";
import { getPosts, getCategories, getTags } from "@/lib/cms";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Blog Pessoal | Neubrutalism",
  description: "Blog pessoal construído com conceito neubrutalist.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();
  const categories = await getCategories();
  const tags = await getTags();

  return (
    <html
      lang="pt-BR"
      className={`${archivoBlack.variable} ${bebasNeue.variable} ${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-[var(--bg-base)] text-[var(--text-main)] overflow-hidden lg:overflow-auto">
        <MobileMenuButton />
        <div className="flex-1 w-full overflow-hidden lg:overflow-visible">
          <div 
            id="mobile-wrapper" 
            className="flex w-[200vw] lg:w-full lg:max-w-[1400px] mx-auto flex-row items-start transition-transform duration-300 ease-out -translate-x-[100vw] lg:translate-x-0"
          >
            <div className="w-[100vw] h-[100dvh] overflow-y-auto lg:w-auto lg:h-auto lg:overflow-visible shrink-0">
              <Sidebar posts={posts} categories={categories} tags={tags} />
            </div>
            <main className="w-[100vw] h-[100dvh] overflow-y-auto lg:h-auto lg:overflow-visible lg:flex-1 pt-20 lg:pt-0 shrink-0 flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <div className="block lg:hidden w-full mt-auto">
                <Footer />
              </div>
            </main>
          </div>
        </div>
        {/* Footer para o Desktop (Fora do wrapper principal) */}
        <div className="hidden lg:block w-full mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
