import React, { useState } from "react";
import Header from "../header";
import Staking from "../../screens/Staking";
import { GoCopy } from "react-icons/go";
import { useSwitchChain, useAccount, useDisconnect } from "wagmi";
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Hero = (props) => {
  const [selectedCurrency, setSelectedCurrency] = useState("MATIC");
  const { address,isConnected, isConnecting ,isDisconnected} = useAccount()

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);
  };

  const link_notify = () => toast("Referral Link Copied!");


  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const getBorderColor = (currency) => {
    return selectedCurrency === currency
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-[#456DA7]";
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleBSelect = (button) => {
    setSelectedButton(button);
  };

  const getBBorderColor = (button) => {
    return selectedButton === button
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-white";
  };


  return (
    <div className="   tw-bg-cover tw-relative tw-bg-center tw-w-full tw-h-auto">
      <Header />

      <div className="container tw-relative  tw-pb-44 tw-pt-6">
        <div className=" tw-text-center">
          <h1 className=" tw-text-primary">
            GEE  <span className=" tw-text-textColor">MINER</span>
          </h1>
        </div>
        <div className="row    g-5 tw-items-center">
          <div className="col-lg-6">
           <div className=" row">
            <div className=" col-md-10 tw-mx-auto">
            <Staking team={props.team} totalrefIncome={props.totalrefIncome} ETHBalance={props.ETHBalance} regFee={props.regFee} isRegister={props.isRegister}  totalSupply={props.totalSupply} totalwithdraw={props.totalwithdraw} totalEarning={props.totalEarning} allInvestments_reward = {props.allInvestments_reward} totalInvestment={props.totalInvestment} GEEBalance={props.GEEBalance} curr_time={props.curr_time} min_stake={props.min_stake}  allInvestments={props.allInvestments}  test={props.test}/>
            </div>
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className=" row  g-4">
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-textColor tw-font-poppins">
                    Total Investment
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {props.totalInvestment? Number(props.totalInvestment)/10**18:0}
                  </span>
                </div>
              </div>
              
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins">
                    Current Balance
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {props.totalEarning? Number(props.totalEarning) - Number(props.totalwithdraw)/10**18:0}

                  </span>
                </div>
              </div>

              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins">
                    Referral Earning
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {props.totalrefIncome? Number(props.totalrefIncome)/10**18:0}

                  </span>
                </div>
              </div>

              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-textColor tw-font-poppins">
                    Total Team
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {props.team?Number(props.team):0}
                  </span>
                </div>
              </div>
              <div className=" col-md-12">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins tw-flex tw-gap-3 tw-items-center">
                    My Link 
                    <CopyToClipboard
                        text={`${window.location.host}/?ref=${address? address:""}`}
                    >
                      <GoCopy onClick={link_notify}  size={23} color="#FFE247" />

                    </CopyToClipboard>

                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {window.location.host}/?ref={address?address.slice(0,4)+"..."+address.slice(39,42):"kindly connect"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" tw-absolute tw-right-0  tw-hidden  md:tw-block tw-top-0">
        <img src={require("../../assets/images/WhiteBluePink.png")} alt=""  className=" tw-w-44" />
      </div>



      <div className=" tw-absolute  tw-hidden  md:tw-block tw-right-20 tw-top-44">
        <img
          src={require("../../assets/images/hero_right.png")}
          className="   tw-w-40"
          alt=""
        />
      </div>



      <ToastContainer />

     
     
    </div>
  );
};

export default Hero;
