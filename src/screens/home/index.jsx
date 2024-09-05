import React, { useEffect, useState } from "react";
import Hero from "../../components/hero";
import Brands from "../../components/Brands";
import Footer from "../../components/footer";
import About from "../../components/About/About";


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



const Home = () => {


  const { address,isConnected, isConnecting ,isDisconnected} = useAccount()

  const [count, set_count] = useState(0);

  const notify = () => toast("Transaction Successfull!");

  const [totalReward, set_totalReward] = useState(0);
  const [totalwithdraw, set_totalwithdraw] = useState(0);

  const [totalusers, set_totalusers] = useState(0);
  const [totalbusiness, set_totalbusiness] = useState(0);
  const [totalInvestment, set_totalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [USDTBalance, set_TokenBalance] = useState(0);

  const [GEEBalance, set_GEEBalance] = useState(0);
  const [ETHBalance, set_MATICBalance] = useState(0);


  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [allInvestments_reward, set_allInvestments_reward] = useState([]);

  const [refCount, set_refCount] = useState([]);
  const [refEarning, set_refEarning] = useState([]);
  const [curr_time, set_curr_time] = useState();
  const [min_stake, set_min_stake] = useState(0);
  const [totalSupply, set_totalSupply] = useState();
  const [isRegister, set_isRegister] = useState(false);

  const [regFee, set_regFee] = useState(0);


  useEffect(()=>
  {

    test();
    
  
  },[address])



  async function test()
  {

    const web3= new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public	"));
  

    const staking_contract=new web3.eth.Contract(staking_abi,staking_address);
    const GEE_contract=new web3.eth.Contract(token_abi,GEE_address);
    let USDTBalance;
    let isRegister;
    let GEEBalance;
    let totalReward;
    let totalEarning;
    let user;
    let allInvestments;
    let allInvestments_reward;
    let regFee;
    let balance;
    
    if(isConnected)
    {
       balance  =await  web3.eth.getBalance(address)

   
       GEEBalance = await GEE_contract.methods.balanceOf(address).call();    

       totalReward = await staking_contract.methods.get_TotalReward().call({ from: address });   

       user = await staking_contract.methods.user(address).call();      
       allInvestments = await staking_contract.methods.getAll_investments().call({from: address});
       allInvestments_reward = await staking_contract.methods.getAll_investments_forReward().call({from: address});
      isRegister = await staking_contract.methods.isRegister(address).call();    
      regFee = await staking_contract.methods.get_regFee(address).call();    
       let ref_count = await staking_contract.methods.referralLevel_count(address).call();    
       let ref_earn = await staking_contract.methods.referralLevel_earning(address).call();    
       set_refCount(ref_count)
       set_refEarning(ref_earn)

    }



    //staking 
    let totalsupply = await staking_contract.methods.get_CurrDaySupply().call();    

    let currTime = await staking_contract.methods.get_currTime().call();    
    let totalusers = await staking_contract.methods.totalusers().call();    

    let totalbusiness = await staking_contract.methods.getTotalInvestment().call();
    set_isRegister(isRegister)
    set_regFee(regFee)
    set_totalSupply(totalsupply)
    set_MATICBalance(balance)
    set_curr_time(currTime)
    set_TokenBalance(USDTBalance);

    set_GEEBalance(GEEBalance);
    set_totalInvestment(user?user[1]:0)
    set_totalwithdraw(user?user[2]:0)

    set_min_stake(0)
    set_investmentList(allInvestments);
    set_allInvestments_reward(allInvestments_reward)
    // setSelectedAmount(allInvestments[0]);
    
    
    if(allInvestments!=null)
    {
      if(allInvestments[0])
      {
        set_choosed_Unstake_inv(allInvestments[0][3])
  
      }   
    }
 
    set_totalReward(totalReward);
  }  



  return (
    <div className=" tw-overflow-x-hidden">
      <Hero ETHBalance={ETHBalance} regFee={regFee} isRegister={isRegister} totalSupply={totalSupply} totalwithdraw={totalwithdraw} totalEarning={totalEarning} allInvestments_reward = {allInvestments_reward} totalInvestment={totalInvestment} GEEBalance={GEEBalance} curr_time={curr_time} min_stake={min_stake}  allInvestments={allInvestments}  test={test}  />

      <div className="   tw-px-5 tw-relative">
        <div className=" tw-text-center">
          <h2 className="  tw-pt-16  sm:tw-pt-0 tw-text-textColor">
            Your Referral <span className=" tw-text-primary"> Reward</span>
          </h2>
        </div>

        <Brands refCount={refCount} refEarning={refEarning}/>

        <div className=" tw-absolute tw-left-0  tw-bottom-[30%]">
          <img
            src={require("../../assets/images/WhiteBluePinkLeft.png")}
            className=" sm:tw-w-44 tw-w-36"
            alt=""
          />
        </div>

        <div className=" tw-absolute tw-left-20 tw-bottom-[100%] ">
          <img
            src={require("../../assets/images/heroLeft.png")}
            className=" md:tw-block tw-hidden tw-w-36"
            alt=""
          />
          <img
            src={require("../../assets/images/mobile_image.png")}
            className="tw-block md:tw-hidden"
            alt=""
          />
        </div>
      </div>

      <About />
      <Footer />
    </div>
  );
};

export default Home;
