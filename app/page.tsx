import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h2>
          Because I haven&apos;t used React before, and because it has been two
          and a half years since doing any serious front end work, here is a
          puzzle that I have always to implement. This is the MVP, please excuse
          my colour selection and layout and lack of options.
        </h2>
        <br />
        <h2 className={styles.sign}>Raewyn</h2>
        <br />
        <h2 className={styles.link}>
          <a href="puzzle">Click Here!</a>
        </h2>
      </div>
    </main>
  );
}
