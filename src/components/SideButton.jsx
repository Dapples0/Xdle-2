import { Tooltip } from 'react-tooltip';

export const RetryButton = (props) => {
  const { children, buttonFunction } = props;
  return (
    <>
      <aside className='pt-5 md:p-10'>
        <button type='button' 
        className='text-white cursor-pointer border-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b] w-[3rem] md:w-[4rem] md:h-[2.7rem] pt-1 pb-1' 
        onClick={buttonFunction}>
          {children}
        </button>
      </aside>
    </>
  )

}

export const HintButton = (props) => {
  const { children, tries, hints } = props;
  return (
    <>
      <aside className='pt-5 md:p-10'>
        <div data-tooltip-id="tooltip" className='cotainer'>
          <button
            type="button"
            className="group relative cursor-pointer text-white border-1 rounded overflow-hidden w-[3rem] md:w-[4rem] md:h-[2.7rem] pt-1 pb-1 rounded bg-[#1f1e25] hover:bg-[#3f3d4b]"
            >
            <div
              className="absolute inset-0 bg-green-700 transition-all duration-200 ease-out group-hover:bg-green-600"
              style={{ width: `${(tries / 4) * 100}%` }}>
            </div>
            <span className="relative z-10">{children}</span>
          </button>

        </div>
          <Tooltip id="tooltip" place={"bottom"} border="1px solid red" className='tooltip' openOnClick={true} globalCloseEvents={{"clickOutsideAnchor": true}}>
            {tries < 4 && <span>{`${4 - tries} attempt(s) left to unlock`}</span>}
            {tries >= 4 && hints && Object.entries(hints).map(([type, items]) => (
              items.length > 0 && 
              <ul key={type}>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>)
            )}
          </Tooltip>
      </aside>
 
    </>
  )

}