// import { Client, fql, Query as q } from "fauna";
import { query as q } from 'faunadb';
import faunadb from 'faunadb';

// export const dynamic = 'force-dynamic'

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET || "",
});

export async function GET() {
  console.log(`oi`)
  // const res = await fetch('https://data.mongodb-api.com/', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  // const document_query = fql`
  //     myReferences.all()
  // `;

    

  let response: any = await faunaClient.query(

    // q.Select('data',
    //     q.Get(
    //         q.Documents(q.Collection('myReferences'))
    //     )
    // )

    q.Map(
      q.Paginate(q.Documents(q.Collection('myReferences'))),
      q.Lambda(x => q.Get(x))
    )
  );

  const enhancedResponse = response.data.map((item: any) => {
    const date = new Date(item.ts / 1000); // Microseconds timestamp to milliseconds 
    return {
      ref: item.ref,
      data: item.data,
      ts: item.ts,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  })

  return Response.json(enhancedResponse)
}