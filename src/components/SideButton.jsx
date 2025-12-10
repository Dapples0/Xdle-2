import { Tooltip } from 'react-tooltip';

export const SideButton = (props) => {
  const { buttonFunction, children, retry = false, hint = false, tries = 0 } = props;

  return (
    <>
      <aside className='pt-5 md:p-5'>
        {retry && <RetryButton buttonFunction={buttonFunction}>{children}</RetryButton>}
        {hint && <HintButton buttonFunction={buttonFunction} tries={tries}>{children}</HintButton>}
      </aside> 
    </>
      
  )
}

const RetryButton = (props) => {
  const { children, buttonFunction } = props;
  return (

    <>
      <button type='button' 
      className='text-white cursor-pointer border-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b] w-[3rem] md:w-[4rem] md:h-[2.7rem] pt-1 pb-1' 
      onClick={buttonFunction}>
        {children}
      </button>
    
    </>
  )

}

const HintButton = (props) => {
  const { children, buttonFunction, tries } = props;

  return (

    <>
      <div data-tooltip-id="tooltip" data-tooltip-content={tries !== 4 ? `${4 - tries} attempt(s) left to unlock` : ""} className='.container-rounded'>
        <button
          type="button"
          className="group relative cursor-pointer text-white border-1 rounded overflow-hidden w-[3rem] md:w-[4rem] md:h-[2.7rem] pt-1 pb-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b]"
          onClick={buttonFunction}>
          <div
            className="absolute inset-0 bg-green-700 transition-all duration-200 ease-out group-hover:bg-green-600"
            style={{ width: `${(tries / 4) * 100}%` }}>
          </div>
          <span className="relative z-10">{children}</span>
        </button>
        <Tooltip id="tooltip" place={"bottom"} border="1px solid red" className='tooltip-rounded' style={{ display: 'flex', flexDirection: 'column' }}>
        </Tooltip>        
      </div>
    </>
  )

}