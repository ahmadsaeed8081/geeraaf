import React from "react";
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="  tw-bg-[#FFE247]">
        <div className="container  tw-py-8">
          <div className="row">
            <div className="col-md-8 mx-auto">
            <div className=" tw-text-center">
            <img
                src={require("../../assets/images/footer_logo.png")}
                className="tw-mx-auto"
              />
              <h1 className=" tw-text-center tw-font-bold">Token Address</h1>
              <div className=" ">
                <button className="  sm:tw-px-5 tw-px-3 tw-py-2 sm:tw-text-base tw-text-sm   tw-bg-green tw-text-white m-0  tw-rounded-tr-md tw-rounded-bl-md">
                  GEERaff:0x33E4d3163e66B46bAbC0fa F8B30C6c36DD4Ab9E9
                </button>
              </div>
            </div>
              <p className=" sm:tw-text-xl tw-text-sm tw-text-black tw-pt-6 tw-text-center">
                
                Don’t hesitate to subscribe to latest news about GEERaaf Staking
                as well as crucial financial knowledge to become successful
                investors globally
              </p>
              <ul className=" tw-pt-3 tw-p-0 tw-flex   tw-justify-center tw-gap-5 tw-items-center">
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/youtube.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/telegram.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/bluec.png")} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-w-full tw-text-center tw-bg-[#1A1A1A]">
        <p className=" sm:tw-text-lg tw-py-2.5  tw-text-sm tw-m-0 tw-text-white">
          Copyright © 2024. All rights reserved by GEERaaf
        </p>
      </div>
    </div>
  );
};

export default Footer;
