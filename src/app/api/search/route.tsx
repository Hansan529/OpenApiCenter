import { NextRequest, NextResponse } from 'next/server';
import { mysqlConnect } from "../route";
import mysql from "mysql2/promise";
import { SystemError } from "@/type";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  const dbconnection: any = await mysql.createConnection(mysqlConnect);
  try {
    const query = `SELECT * FROM movie WHERE title = '${title}'`;
    const value: string[] = [];
    const [results, err] = await dbconnection.execute(query, value);
    if (results.length === 0) {
      const { Data } = await fetch(
        `${process.env.API_URL}?ServiceKey=${process.env.API_KEY}&query=${title}&collection=kmdb_new2`
      ).then((res) => res.json());
      return NextResponse.json(Data[0].Result);
    }
  } catch (error) {
    const err = error as SystemError;
    return NextResponse.json({ error: err });
  }
}
