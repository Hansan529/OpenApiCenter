'use client';

import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { MoviePartial } from './page';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { data } from '@/redux/feature/dataSlicce';
import { useRouter } from 'next/navigation';

interface ChildComponentProps {
  props: MoviePartial[];
}

type MouseEventType = React.MouseEvent<HTMLAnchorElement>;

export default function MovieShow({ props }: ChildComponentProps) {
  const totalPost = Object.keys(props).length;
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(0);
  const result = props.slice(page * limit, (page + 1) * limit);
  const dispatch = useDispatch();
  const router = useRouter();

  const detailPageProps = (e: MouseEventType) => {
    e.preventDefault();
    const link = decodeURIComponent(e.currentTarget.href);
    const titleNameIndex = link.lastIndexOf('/') + 1;
    const titleName = link.substring(titleNameIndex);
    const propsData = props.find((el) => {
      return (
        el.title
          ?.replace(/\!HS/g, '')
          .replace(/\!HE/g, '')
          .replace(/^\s+|\s+$/g, '')
          .replace(/  +/g, ' ') === titleName
      );
    });
    dispatch(data(propsData));
    router.push(link);
  };
  return (
    <article className="container mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-700 rounded-xl text-center">
      <div className="prose-xl md:grid md:grid-cols-4 place-content-center">
        {result.map((movie: MoviePartial, index: number) => (
          <div
            key={movie.title}
            className="p-[20px] flex flex-col justify-between"
          >
            <Link
              onClick={detailPageProps}
              href={`/year/${movie.prodYear}/${
                movie.title
                  ?.replace(/\!HS/g, '')
                  .replace(/\!HE/g, '')
                  .replace(/^\s+|\s+$/g, '')
                  .replace(/  +/g, ' ') as string
              }`}
            >
              <h2 className="mb-4 text-xl font-bold break-keep overflow-hidden overflow-ellipsis whitespace-nowrap">
                {movie.title
                  ?.replace(/\!HS/g, '')
                  .replace(/\!HE/g, '')
                  .replace(/^\s+|\s+$/g, '')
                  .replace(/  +/g, ' ')}
              </h2>
              {typeof movie.posterUrl === 'string' &&
              movie.posterUrl.length !== 0 ? (
                <Image
                  className="mx-auto w-[200px] h-[300px] object-cover"
                  src={movie.posterUrl.split('|')[0]}
                  alt="포스터"
                  width={200}
                  height={300}
                />
              ) : (
                <div className="mx-auto w-[200px] h-[300px] leading-[300px] bg-gray-200 text-black">
                  포스터 정보 없음
                </div>
              )}
            </Link>
          </div>
        ))}
        <Pagination
          className="not-prose my-[20px] col-span-4 w-2/4 mx-auto border-none"
          totalPost={totalPost}
          limit={12}
          btnLength={5}
          selectPage={setPage}
        />
      </div>
    </article>
  );
}
