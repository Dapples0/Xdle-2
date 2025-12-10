/**
 * Input button component
 * @param {Object} props - props object
 * @returns a button representing an input
 */
export const InputButton = (props) => {
  const { buttonFunction, children } = props;

  return (
    <button type="button" className="text-white w-[7rem] h-[3.5rem] cursor-pointer border-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b] border-[#c4c6c9ff]" onClick={buttonFunction}>{children}</button>    
  )


}