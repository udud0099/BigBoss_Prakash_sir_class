import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function edit({ params }) {
  dbConnect();
  const id = params.id;
  const data = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
  const result = data.rows[0];

  async function updateNote(data) {
    "use server";
    let note = data.get("note").valueOf();
    let date = data.get("date").valueOf();

    try {
      const updatedNote = await pool.query(
        `UPDATE notes SET note = $1, date = $2 WHERE id = $3`,
        [note, date, id]
      );
      console.log("note update", updatedNote);
    } catch (err) {
      console.error("error in updatein");
    }
    redirect("/");
  }
  return (
    <>
      <div>
        <h1>todo</h1>
        <br />
        <form action={updateNote}>
          <input type="text" name="note" id="note" defaultValue={result.note} />
          <br />
          <input type="date" name="date" id="date" defaultValue={result.date} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <br />
    </>
  );
}
