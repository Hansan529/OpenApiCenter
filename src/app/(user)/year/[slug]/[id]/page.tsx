'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { MoviePartial } from '../page';
import Image from 'next/image';
import NotFound from '@/app/not-found';

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  const movie: MoviePartial = useSelector(
    (state: RootState) => state.data.value
  );

  if (!movie) {
    return <NotFound />;
  }
  return (
    <>
      <div
        key={movie.title}
        className="p-[20px] prose dark:prose-invert prose-li:list-none bg-gray-300 dark:bg-gray-700 mx-auto"
      >
        <h2 className="mb-4 text-2xl font-bold break-keep overflow-hidden overflow-ellipsis whitespace-nowrap">
          {movie.title
            ?.replace(/\!HS/g, '')
            .replace(/\!HE/g, '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/  +/g, ' ')}
        </h2>
        <div>제작 국가: {movie.nation !== '' ? movie.nation : '정보 없음'}</div>
        <div>
          제작 회사: {movie.company !== '' ? movie.company : '정보 없음'}
        </div>
        <div>
          상영 시간:{' '}
          {`${movie.runtime !== '' ? movie.runtime + '분' : '정보 없음'}`}
        </div>
        <div>관람 등급: {movie.rating !== '' ? movie.rating : '정보 없음'}</div>
        <div>주제: {movie.genre !== '' ? movie.genre : '정보 없음'}</div>
        <div>
          개봉일: {movie.releaseDate !== '' ? movie.releaseDate : '정보 없음'}
        </div>
        {typeof movie.posterUrl === 'string' && movie.posterUrl.length !== 0 ? (
          <div>
            <Image
              className="mx-auto w-[200px] h-[300px] object-cover"
              src={movie.posterUrl.split('|')[0]}
              alt="포스터"
              width={200}
              height={300}
            />
          </div>
        ) : (
          <div className="mx-auto w-[200px] h-[300px] leading-[300px] bg-gray-200 text-center">
            포스터 정보 없음
          </div>
        )}
        <div>
          {typeof movie.stillUrl === 'string' && movie.stillUrl.length !== 0 ? (
            <Image
              className="object-cover mx-auto"
              src={movie.stillUrl.split('|')[0]}
              alt="스틸 이미지"
              width={400}
              height={300}
            />
          ) : null}
        </div>
        <h2>배우</h2>
        <ul className="flex gap-[10px] flex-wrap">
          {movie.actors?.actor.map((el, key) => (
            <li key={key}>{el.actorNm}</li>
          ))}
        </ul>
        <h2>스태프</h2>
        <div className="grid grid-cols-4">
          {movie.staffs?.staff.map((el, key) => (
            <div
              key={key}
              className="mb-5 text-ellipsis overflow-hidden whitespace-nowrap"
            >
              <span className="block">{el.staffRoleGroup}</span>
              <span>{el.staffNm}</span>
            </div>
          ))}
        </div>
        {movie.plots?.plot[0]?.plotText !== '' ? (
          <>
            <h2>줄거리</h2>
            <details>
              <summary>세부 정보</summary>
              <div className="space-y-[20px]">
                {movie.plots?.plot.map((el, key) => (
                  <p className="break-keep" key={key}>
                    {el.plotText}
                  </p>
                ))}
              </div>
            </details>
          </>
        ) : null}
        <div>
          {movie.vods?.vod.map((el, key) =>
            el.vodUrl?.length !== 0 ? (
              <video key={key} controls={true} crossOrigin="anonymous">
                <source
                  src={`https://www.kmdb.or.kr/trailer/play/${el.vodUrl
                    ?.slice(el.vodUrl?.indexOf('FileNm='))
                    .replace('FileNm=', '')}`}
                />
                <p>Video 태그를 지원하지 않는 브라우저입니다</p>
              </video>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
