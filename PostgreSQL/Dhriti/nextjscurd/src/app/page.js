import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  dbConnect();

  // create
  async function createNote(data) {
    "use server";
    let note = data.get("note")?.valueOf();
    let date = data.get("date")?.valueOf();
    try {
      const newNote = await pool.query(
        "INSERT INTO notes (note, date) VALUES ($1, $2) RETURNING *",
        [note, date]
      );
      console.log(newNote.rows[0]);
    } catch (err) {
      console.log(err);
    }
    redirect("/");
  }

  // read
  const data = await pool.query("SELECT * FROM notes");
  const result = data.rows;

  // delete
  async function deleteNote(data) {
    "use server";
    let id = data.get("id").valueOf();

    try {
      await pool.query("DELETE FROM notes WHERE id = $1", [id]);
      console.log("note deleted");
    } catch (err) {
      console.log(err);
    }
    redirect("/");
  }

  return (
    <>
      <div>
        <h1>todo</h1>
        <br />
        <form action={createNote}>
          <input type="text" name="note" id="note" />
          <br />
          <input type="date" name="date" id="date" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <br />
      <div>
        {result.map((element) => {
          return (
            <>
              <ul className="flex my-2 gap-4">
                <li>{element.note}</li>
                <li>{element.date}</li>
                <li>
                  <Link href={`/edit/${element.id}`}>
                    <button>edit</button>
                  </Link>
                  <form action={deleteNote}>
                    <input type="hidden" name="id" value={element.id} />
                    <button className="ml-4" type="submit">
                      delete
                    </button>
                  </form>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}
