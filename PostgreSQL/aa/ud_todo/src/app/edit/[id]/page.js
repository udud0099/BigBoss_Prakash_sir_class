import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function edit({ params }) {
  dbConnect();
  const id = params.id;
  const data = await pool.query("SELECT * FROM ud_todo_list WHERE id = $1", [
    id,
  ]);
  const result = data.rows[0];

  async function updateNote(data) {
    "use server";
    let task = data.get("task").valueOf();

    try {
      const updatedNote = await pool.query(
        `UPDATE ud_todo_list SET task = $1  WHERE id = $2`,
        [task, id]
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
          <input type="text" name="task" id="task" defaultValue={result.task} /> 
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <br />
    </>
  );
}
