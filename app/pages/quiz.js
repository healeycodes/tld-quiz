import { useState } from "react";
import TLDs from "../data/tlds.json";

// https://stackoverflow.com/a/12646864
const shuffleArray = (array) => {
  let ret = array;
  for (let i = ret.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }
  return ret;
};

const realTLD = () => TLDs.real[Math.floor(Math.random() * TLDs.real.length)];
const fakeChainTLD = () =>
  TLDs.fake_chain_tlds[Math.floor(Math.random() * TLDs.fake_chain_tlds.length)];
const fakeCommonTLD = () =>
  TLDs.fake_common_tlds[
    Math.floor(Math.random() * TLDs.fake_common_tlds.length)
  ];

const Quiz = () => {
  const [score, setScore] = useState([0, 0]);
  const [lastAnswer, setLastAnswer] = useState(null);

  const real = realTLD();
  let fake;
  let kind;
  if (Math.random() < 0.5) {
    kind = "a Markov chain generated TLD";
    fake = fakeChainTLD();
  } else {
    kind = "just a common word";
    fake = fakeCommonTLD();
  }

  const correctAnswer = (
    <button
      onClick={() => {
        const newScore = score[0] + 1;
        const newTotalScore = score[1] + 1;
        setScore([newScore, newTotalScore]);
        setLastAnswer(
          <>
            Yup, <code>.{real}</code> is a real TLD.{" "}
            {`So far, ${newScore}/${newTotalScore} correct.`}
          </>
        );
      }}
    >
      .{real}
    </button>
  );
  const incorrectAnswer = (
    <button
      onClick={() => {
        const newTotalScore = score[1] + 1;
        setScore([score[0], newTotalScore]);
        setLastAnswer(
          <>
            Nope, <code>.{fake}</code> is {kind}.{" "}
            {`So far, ${score[0]}/${newTotalScore} correct.`}
          </>
        );
      }}
    >
      .{fake}
    </button>
  );

  let questionOne = null;
  let questionTwo = null;

  // TODO: Can someone tell me how to only render this client-side please
  if (typeof window !== "undefined") {
    [questionOne, questionTwo] = shuffleArray([correctAnswer, incorrectAnswer]);
  }

  const emptyStateForSpacing = (
    // TODO: Is this the best a11y behavior?
    <button aria-hidden="true" style={{ visibility: "hidden" }}>
      .
    </button>
  );
  return (
    <>
      <p>Answer me this, which of these TLDs is the real one?</p>
      {questionOne ? questionOne : emptyStateForSpacing}
      {questionTwo ? questionTwo : emptyStateForSpacing}
      <p>{lastAnswer ? lastAnswer : <br />}</p>
    </>
  );
};

export default Quiz;
