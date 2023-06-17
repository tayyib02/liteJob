import React,{useState} from 'react'
import { Switch } from '@headlessui/react'
import languages from './language';

const LeftSortField = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState('');
  const [enabled, setEnabled] = useState(false)
  const [languageFilter, setLanguageFilter] = useState(false)


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submitBudgetValue();
    }
  }

  const submitBudgetValue = () => {
    // Do something with the value, like submit it to a server
    console.log(budget);
  }

  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? languages : languages.slice(0, 11);




  return (
    <div className="hidden bg-white py-4  md:flex">
      <div className="max-w-2xl w-[15rem] ml-10 ">
        <div className="border border-gray-300 rounded-lg absolute right-0 w-[12rem] mr-10">
          {/* SORT FILTER */}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)} >
            <h2 className="text-lg font-medium">Filter</h2>
            <svg className={`w-5 h-5 transition-transform transform ${ isOpen ? 'rotate-180' : '' }`} viewBox="0 0 20 20" fill="currentColor" >
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z" clipRule="evenodd" />
            </svg>
          </div>

          {isOpen && (
            <div className="p-4">
              <div className="grid grid-cols gap-4 ">

                <div  className="flex items-center space-x-2">
                  <label htmlFor="checkbox1">Budget</label>
                  <input type="text" id="budgetBox" value={budget} onChange={(event) => setBudget(event.target.value)} onKeyPress={handleKeyPress}  className='border-gray-400 border-2 w-[5rem] pl-2 rounded-md' placeholder='£150' />
                </div>

                <div className="relative inline-flex items-center cursor-pointer">
                  <span className='mr-3'>City</span>
                  <Switch checked={enabled} onChange={setEnabled} className={`${!enabled ? 'bg-gray-700' : 'bg-[#014e56]'} relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className="sr-only">Use setting</span>
                    <span aria-hidden="true" className={`${enabled ? 'translate-x-[1.27rem]' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                  </Switch>
                  <span className='ml-3'>National</span>
                </div>                

                <div className="flex items-center space-x-2 ">
                  <input type="checkbox" id="checkbox1" className='w-7 h-7 accent-[#014e56]' />
                  <label htmlFor="checkbox1">Top rated</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="checkbox2" className='w-7 h-7 accent-[#014e56]' />
                  <label htmlFor="checkbox2">Most popular</label>
                </div>

              </div>


              {/* LANGUAGE FILTER */}
              <div className="border border-gray-300 rounded-lg mt-3">

                <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setLanguageFilter(!languageFilter)} >
                  <h2 className="text-lg font-medium">Languages</h2>
                  <svg className={`w-5 h-5 transition-transform transform ${ languageFilter ? 'rotate-180' : '' }`} viewBox="0 0 20 20" fill="currentColor" >
                    <path fillRule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z" clipRule="evenodd" />
                  </svg>
                </div>

                {languageFilter && (
                  <div className="p-4">
                    <div className="grid grid-cols gap-4">

                    {visibleOptions.map((language) => ( 
                      <div key={languages} className="flex items-center space-x-2 text-lg">
                        <input type="checkbox" id={language} name={language} className='w-7 h-7 accent-[#014e56]'  />
                        <label htmlFor={language}>{language}</label>
                      </div>
                    ))}
                    {!showAll && (
                      <button onClick={() => setShowAll(true)} className='flex-start flex underline text-lg'>Show more</button>
                    )}
                    {showAll && (
                      <button onClick={() => setShowAll(false)} className='flex-start flex underline text-lg '>Show less</button>
                    )}    

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>


  )
}

export default LeftSortField