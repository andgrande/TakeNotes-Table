'use server'
import console from 'console';
import { query as q } from 'faunadb';
import faunadb from 'faunadb';

type InputReq = {
  id: number
}

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET || "",
});

const transformDate = (ts: number) => {
  const date = new Date(ts / 1000); // Microseconds timestamp to milliseconds
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export async function GET() {
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
    return {
      id: item.ref.id,
      data: item.data,
      ts: item.ts,
      date: transformDate(item.ts),
    }
  })

  return Response.json(enhancedResponse)
}

export async function POST(request: Request) {
  const data: any = await request.json();

  // q.Collection should receive a dynamic parameter to define collection
  try {
    let response: any = await faunaClient.query(
      q.Create(
        q.Collection('myReferences'),
        {
          data: {
            ...data
          }
        }
      )
    );

    const createdNote = {
      id: response.ref.id,
      data: response.data,
      ts: response.ts,
      date: transformDate(response.ts),
    }

    return Response.json({ createdNote });
  } catch (error) {
    console.log(error)
  }
  // return Response.json({ response: "siiiim" });
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

  return Response.json({ response });
}