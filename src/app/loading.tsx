import Image from 'next/image';

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-wait flex-col text-center">
      <p>로딩 중입니다...</p>
      <Image src="/loading.svg" alt="로딩중" width={200} height={200} />
    </div>
  );
}
