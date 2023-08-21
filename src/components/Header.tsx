import Image from 'next/image';
import Logo from '@/../public/logo.svg';
import Link from 'next/link';
import DarkModeBtn from './Darkmode';

export default function Header() {
  return (
    <header className="bg-white dark:bg-black fixed top-0 w-full duration-500">
      <article className="flex gap-2.5 items-center px-5 py-5 container mx-auto">
        <h1 className="w-14 h-14">
          <Link href="/">
            <Image src={Logo} alt="로고" />
          </Link>
        </h1>
        <nav className="flex-1">
          <ul className="flex gap-5 justify-center text-sky-800 dark:text-sky-500">
            <li className="duration-500 hover:text-sky-500/50 dark:hover:text-white">
              <Link href="/">영화 검색</Link>
            </li>
            <li className="duration-500 hover:text-sky-500/50 dark:hover:text-white">
              <Link href="/year/2023">2023년 영화 데이터베이스</Link>
            </li>
          </ul>
        </nav>
        <DarkModeBtn />
      </article>
    </header>
  );
}
