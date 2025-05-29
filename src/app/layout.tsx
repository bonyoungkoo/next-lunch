import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="max-w-5xl mx-auto min-h-screen">
          <header className="border-b border-gray-200">
            <nav className="flex items-center justify-center gap-8 p-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-lg hover:scale-105 transform"
              >
                돌림판
              </Link>
              <Link
                href="/history"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-lg hover:scale-105 transform"
              >
                기록
              </Link>
              <Link
                href="/menus"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-lg hover:scale-105 transform"
              >
                메뉴판
              </Link>
            </nav>
          </header>
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
