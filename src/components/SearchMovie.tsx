'use client';

import MovieShow from '@/app/(user)/year/[slug]/MovieShow';
import { MoviePartial } from '@/app/(user)/year/[slug]/page';
import { FormEvent, useEffect, useState } from 'react';

export default function SearchMovie(movie: MoviePartial) {
  const [search, setSearch] = useState('');
  const [props, setProps] = useState([{}]);
  const [searching, setSearching] = useState<boolean>(false);
  const searchFnc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(
      `http://localhost:3000/api/search?title=${search}`
    ).then((res) => res.json());
    const filterList = data.filter((el: MoviePartial) => {
      return (
        el.genre !== '에로' &&
        el.directors?.director.length !== 0 &&
        el.genre?.length !== 0
      );
    });
    setProps(filterList);
    setSearching(true);
  };

  return (
    <div className="pt-[50px] text-center flex flex-col items-center">
      <h2 className="mb-10 text-2xl">한국영화데이터베이스</h2>
      <form onSubmit={searchFnc} className="flex items-center gap-2.5">
        <input
          className="p-5 rounded-lg "
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색"
        />
        <button
          type="submit"
          className="p-5 bg-[url('/search.svg')] bg-no-repeat text-transparent dark:invert"
        ></button>
      </form>
      {searching ? <MovieShow props={props} /> : null}
    </div>
  );
}
