import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <h1>todo</h1>
        <br />
        <form>
          <input type="text" name="note" id="note" />
          <br />
          <input type="date" name="date" id="date" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
