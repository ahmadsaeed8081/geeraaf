import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Tabs from "../../components/Tabs";
import { TiArrowSortedDown } from "react-icons/ti";
import StakingCounter from "../../components/StakingCounter";
import { useLocation } from "react-router-dom";



import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  token_abi, 
  GEE_address,
  staking_address,
  staking_abi,       
} from "../../configs/Contracts";
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useSwitchChain, useAccount, useDisconnect } from "wagmi";

import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { arbitrum, arbitrumSepolia } from "wagmi/chains";


const Staking = (props) => {


  const chainId = process.env.REACT_APP_ENV == "production" ? arbitrum.id : arbitrumSepolia.id;

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isProcessingPayment, setIsProcessingPayment] = useState(true);


  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();

  const { address,isConnected, isConnecting ,isDisconnected} = useAccount()

  const [count, set_count] = useState(0);

  const notify = () => toast("Transaction Successfull!");

  const [ref_add, set_ref] = useState("0x0000000000000000000000000000000000000000");


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const dropdownRef3 = useRef(null);



  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const dropdownRef4 = useRef(null);


  const options = ["150 days", "Option 2", "Option 3"];
  const options2 = ["0", "60", "2323"];
  const options3 = ["7.78", "44.23", "3.54"];
  const options4 = ["7.78", "44.23", "3.54"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleToggle3= () => {
    setIsOpen3(!isOpen3);
  };

  const handleToggle4= () => {
    setIsOpen4(!isOpen4);
  };


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOption2Click = (option) => {
    setSelectedOption2(option);
    setIsOpen2(false);
  };


  const handleOption3Click = (option) => {
    setSelectedOption3(option);
    setIsOpen3(false);
  };


  const handleOption4Click = (option) => {
    setSelectedOption4(option);
    setIsOpen4(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setIsOpen3(false);
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setIsOpen4(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  
    if(params.get("ref")!=null)
    {
      set_ref(params.get("ref"))

    }

  }, []);

  useEffect(() => {
  

  }, props.regFee);

  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })

  const [stakeAmount, setStakedAmount] = useState(0);

  async function stake1() {


    try {
        const tx = await writeContractAsync({
          abi: staking_abi,
          address: staking_address,
          functionName: "Stake", 
          args: [
            Convert_To_Wei(stakeAmount? Number(stakeAmount) : 0),ref_add
          ],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}

async function unstake1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "unStake", 
        args: [
          Number(selectedOption3[3])
        ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


async function claim1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "withdrawReward", 
        // args: [
        //   Number(selectedOption4[3])
        // ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}

async function reg1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "register", 
        args: [
          process.env.REACT_APP_ID,ref_add
        ],
        value: props.regFee? Number(props.regFee):0

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}
useEffect(()=>{
  if(isConfirmed)
  {
    if(count==0)
    {
      // alert("ninkn")
      stake1()

    }
    if(count==1)
    {
      set_count(0)
      notify()
      setStakedAmount(0)
      props.test();
    }
  }


},[isConfirmed])

  async function GEE_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: GEE_address,
          args: [staking_address,Convert_To_Wei( stakeAmount ? Number(stakeAmount) : "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
    }
  }







  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public	")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  function Convert_To_Wei(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public	")
    );

    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }



  async function stake()
  {
    

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }

    // if(Number(stakeAmount) < Number(props.min_stake)/10**18 )
    // {
    //   alert("Minimum Stake amount is "+ Number(min_stake)/10**18);
    //   return;
    // }

    if(Number(props.GEEBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }

    if(chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await GEE_approval?.();
    } 
    else 
    {
      await GEE_approval?.();
    }

  }


  async function unstake()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await unstake1?.();
    } 
    else 
    {
      await unstake1?.();
    }
    

  }

  async function claim()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await claim1?.();
    } 
    else 
    {
      await claim1?.();
    }
    

  }




   async function Register( ) {
    

    const web3= new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public	"));
    const staking_contract=new web3.eth.Contract(staking_abi,staking_address);
    

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    
    if(props.isRegister)
    {
      alert("You are a Registered Member");
      return;
    }
    if(Number(props.regFee) == 0 )
    {
      alert("Kindly wait data is fetching, try again in few seconds");
      return;
    }
    if(ref_add == "0x0000000000000000000000000000000000000000" )
    {
      alert("It's a community base project, Kindly use Ref link to join the system");
      return;
    }
    let ref_count = await staking_contract.methods.referralLevel_count(ref_add).call();    
    let ref_reg = await staking_contract.methods.isRegister(ref_add).call();    
    if(ref_reg == false )
    {
      alert("Your given Referral link is not Registered");
      return;
    }
    if(Number(ref_count[0]) >=3 )
    {
      alert("The referral link you are using has exceed its limit, kinldy use a different referral link");
      return;
    }    
    if(Number(props.regFee) > Number(props.ETHBalance) )
    {
      alert("You dont have sufficent Eth availble in your wallet");
      return;
    }
    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await reg1?.();
    } 
    else 
    {
      await reg1?.();
    }

  };










  const defaultTab = "Stake";

  const tabData = [
    {
      title: "Stake",
      content: (
        <>
          <div className="tw-border tw-border-textColor tw-rounded-md">
            <div className="tw-flex px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
              <div>
              <img src={require("../../assets/images/c5.png")} />
              </div>
              <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
                GEE
              </p>
            </div>

           <div className=" p-4 tw-border-b   tw-border-textColor tw-flex tw-flex-col tw-gap-3">
           <div className="tw-flex  tw-justify-between tw-items-center">
              <p className="tw-m-0  tw-text-sm tw-text-textColor tw-font-poppins ">Community Distribution(30%)</p>
              <p className="tw-m-0  tw-font-poppins  tw-text-textColor tw-text-sm">{(stakeAmount * 30) / 100} <span className="  tw-text-green">GEE</span> </p>
            </div>

            <div className="tw-flex  tw-justify-between tw-items-center">
              <p className="tw-m-0  tw-text-sm tw-text-textColor tw-font-poppins ">Net Stake Amount</p>
              <p className="tw-m-0  tw-font-poppins tw-text-textColor tw-text-sm">{stakeAmount - ((stakeAmount * 30) / 100)} <span className=" tw-text-green">GEE</span> </p>
            </div>
           </div>

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
            
                <div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-textColor">
                      Write Amount
                    </p>
                    <p className=" tw-text-textColor tw-font-poppins tw-text-sm">Balance: {props.GEEBalance?Number(props.GEEBalance)/10**18:0} <span className=" tw-text-green">GEE</span></p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      // onClick={handleToggle2}
                      className=" tw-border-textColor tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-black tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      {/* <p className="tw-m-0">
                        {selectedOption2 || "Select an option"}
                      </p> */}
                      <input 
                        placeholder="" 
                        className=" tw-w-full  tw-text-textColor tw-font-poppins  placeholder:tw-text-textColor tw-bg-transparent  tw-outline-none" 
                        min={0}
                        value={stakeAmount}
                        max={props.GEEBalance>0?(Number(props.GEEBalance)/10**18):0}
                        onChange={(e)=>setStakedAmount(e.target.value)}
                      />
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <p className="tw-text-sm tw-m-0  tw-text-textColor">GEE</p>
                        <button className=" text-black tw-bg-button-gradient tw-py-1.5 tw-px-1 tw-text-sm tw-rounded-md"
                        onClick={(e)=>setStakedAmount(props.GEEBalance>0?(Number(props.GEEBalance)/10**18):0)}

                        >
                          Max
                        </button>
                      </div>
                    </button>
                    {isOpen2 && (
                      <ul className="tw-absolute tw-p-0 tw-bg-white border tw-text-black tw-shadow-lg tw-rounded-md tw-mt-2 tw-w-full">
                        {options2.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOption2Click(option)}
                            className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>


                  <div className="tw-flex tw-pt-14 tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-textColor">
                      Current Reward Share :
                    </p>
                    <p className=" tw-text-textColor tw-font-poppins tw-text-sm">{props.totalSupply?Number((Number(stakeAmount)*70/100) / (Number(props.totalSupply)/10**18)) * 100 :0} <span className=" tw-text-[#FFE247]">%</span></p>
                  </div>
                </div>
              </div>

              <div>
                <Button onClick={stake} l label={"Approved"} className={"tw-w-full  tw-text-black tw-font-zen-dots"} />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Unstake",
      content:(
        <>
        <div className="tw-border tw-border-textColor tw-rounded-md">
          <div className="tw-flex px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
              GEE
            </p>
          </div>

          <div className="tw-flex p-4  tw-justify-between tw-items-center">
            <p className="tw-m-0  tw-text-textColor  tw-font-zen-dots">Total Stake</p>
            <p className="tw-m-0  tw-font-zen-dots tw-text-textColor ">                     {props.totalInvestment? Number(props.totalInvestment)/10**18:0} <span className=" tw-text-[#FFE247]">GEE</span> </p>
          </div>

          <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-textColor ">Previous Investment</label>
              <div
                  className="tw-relative tw-mt-2 tw-w-full tw-inline-block"
                  ref={dropdownRef3}
                >
                  <button
                    onClick={handleToggle3}
                    className="tw-border-textColor tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-4 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0 tw-border-textColor">
                    {selectedOption3 ? Number(selectedOption3[0])/10**18:"No Staking Available"}
                    </p>
                    <p className="tw-m-0">
                    <TiArrowSortedDown color="black" size={20} />

                    </p>
                  </button>
                  {isOpen3 && (
                    <ul className="tw-absolute tw-bg-white tw-p-0 tw-z-30 tw-bg- tw-text-[black] black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                    {props.allInvestments?(

                        props.allInvestments.map((item,index) => (
                        <li
                        onClick={() => {
                        handleOption3Click(item);
                        // setSelectedAmount(item);
                        // set_choosed_Unstake_inv(Number(item[index][3]));

                        }}
                        className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                        {Number(item[0])/10**18}
                        </li>
                        ))
                        ):(null)}
                    </ul>
                  )}
                </div>
                {/* <StakingCounter time={selectedOption3 ? Number(selectedOption3[1]):0}/> */}

             </div>
            <div>
              <Button label={"Unstake"} className={"tw-w-full tw-font-zen-dots"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
    {
      title: "Reward",
      content:(
        <>
        <div className="tw-border tw-border-textColor tw-rounded-md">
          <div className="tw-flex tw-mb-4 px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
            GEE
            </p>
          </div>

          <div className="tw-flex px-4   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">Total Earning</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">{props.totalEarning? (Number(props.totalEarning)/10**18).toFixed(2) + (Number(props.totalwithdraw)/10**18).toFixed(2):0}<span className=" tw-text-lg tw-text-[#FFE247]">GEE</span></p>
          </div>


          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">Total Withdraw</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">{props.totalwithdraw? (Number(props.totalwithdraw)/10**18).toFixed(2):0} <span className=" tw-text-lg tw-text-[#FFE247]">GEE</span></p>
          </div>

          <div className="tw-flex-col   tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-textColor">Investment History</label>
           <div className=" tw-mt-2.5">
            <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef4}
                  >
                    <button
                      onClick={handleToggle4}
                      className="tw-border-textColor tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-4 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      <p className="tw-m-0 tw-border-textColor">
                      {selectedOption4 ? Number(selectedOption4[0])/10**18:"Select an option"}
                      </p>
                      <p className="tw-m-0">
                      <TiArrowSortedDown color="black" size={20} />

                      </p>
                    </button>
                    {isOpen4 && (
                      <ul className="tw-absolute tw-bg-white tw-p-0 tw-z-30 tw-bg- tw-text-[black] black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                    {props.allInvestments_reward?(
                      props.allInvestments_reward.map((item,index) => (
                        <li
                          key={index}
                          onClick={() => handleOption4Click(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {Number(item[0])/10**18}

                        </li>
                      ))
                     ):(null)}
                      </ul>
                    )}
                  </div>
           </div>
           <div className="tw-flex  tw-pt-7   tw-gap-2  tw-justify-end tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor"> Earn Reward:</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor"> {selectedOption4 ? (Number(selectedOption4[6])/10**18).toFixed(2):0}<span className=" tw-text-[#FFE247]">GEE</span></p>
          </div>
         
             </div>
            <div>
              <Button onClick={claim} label={"Claim"} className={"tw-w-full tw-font-zen-dots"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
  ];





  return (
    <div className="tw-bg-center  tw-relative  tw-bg-cover tw-w-full tw-h-auto">
      {props.isRegister?
      (
      <div className="container md:tw-py-24 tw-py-3">
        <div className="row tw-relative tw-items-center">
          <div className="col-lg-12 col-md-12 tw-mx-auto">
            <div className="mx-auto mt-8 mb-24 ">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
 
            </div>
          </div>

        </div>
      </div>

      ):
      (

      <div className="container md:tw-py-24 tw-py-3">
        <div className="row tw-relative tw-items-center">
          <div className="col-lg-12 col-md-12 tw-mx-auto tw-blur">
            <div className="mx-auto mt-8 mb-24 ">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
   
            </div>
          </div>

            <div className="tw-absolute   tw-z-40 tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-text-center ">
              <h5>To UnLock Staking<br></br>Register yourself by paying 10$</h5>
            <button
              className="tw-bg-button-gradient text-black tw-font-semibold tw-text-white tw-px-5 tw-py-2 tw-rounded tw-mt-2"
              onClick={Register}
            
            >
            Register 
          </button>
          </div>
        </div>

      </div>

      )}

     
    </div>
  );
};

export default Staking;
