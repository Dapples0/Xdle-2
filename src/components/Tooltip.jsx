export const Tooltip = () => {


  return (
    <>
      <button data-tooltip-target="tooltip-default" type="button" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Default tooltip</button>

      <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
          Tooltip content
          <div class="tooltip-arrow" data-popper-arrow></div>
      </div>


    
    </>
      
  )
}