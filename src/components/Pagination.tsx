'use client';

import { List } from '@/type';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type PageSelect = { selected: number };
type Params = {
  totalPost: number;
  limit: number;
  btnLength: number;
  selectPage: any;
  className?: string | undefined;
};

export default function Pagination({
  totalPost,
  limit,
  btnLength,
  selectPage,
  className,
}: Params) {
  const totalPage = Math.ceil(totalPost / limit);
  const pageList = btnLength < totalPage ? btnLength : totalPage;
  const pageLength = Array.from({ length: pageList }, (l, i) => i);

  const handlePageChange = (page: PageSelect) => {
    selectPage(page.selected);
  };
  return (
    <ReactPaginate
      className={`flex items-center justify-between ${
        className ? className : ''
      }`}
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={btnLength}
      pageClassName="w-[50px] h-[50px] rounded-full text-center leading-[50px]"
      pageLinkClassName="block w-full h-full dark:text-white"
      breakLabel="..."
      renderOnZeroPageCount={null}
      previousLabel=""
      previousLinkClassName="block h-[30px] w-[30px] bg-[url('/angle-left.svg')] bg-no-repeat bg-center dark:invert"
      disabledLinkClassName="opacity-30 bg-none"
      nextLabel=""
      nextLinkClassName="block h-[30px] w-[30px] bg-[url('/angle-right.svg')] bg-no-repeat bg-center dark:invert"
      activeClassName="text-white bg-[skyblue]"
      onPageChange={handlePageChange}
    />
  );
}
