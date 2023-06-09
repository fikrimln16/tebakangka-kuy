import React, { useState, useEffect } from "react";
import "./App.css";

function generateRandomNumbers(length) {
  let numbers = new Set();
  while (numbers.size < length) {
    let randomNum = Math.floor(Math.random() * 10).toString();
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}

const App = () => {
  const [chance, setChance] = useState(10);
  const [array, setArray] = useState(generateRandomNumbers(6));
  const [gameOver, setGameOver] = useState(false);
  const [openingMessages, setOpeningMessages] = useState([
    "Selamat datang di permainan tebak angka!",
    "Ketik 'exit' kapan saja untuk keluar dari permainan.",
    "Silakan masukkan tebakan Anda:",
  ]);
  const [messages, setMessages] = useState([]);
  const [succes, setSuccess] = useState([]);
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    setOpeningMessages([
      "Selamat datang di permainan tebak angka!",
      "Silakan masukkan tebakan Anda:",
    ]);
  }, []);

  function handleInput(index, input) {
    const newGuesses = [...guesses];
    newGuesses[index] = input;
    setGuesses(newGuesses);
  }

  function handleGuess() {
    const input = guesses.join(" ");
    if (input.toLowerCase() === "exit") {
      setMessages(["Terima kasih telah bermain!"]);
      setGameOver(true);
    } else {
      let inputNumbers = input.split(" ");
      let correctNumbers = 0;
      let correctPositions = 0;
      let posisiBenar = [];
      for (let i = 0; i < array.length; i++) {
        if (inputNumbers.includes(array[i])) {
          correctNumbers++;
        }
        if (inputNumbers[i] === array[i]) {
          correctPositions++;
          posisiBenar.push(inputNumbers[i]);
        }
      }
      if(posisiBenar.length > 0 ){
        setSuccess([...succes, `Asik, Angka ${posisiBenar} sudah benar posisinya!`])
      }
      if (correctPositions === 6) {
        alert(`Selamat, Anda berhasil menebak angka. Angka yang benar adalah ${array}`);
        setMessages([
          ...messages,
          `Selamat, Anda berhasil menebak angka. Angka yang benar adalah ${array} Refresh, untuk memulai kembali!`,
        ]);
        setGameOver(true)
      } else {
        setChance(chance - 1);
        if (chance === 0) {
          setMessages([`Anda gagal, jawaban yang benar adalah: ${array}`]);
          setGameOver(true);
        } else {
          setMessages([
            ...messages,
            `Angka anda adalah : ${inputNumbers}. Angka yang benar: ${correctNumbers} dan Posisi yang benar: ${correctPositions}, tersisa ${chance} kesempatan.`,
          ]);
          setGuesses(["", "", "", "", "", ""]);
        }
      }
    }
  }

  return (
    <div className="App">
      <div className="title">
        {openingMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>
        {guesses.map((guess, index) => (
          <input
            key={index}
            type="number"
            value={guess}
            onChange={(event) => handleInput(index, event.target.value)}
            required
          />
        ))}
      </div>
      <div>
      {succes.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <button onClick={handleGuess} disabled={gameOver}>
        Tebak
      </button>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>created by pikeriii.</div>
    </div>
  );
};

export default App;
