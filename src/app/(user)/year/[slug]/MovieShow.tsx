'use client';

import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { MoviePartial } from './page';
import Image from 'next/image';

interface ChildComponentProps {
  props: MoviePartial[];
}

export default function MovieShow({ props }: ChildComponentProps) {
  const totalPost = Object.keys(props).length;
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const result = props.slice(page * limit, (page + 1) * limit);
  return (
    <article className="">
      {result.map((movie: MoviePartial, index: number) => (
        <div
          key={movie.title}
          className="mx-auto p-[20px] bg-gray-400 border border-white"
        >
          <h2>{movie.title}</h2>
          <div>
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
          </div>
          {typeof movie.posterUrl === 'string' &&
          movie.posterUrl.length !== 0 ? (
            <Image
              src={movie.posterUrl.split('|')[0]}
              alt="포스터"
              width={200}
              height={300}
            />
          ) : null}
          <div>
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
          </div>
          <div>감독: {movie.directors?.map((el) => el.directorNm)}</div>
          <h2>배우</h2>
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
          </div>
        </div>
      ))}
      <Pagination
        totalPost={totalPost}
        limit={12}
        btnLength={5}
        selectPage={setPage}
      />
    </article>
  );
}
