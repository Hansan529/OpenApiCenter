'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LightMode from '@/../public/lightMode.svg';
import DarkMode from '@/../public/darkMode.svg';

const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  let src: string = '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (resolvedTheme) {
    case 'light':
      src = LightMode;
      break;
    case 'dark':
      src = DarkMode;
      break;
    default:
      break;
  }

  const changeMode = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <button onClick={changeMode}>
        <Image className="w-[40px]" src={src} alt="" width={40} height={40} />
        <span className="sr-only">Browser Theme Change</span>
      </button>
    </>
  );
};

export default DarkModeBtn;
