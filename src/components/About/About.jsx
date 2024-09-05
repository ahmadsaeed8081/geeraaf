import React from 'react'
import Button from '../Button'
import { FaArrowRight } from 'react-icons/fa6'
// import EBM_Avenue from '../EBM_avenue'
const About = () => {
  return (
    <div  id='aboutSection'  className='  tw-relative tw-py-20  tw-w-full tw-h-auto'>
          
      <div className='container'>
        <div className='row   g-5 tw-items-center'>
            <div className='col-lg-7 col-md-12'>
              <span className='  tw-text-textColor tw-font-semibold tw-text-[18px] sm:tw-justify-start tw-justify-center tw-flex tw-items-center tw-gap-4'>  <p className='  tw-font-syne m-0 tw-w-16 tw-h-0.5  tw-bg-green'></p> STAKING</span>
              <h1 className="  tw-text-textColor  tw-font-bold tw-font-syne tw-pt-4">
              How to Stake ?
          
            </h1>
           <ul className=' tw-p-0  tw-leading-5'>
            <li>
            <h2 className="  tw-text-textColor  tw-font-bold tw-font-syne tw-pt-4">
            
            Add GEE Tokens
          
            </h2>
            <p className=" tw-text-black   tw-leading-8 tw-pt-4 tw-text-xl">
            You will need tokens in your wallet to stake. Once you purchase GEE tokens, make sure that you add the GEE token to your MetaMask/TrustWallet Wallet so you can view your GEE balance.   </p>
            </li>
            <li>
            <h2 className="  tw-text-textColor tw-font-bold tw-font-syne tw-pt-4">
            
            Connect & Verify Wallet
          
            </h2>
            <p className=" tw-text-black    tw-leading-8 tw-pt-4 tw-text-xl">
            Click the "Connect Wallet" button at the upper right corner of the site and make sure you have the Arbitrum network selected in your MetaMask wallet.   </p>
            </li>
            <li>
            <h2 className="  tw-text-textColor tw-font-bold tw-pt-4 tw-font-syne">
            
            Stake Wallet
          
            </h2>
            <p className=" tw-text-black  tw-leading-8 tw-pt-4 tw-text-xl">
            You'll need to click the 'Stake GEE' and scroll to the top of the page to bring up the staking interface on the site. </p>
            </li>
           </ul>
        
           
            <Button
                   
                rIcons={<FaArrowRight color="#000" />}
                label={" More Details"}
                className={"  tw-mt-7 tw-font-semibold"}
                
              />




            </div>
            <div className='col-lg-5 col-md-12'>
              <div className='row'>
                <div className="col-md-12 tw-mx-auto">
                   <div className=' tw-relative '> 
                    <img src={require('../../assets/images/about.png')}   className=' tw-w-full' alt='' />
                    
                   
                   </div>
                </div>
              </div>
            </div>

          

        </div>

         
      </div>
     
      {/* <EBM_Avenue/> */}
     
    </div>
  )
}

export default About