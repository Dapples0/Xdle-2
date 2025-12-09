export const InputButton = (props) => {
  const { buttonFunction, children } = props;

  return (
    <button type="button" className="text-white w-[7rem] h-[3.5rem] cursor-pointer border-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b]" onClick={buttonFunction}>{children}</button>    
  )


}