'use client';

import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { MoviePartial } from './page';
import Image from 'next/image';
import Link from 'next/link';
import DetailPage from './DetailPage';
import { useDispatch } from 'react-redux';
import { data } from '@/redux/feature/dataSlicce';

interface ChildComponentProps {
  props: MoviePartial[];
}

export default function MovieShow({ props }: ChildComponentProps) {
  const totalPost = Object.keys(props).length;
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const result = props.slice(page * limit, (page + 1) * limit);
  const dispatch = useDispatch();

  const detailPageProps = (e) => {
    e.preventDefault();
    const link = decodeURIComponent(e.currentTarget.href);
    const titleNameIndex = link.lastIndexOf('/') + 1;
    const titleName = link.substring(titleNameIndex);
    const propsData = props.find((el) => {
      return el.title?.trim() == titleName;
    });
    console.log('propsData: ', propsData);
    // dispatch(data())
  };
  return (
    <article className="md:grid md:grid-cols-4 place-content-center bg-gray-300 text-black dark:text-white text-center divide-x-2 divide-y-2">
      {result.map((movie: MoviePartial, index: number) => (
        <div
          key={movie.title}
          className="p-[20px] flex flex-col justify-between"
        >
          <Link
            onClick={detailPageProps}
            href={`/${movie.prodYear}/${movie.title?.trim() as string}`}
          >
            <h2 className="mb-4 text-xl font-bold break-keep overflow-hidden overflow-ellipsis whitespace-nowrap">
              {movie.title}
            </h2>
            {/* <div>
              제작 국가: {movie.nation !== '' ? movie.nation : '정보 없음'}
            </div>
            <div>
              제작 회사: {movie.company !== '' ? movie.company : '정보 없음'}
            </div>
            <div>
              상영 시간:{' '}
              {`${movie.runtime !== '' ? movie.runtime + '분' : '정보 없음'}`}
            </div>
            <div>
              관람 등급: {movie.rating !== '' ? movie.rating : '정보 없음'}
            </div>
            <div>주제: {movie.genre !== '' ? movie.genre : '정보 없음'}</div>
            <div>
              개봉일: {movie.releaseDate !== '' ? movie.releaseDate : '정보 없음'}
            </div> */}
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
              <div className="mx-auto w-[200px] h-[300px] leading-[300px] bg-gray-200">
                포스터 정보 없음
              </div>
            )}
            {/* <div>
              스틸 이미지:{' '}
              {typeof movie.stillUrl === 'string' &&
              movie.stillUrl.length !== 0 ? (
                <Image
                  className="object-cover"
                  src={movie.stillUrl.split('|')[0]}
                  alt="스틸 이미지"
                  width={400}
                  height={300}
                />
              ) : null}
            </div> */}
            {/* <h2>배우</h2>
            <ul className="flex gap-[10px]">
              {movie.actors?.map((el, key) => (
                <li key={key}>{el.actorNm}</li>
              ))}
            </ul>
            <h2>스태프</h2>
            <div className="grid grid-cols-3 [&>*:nth-child(n+13)]:hidden [&>*:nth-child(13)]:before:content-['...']">
              {movie.staffs?.map((el, key) => (
                <div key={key}>
                  <span>{el.staffRoleGroup}: </span>
                  <span>{el.staffNm}</span>
                </div>
              ))}
            </div>
            <h2>줄거리</h2>
            <details>
              <summary>세부 정보</summary>
              <div className="space-y-[20px]">
                {movie.plots?.map((el, key) => (
                  <p key={key}>{el.plotText}</p>
                ))}
              </div>
            </details>
            <div>
              {movie.vods?.map((el, key) =>
                el.vodUrl.length !== 0 ? (
                  <video key={key} controls={true} crossOrigin="anonymous">
                    <source
                      src={`https://www.kmdb.or.kr/trailer/play/${el.vodUrl
                        .slice(el.vodUrl.indexOf('FileNm='))
                        .replace('FileNm=', '')}`}
                    />
                    <p>Video 태그를 지원하지 않는 브라우저입니다</p>
                  </video>
                ) : null
              )}
            </div> */}
          </Link>
        </div>
      ))}
      <Pagination
        className="my-[20px] col-span-4 w-2/4 mx-auto border-none"
        totalPost={totalPost}
        limit={12}
        btnLength={5}
        selectPage={setPage}
      />
    </article>
  );
}
