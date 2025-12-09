import { useState, useEffect  } from 'react'
import { InputButton } from './components/InputButton';
import { HistoryBox, InputBox } from './components/Boxes';
import './index.css'
import { VictoryModal } from './components/Modal';

function App() {
  const [ xdle, setXdle ] = useState(null);
  const [ history, setHistory ] = useState(["12321", "22"]);
  const [ tries, setTries ] = useState(0);
  const [ win, setWin ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ input, setInput ] = useState("");
  const [ hints, setHints ] = useState({
    multiple: [],
    lessOrGreater: [],
    range: [],
  })

  const handleInput = (num) => {
    if (win) {
      return;
    }

    setInput(prev =>
      prev.length >= 6 ? prev : prev + num
    );
  }

  const removeInput = () => {
    if (win) {
      return;
    }

    setInput(prev => 
      prev.length === 0 ? prev : prev.slice(0, input.length - 1)
    )
  }

  const clearInput = () => {
    if (win) {
      return;
    }
    setInput("");
  }

  const multipleHint = (x, num) => {
    if (num === 0 || x === 0) {
        return;
    }

    if (x % num === 0) {
      setHints((prev) => ({
        ...prev,
        multiple: [...prev.multiple, `Is a multiple of ${num}`]
      }));
    }

    if (num % x === 0) {
      setHints((prev) => ({
        ...prev,
        multiple: [...prev.multiple, `${num} is a multiple of X`]
      }));
    }
  }

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

  const equalityHint = (x, num) => {
    setHints((prev) => ({
      ...prev,
      range: [...prev.range, 
        (x > num) 
        ? `${num} is within 1000 numbers of X` 
        : `Less than ${num}`
        ]
    }));

  }

  const handleEnter = () => {
    if (win) {
      return;
    }

    if (history.includes(input)) {
      return;
    }

    if (input === xdle) {
      setShowModal(true);
      setWin(true);
      setInput("");
    } else {
      setTries(tries + 1);
    }

    setHistory([...history, input]);

    
  }

  const startGame = () => {
    setWin(false);
    setHistory(["12321", "22"]);
    setInput("");
    setHints([{
      multiple: [],
      lessOrGreater: [],
      range: [],
    }]);
    setXdle(Math.floor(Math.random() * 99999).toString());
    setShowModal(false);
  }

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
    <div className='flex flex-col justify-center items-center h-screen bg-[#1f1e25]'>
      <VictoryModal show={showModal} setModal={() => setShowModal()}></VictoryModal>
      <section className='flex flex-row gap-[2rem]'>
        <aside><button type='button' className='text-white cursor-pointer'>Reset</button></aside>    
        <section className='pb-5'>
          {xdle &&
            history.map((item, index) => 
              <HistoryBox key={index} num={item} xdle={xdle}></HistoryBox>
            )
          }
        </section>
        <aside><button type='button' className='text-white cursor-pointer'>Hint</button></aside>   
      </section>

      <section className='pb-5'>
        <p className='text-white'>{xdle}</p>
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
