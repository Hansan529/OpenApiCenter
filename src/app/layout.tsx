import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from './Provider';
import ReduxProvider from '../redux/providers';

export const metadata: Metadata = {
  title: "한국영화데이터베이스 Hxan & KMDB",
  description:
    "한국영화데이터베이스의 데이터베이스를 이용하실 수 있는 홈페이지입니다.",
  icons: {
    icon: "https://movie.hxan.net/favicon.ico",
    shortcut: "https://movie.hxan.net/favicon.ico",
  },
};

export type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen h-full pt-24 bg-gray-200 dark:bg-gray-800 text-black dark:text-white duration-500">
              {children}
            </main>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
