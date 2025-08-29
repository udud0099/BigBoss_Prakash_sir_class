import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <form action="" method="POST">
          <input type="text" placeholder="text" id="note" name="note" /> <br />{" "}
          <br />
          <input
            type="date"
            placeholder="date"
            id="date"
            name="date"
          /> <br /> <br />
          <button type="submit">sub</button>
        </form>
      </div>
    </>
  );
}
