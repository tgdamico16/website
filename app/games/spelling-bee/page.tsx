"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import { KeyboardEvent, useState } from "react";
import { words } from "../../../components/spelling-bee/tempWords";

type Difficulty = "Easy" | "Medium" | "Hard";

type GuessResult = {
  word: string;
  guess: string;
  correct: boolean;
};

export default function SpellingBee() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [activeWord, setActiveWord] = useState<string>(getRandomWord("Easy"));
  const [inputWord, setInputWord] = useState<string>(getRandomWord("Easy"));
  const [guessHistory, setGuessHistory] = useState<GuessResult[]>([]);

  function getRandomWord(level: Difficulty): string {
    return words[level][Math.floor(Math.random() * words[level].length)];
  }

  function speakWord(): void {
    const utterance = new SpeechSynthesisUtterance(activeWord);
    window.speechSynthesis.speak(utterance);
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  }

  function handleOnSubmit(): void {
    const correct = inputWord.toLowerCase() === activeWord;
    if (correct) {
      console.log("Correct, difficulty:", difficulty, "count:", numCorrect + 1);
      let newDifficulty = difficulty;
      if (difficulty === "Easy" && numCorrect + 1 > 4) {
        newDifficulty = "Medium";
        setDifficulty("Medium");
        setNumCorrect(0);
      } else if (difficulty === "Medium" && numCorrect + 1 > 4) {
        newDifficulty = "Hard";
        setDifficulty("Hard");
        setNumCorrect(0);
      } else {
        setNumCorrect(numCorrect + 1);
      }
      let newActiveWord = getRandomWord(newDifficulty);
      while (newActiveWord === activeWord) {
        newActiveWord = getRandomWord(newDifficulty);
      }
      setActiveWord(newActiveWord);
    } else {
      console.log("Incorrect", activeWord);
    }
    setGuessHistory((prevHistory) => [
      ...prevHistory,
      {
        word: activeWord,
        guess: inputWord,
        correct,
      },
    ]);
  }
  return (
    <>
      <h1 className="text-center text-xl font-bold">Spelling Bee</h1>
      <div>Level: {difficulty}</div>
      <div>
        <Button onClick={speakWord}>
          <SpeakerLoudIcon />
        </Button>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            onChange={(e) => setInputWord(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Enter Spelling"
            spellCheck="false"
          />
          <Button type="submit" onClick={handleOnSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className="max-h-[55vh] overflow-y-auto">
        {[...guessHistory].reverse().map((guess) => (
          <>
            {guess.correct ? (
              <div className="py-1">
                <h1 className="font-bold">Correct!</h1>
                <p>{guess.guess}</p>
              </div>
            ) : (
              <div className="py-1">
                <h1>{guess.correct ? "Correct!" : "Incorrect"}</h1>
                <p>Guess: {guess.guess}</p>
                <p>Word: {guess.word}</p>{" "}
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}
