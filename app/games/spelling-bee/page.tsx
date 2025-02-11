"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
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

  function handleKeyPressInputBox(e: KeyboardEvent<HTMLInputElement>): void {
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

  const handleKeyPressPage = useCallback(
    (event: globalThis.KeyboardEvent) => {
      // Check if it's the spacebar and not a repeated event
      if (event.code === "Space" && !event.repeat) {
        event.preventDefault(); // Prevent page scrolling
        speakWord();
      }
    },
    [speakWord]
  );

  // Set up the event listener
  useEffect(() => {
    // Add the event listener
    window.addEventListener("keydown", handleKeyPressPage);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("keydown", handleKeyPressPage);
    };
  }, [handleKeyPressPage]);

  return (
    <div className="grid grid-cols-3">
      <h1 className="pl-1 text-2xl font-bold">Spelling Bee</h1>
      <div>
        <div className="flex flex-col items-center pt-3 gap-3">
          <div className="text-sm">Level: {difficulty}</div>
          <Input
            type="text"
            onChange={(e) => setInputWord(e.target.value)}
            onKeyUp={handleKeyPressInputBox}
            placeholder="Enter Guess"
            spellCheck="false"
            className="w-80"
          />
          <div className="flex gap-3">
            <Button onClick={speakWord} variant="outline">
              <div className="flex gap-2 items-center">
                <SpeakerLoudIcon />
                Speak Word ( &#9251; )
              </div>
            </Button>
            <Button type="submit" onClick={handleOnSubmit}>
              Submit ( &#8629; )
            </Button>
          </div>
        </div>
        <div className="max-h-[55vh] overflow-y-auto text-center py-4">
          {[...guessHistory].reverse().map((guess) => (
            <>
              {guess.correct ? (
                <div className="py-1">
                  <h1 className="font-bold text-green-400">Correct!</h1>
                  <p>{guess.guess}</p>
                </div>
              ) : (
                <div className="py-1">
                  <h1 className="font-bold text-red-400">Incorrect</h1>
                  <p>Guess: {guess.guess}</p>
                  <p>Word: {guess.word}</p>{" "}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
