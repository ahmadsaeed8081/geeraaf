// Accordion.js

import { Link } from 'react-router-dom';

export default function Accordion(props) {
  return (
    <>
      <div className=" tw-border-b">
        <button
          className="tw-w-full tw-text-white   tw-bg-transparent tw-py-4  tw-flex sm:tw-text-[18px] tw-text-[15px] tw-justify-between  tw-text-left
                            tw-transition tw-duration-300"
          onClick={props.toggleAccordion}
        >
         
          <p className=" m-0 tw-text-black  tw-font-semibold sm:tw-text-lg  tw-text-[12px]">{props.title}</p>
          {/* <p
            className={` m-0 tw-transform ${
              props.isOpen ? "rotate-180" : "rotate-0"
            } 
                                 transition-transform duration-300`}
          >
            &#9660;
          </p> */}


          <div className='  tw-w-12 tw-flex tw-justify-end  tw-text-center'>
            <img src={require('../../assets/images/i.fas.png')}  className='' />
          </div>


        </button>
        {props.isOpen && (
        <div className="  tw-text-black  tw-font-light tw-pb-4 sm:tw-text-[16px] tw-text-[10px]">{props.data}  </div>
      )}
      </div>

     
    </>
  );
}
