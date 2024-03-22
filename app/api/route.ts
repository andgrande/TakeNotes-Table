'use server'
import console from 'console';
import { Index, query as q } from 'faunadb';
import faunadb from 'faunadb';

type InputReq = {
  id: number,
  isUsed?: boolean,
}

let db_in_use = 'myReferences';

const environment = process.env.NODE_ENV;
// if (environment != 'production') db_in_use = 'myTest';  

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
        // q.Get(
        //     q.Documents(q.Collection(`${db_in_use}`))
        // )
    // )

    q.Map(
      q.Paginate(
        // q.Match(Index(("note_paper_idx"), "3115 Task 2")),
        q.Documents(q.Collection(`${db_in_use}`)),
        { size: 150 }
      ),
      q.Lambda(x => q.Get(x))
    )
  );

  // console.log(response.data.length)

  // const previousDate = new Date('03/21/2024').getTime();
  const enhancedResponse = response.data.map((item: any) => {
    return {
      id: item.ref.id,
      data: item.data,
      ts: item.ts,
      date: transformDate(item.ts),
    }
  })

  // const tempFilteredResponse = [...enhancedResponse.data.filter((item: any) => item.ts > previousDate)]

  return Response.json(enhancedResponse)
}

export async function POST(request: Request) {
  const data: any = await request.json();

  // q.Collection should receive a dynamic parameter to define collection
  try {
    let response: any = await faunaClient.query(
      q.Create(
        q.Collection(`${db_in_use}`),
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
}

export async function DELETE(request: Request) {
  const data: InputReq = await request.json();

  const { id } = data;

  let response = await faunaClient.query(
    q.Delete(
      q.Ref(
        q.Collection(`${db_in_use}`),
        id
      )
    )
  )

  return Response.json({ response });
}

export async function PATCH(request: Request) {
  const data: InputReq = await request.json();

  const { id, isUsed } = data;

  let response = await faunaClient.query(
    q.Update(
      q.Ref(
        q.Collection(`${db_in_use}`),
        id
      ),
      {
        data: {
          isUsed
        }
      }
    )
  );

  return Response.json({ response });
}