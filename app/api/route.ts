// import { Client, fql, Query as q } from "fauna";
import console from 'console';
import { query as q } from 'faunadb';
import faunadb from 'faunadb';

type InputReq = {
  id: number
}

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET || "",
});

export async function GET() {
  console.log("oi")
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
      id: item.ref.id,
      data: item.data,
      ts: item.ts,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  })

  return Response.json(enhancedResponse)
}

export async function DELETE(request: Request) {
  const data: InputReq = await request.json();

  const { id } = data;

  let response = await faunaClient.query(
    q.Delete(
      q.Ref(
        q.Collection('myReferences'),
        id
      )
    )
  )

  return Response.json({foi: "fois"});
}