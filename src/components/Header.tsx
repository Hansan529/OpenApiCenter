import Image from 'next/image';
import Logo from '@/../public/logo.svg';
import Link from 'next/link';

export default async function Header() {
  return (
    <header>
      <h1>
        <Image src={Logo} alt="로고" />
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/year/2023">2023년 영화 데이터베이스</Link>
          </li>
          <li>영화 검색</li>
        </ul>
      </nav>
    </header>
  );
}
