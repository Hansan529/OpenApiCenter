import { SystemError } from '@/type';
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const config = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  socketPath: '/tmp/mysql.sock',
};

type movieObject = {
  [key: string]: string | object;
};

export async function GET(req: NextRequest) {
  const createDts = req.nextUrl.searchParams.get('createDts');
  const listCount = req.nextUrl.searchParams.get('listCount');
  const dbconnection: any = await mysql.createConnection(config);
  try {
    const query = 'SELECT COUNT(*) FROM movie';
    const value: string[] = [];
    const [results] = await dbconnection.execute(query, value);
    if (Object.values(results[0])[0] === 1123) {
      const [results] = await dbconnection.execute(
        `SELECT * FROM movie`,
        value
      );
      dbconnection.end();
      return NextResponse.json(results);
    }

    const { Data } = await fetch(
      `${process.env.API_URL}?ServiceKey=${process.env.API_KEY}&createDts=${createDts}&listCount=${listCount}&collection=kmdb_new2&detail=Y&startCount=1000`
    ).then((res) => res.json());
    const result = Data[0].Result;
    result.map(async (movie: any) => {
      const insertQuery = `
      INSERT INTO movie(
        title, titleEng, titleOrg, prodYear , nation, company, runtime, rating, genre, releaseDate, posterUrl, stillUrl, directors, actors, staffs, plots, vods
        ) values (
          '${movie.title.replace(/'/g, '/\\/').trim()}', 
          '${movie.titleEng.replace(/'/g, '/\\/')}', 
          '${movie.titleOrg.replace(/'/g, '/\\/')}', 
          '${movie.prodYear.replace(/'/g, '/\\/')}', 
          '${movie.nation.replace(/'/g, '/\\/')}', 
          '${movie.company.replace(/'/g, '/\\/')}', 
          '${movie.runtime.replace(/'/g, '/\\/')}', 
          '${movie.rating.replace(/'/g, '/\\/')}',
          '${movie.genre.replace(/'/g, '/\\/')}', 
          '${movie.ratings.rating[0].releaseDate.replace(/'/g, '/\\/')}', 
          '${movie.posters.replace(/'/g, '/\\/')}', 
          '${movie.stlls.replace(/'/g, '/\\/')}', 
          '${JSON.stringify(movie.directors).replace(/'/g, "\\'")}', 
          '${JSON.stringify(movie.actors).replace(
            /'/g,
            "\\'"
          )}', '${JSON.stringify(movie.staffs).replace(
        /'/g,
        "\\'"
      )}', '${JSON.stringify(movie.plots).replace(
        /'/g,
        "\\'"
      )}', '${JSON.stringify(movie.vods).replace(/'/g, "\\'")}'
          )`;
      const [err, roes, fields] = await dbconnection.query(insertQuery);
    });
    dbconnection.end();
    return NextResponse.json(result);
  } catch (error) {
    const err = error as SystemError;
    console.log(err);
    return NextResponse.json({ error: err.message });
  }
}