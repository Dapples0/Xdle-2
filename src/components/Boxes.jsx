const Box = (props) => {
  const { history = false, position = false, num, size } = props;

  const handlePosition = () => {
    return history ? !position ? "bg-red-900" : "bg-green-600" : "";
  }
  return (
    <>
      <div className={`flex flex-col justify-center items-center box-border ${size} ${handlePosition()} border-2 text-white text-lg transition-colors duration-100`}
      style={{ borderColor: (num !== "" && !history) ? '#a3a4a7ff' : '#5b606bff' }}
      ><p>{num}</p></div>
    </>
  )
}


export const InputBox = (props) => {
  const { input } = props;

  const handleNum = () => {
    const split = input.split("");
    while (split.length < 6) {
      split.unshift("");
    }
    return split;
  }

  return (
    <>
      {
        <div className="flex row gap-2">
          {handleNum().map((item, index) => 
            <Box key={index} num={item} size={"size-16"} history={false}></Box>
          )}
                   
        </div>
      }
    </>
  )
}

export const HistoryBox = (props) => {
  const { num, xdle } = props;

  const handleNum = (num) => {
    const split = num.split("");
    while (split.length < 6) {
      split.unshift("");
    }
    return split;
  }

  const handlePosition = (item, index) => {
    const split = handleNum(xdle);
    return split[index] === item;
  }


  return (
    <>
      {
        <div className="flex row gap-2 pb-2">
          {handleNum(num).map((item, index) => 
            <Box key={index} num={item} size={"size-13"} history={true} position={handlePosition(item, index)}></Box>
          )}
                   
        </div>
      }
    </>
  )

}