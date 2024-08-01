"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import { KeyboardEvent, useState } from "react";
import { words } from "./tempWords";

type Difficulty = "Easy" | "Medium" | "Hard";

export default function SpellingBee() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [activeWord, setActiveWord] = useState<string>(getRandomWord("Easy"));
  const [inputWord, setInputWord] = useState<string>(getRandomWord("Easy"));

  const voices = speechSynthesis.getVoices();
  const britishVoice = voices.find(
    (voice) => voice.name === "Google UK English Male"
  );

  function getRandomWord(level: Difficulty): string {
    return words[level][Math.floor(Math.random() * words[level].length)];
  }

  function speakWord(): void {
    const utterance = new SpeechSynthesisUtterance(activeWord);
    if (britishVoice) {
      utterance.voice = britishVoice;
    }
    window.speechSynthesis.speak(utterance);
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  }

  function handleOnSubmit(): void {
    if (inputWord.toLowerCase() === activeWord) {
      console.log("Correct, difficulty:", difficulty, "count:", numCorrect + 1);
      if (difficulty === "Easy" && numCorrect + 1 > 4) {
        setDifficulty("Medium");
        setNumCorrect(0);
      } else if (difficulty === "Medium" && numCorrect + 1 > 4) {
        setDifficulty("Hard");
        setNumCorrect(0);
      } else {
        setNumCorrect(numCorrect + 1);
      }
      setActiveWord(getRandomWord(difficulty));
    } else {
      console.log("Incorrect", activeWord);
    }
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
    </>
  );
}
