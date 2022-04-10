import Head from "next/head";
import Quiz from "./quiz";
import Water from "./water";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>TLD Quiz</title>
        <meta
          name="description"
          content="How well do you know your top-level domains (TLDs)?"
        ></meta>
        <meta name="author" content="Andrew Healey" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Water />

      <main>
        <h1 className="title">TLD Quiz</h1>
        <p>How well do you know your top-level domains (TLDs)?</p>
        <p>
          Sure, you know <code>.com</code> and <code>.net</code>. It's not your
          first time on the Web.
        </p>
        <p>
          You might even know <code>.io</code> and <code>.so</code>. But what
          about <code>.blue</code> or, like, <code>.usa</code>?
        </p>
        <Quiz />
        <h2>Why?</h2>
        <p>
          My friend, a notorious domain hoarder, assured me that he knew{" "}
          <i>most of the TLDs</i> and{" "}
          <i>
            definitely wouldn't fail at any kind of TLD quiz (not that you'll
            make one).
          </i>
          <p>N.b. he failed this quiz.</p>
        </p>
        <h2>How?</h2>
        <p>
          There are{" "}
          <a
            href="https://www.icann.org/resources/pages/tlds-2012-02-25-en"
            target="_blank"
            rel="noopener noreferrer"
          >
            1487 TLDs
          </a>{" "}
          as of April 2022. I removed 153{" "}
          <a
            href="https://stackoverflow.com/a/64454283"
            target="_blank"
            rel="noopener noreferrer"
          >
            non-ASCII TLDs
          </a>{" "}
          that start with <code>XN--</code> and then used two methods to
          generate fake but realistic-looking TLDs:
        </p>
        <ul>
          <li>
            A Markov chain generator based on real TLDs (it would have been
            quicker to use random letters).
          </li>
          <li>
            A list of the most common English words (that aren't already TLDs).
          </li>
        </ul>
        <p>
          These scripts, and this Next.js website, is{" "}
          <a
            href="https://github.com/healeycodes/tld-quiz"
            target="_blank"
            rel="noopener noreferrer"
          >
            open source
          </a>
          .
        </p>
      </main>

      <footer>
        Built by{" "}
        <a
          href="https://twitter.com/healeycodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          @healeycodes
        </a>
      </footer>
    </div>
  );
}
