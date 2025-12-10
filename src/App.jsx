import { useState, useEffect  } from 'react'
import { InputButton } from './components/InputButton';
import { HistoryBox, InputBox } from './components/Boxes';
import { VictoryModal, LoseModal } from './components/Modal';
import { HintButton, RetryButton } from './components/SideButton';
import './index.css';

function App() {
  // Initialise state variables
  const [ xdle, setXdle ] = useState(null);
  const [ history, setHistory ] = useState([]);
  const [ tries, setTries ] = useState(0);
  const [ gameEnd, setGameEnd ] = useState(false);
  const [ showLoseModal, setShowLoseModal] = useState(false);
  const [ showWinModal, setShowWinModal ] = useState(false);
  const [ input, setInput ] = useState("");
  const [ hints, setHints ] = useState({
    range: [],
    equality: [],
    multiple: [],
  })

  /**
   * Handles adding inputs
   * @param {number} num - input number
   */
  const handleInput = (num) => {
    if (gameEnd) {
      return;
    }

    setInput(prev =>
      prev.length >= 6 ? prev : prev + num
    );
  }

  /**
   * Handles removing inputs
   */
  const removeInput = () => {
    if (gameEnd) {
      return;
    }

    setInput(prev => 
      prev.length === 0 ? prev : prev.slice(0, input.length - 1)
    )
  }

  /**
   * Clears input
   */
  const clearInput = () => {
    if (gameEnd) {
      return;
    }
    setInput("");
  }

  /**
   * Finds multiple hint from input
   * @param {number} x - xdle number
   * @param {number} num - input number
   */
  const multipleHint = (x, num) => {
    if (num === 0 || x === 0) {
        return;
    }

    if (x % num === 0) {
      setHints((prev) => ({
        ...prev,
        multiple: [...prev.multiple, `Is a multiple of ${num}`]
      }));
      return;
    }

    if (num % x === 0) {
      setHints((prev) => ({
        ...prev,
        multiple: [...prev.multiple, `${num} is a multiple of X`]
      }));
      return;
    }
  }

  /**
   * Finds range hint from input
   * @param {number} x - xdle number
   * @param {number} num - input number
   */
  const rangeHint = (x, num) => {
    const equality = Math.abs(x - num);
    if (equality <= 10) {
      setHints((prev) => ({
        ...prev,
        range: [...prev.range, `${num} is within 10 numbers of X`]
      }));      
      return;
    }

    if (equality <= 100) {
      setHints((prev) => ({
        ...prev,
        range: [...prev.range, `${num} is within 100 numbers of X`]
      }));
      return;
    }

    if (equality <= 1000) {
      setHints((prev) => ({
        ...prev,
        range: [...prev.range, `${num} is within 1000 numbers of X`]
      }));
      return;
    }

  }

  /**
   * Finds equality hint from input
   * @param {number} x - xdle number
   * @param {number} num - input number
   */
  const equalityHint = (x, num) => {
    setHints((prev) => ({
      ...prev,
      equality: [...prev.equality, 
        (x > num) 
        ? `Greater than ${num}` 
        : `Less than ${num}`
        ]
    }));

  }

  /**
   * Handles enter state
   */
  const handleEnter = () => {
    if (gameEnd) {
      return;
    }

    if (history.includes(input)) {
      return;
    }

    if (input === xdle) {
      setShowWinModal(true);
      setGameEnd(true);
      setInput("");
    } else {
      setTries(tries + 1);
      handleHints();
    }
    const newHistory = [...history];

    newHistory[tries] = input;
    setHistory(newHistory);
    
  
    if (tries + 1 === 6) {
      setShowLoseModal(true);
      setInput("");
      setGameEnd(true);
    }
  }

  /**
   * Handles hints by adding it to hint state object
   */
  const handleHints = () => {
    equalityHint(xdle, input);
    rangeHint(xdle, input);
    multipleHint(xdle, input);
  }

  /**
   * Initialises a game
   */
  const startGame = () => {
    setGameEnd(false);
    setTries(0);
    setHistory(["", "", "", "", "", ""]);
    setInput("");
    setHints({
      range: [],
      equality: [],
      multiple: [],
    });
    setXdle(Math.floor(Math.random() * 99999).toString());
    setShowWinModal(false);
    setShowLoseModal(false);
  }

  /**
   * Listens to keyboard presses
   * @param {EventListenerObject} e - event listener
   */
  const handleClick = (e) => {  
    if (e.key == "Backspace") {
      removeInput();
    }

    if (e.repeat) return;  
 
    if (/^\d$/.test(e.key)) {
      handleInput(e.key);
    }
  }

  useEffect(() => {
    startGame();
    window.addEventListener("keydown", handleClick);
  }, []);

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen bg-[#1f1e25] p-5'>
        <VictoryModal show={showWinModal} setModal={() => setShowWinModal()}></VictoryModal>
        <LoseModal show={showLoseModal} setModal={() => setShowLoseModal()} num={xdle}></LoseModal>
        <section className='flex flex-row'>
          <RetryButton buttonFunction={() => startGame()}>Reset</RetryButton>
          <section className='flex flex-col justify-center items-center pb-5 w-[24rem]'>
            {xdle &&
              history.map((item, index) => 
                <HistoryBox key={index} num={item} xdle={xdle}></HistoryBox>
              )
            }
          </section>
          <HintButton tries={tries} hints={hints}>Hint</HintButton>
        </section>
        <section className='pb-5'>
          <InputBox input={input}></InputBox>
        </section>
        <section className='grid grid-cols-3 gap-2'>
          <InputButton buttonFunction={() => handleInput(1)}><p className='text-xl'>1</p></InputButton>
          <InputButton buttonFunction={() => handleInput(2)}><p className='text-xl'>2</p></InputButton>
          <InputButton buttonFunction={() => handleInput(3)}><p className='text-xl'>3</p></InputButton>
          <InputButton buttonFunction={() => handleInput(4)}><p className='text-xl'>4</p></InputButton>
          <InputButton buttonFunction={() => handleInput(5)}><p className='text-xl'>5</p></InputButton>
          <InputButton buttonFunction={() => handleInput(6)}><p className='text-xl'>6</p></InputButton>
          <InputButton buttonFunction={() => handleInput(7)}><p className='text-xl'>7</p></InputButton>
          <InputButton buttonFunction={() => handleInput(8)}><p className='text-xl'>8</p></InputButton>
          <InputButton buttonFunction={() => handleInput(9)}><p className='text-xl'>9</p></InputButton>
          <InputButton buttonFunction={() => removeInput()}>Back</InputButton>
          <InputButton buttonFunction={() => handleInput(0)}><p className='text-xl'>0</p></InputButton>
          <InputButton buttonFunction={() => handleEnter()}>Enter</InputButton>
        </section>
        <section className='pt-2'>
          <InputButton buttonFunction={() => clearInput()}>Clear</InputButton>
        </section>
        
      </div>
    </>
  )
}

export default App
