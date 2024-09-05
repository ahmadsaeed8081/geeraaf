//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function get_DaySupply(uint _supply) external view returns (uint256);
    function launch_time() external view returns (uint256);

    }

    pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}



contract GeeRaaf_Staking
    {
       
        address  public owner;
        AggregatorV3Interface internal priceFeed;

        address Staking_token= 0x21096FE3C6A5f484Ea9AE79cE338C3e7848ff8A0; 
        address Reward_Token=  0x21096FE3C6A5f484Ea9AE79cE338C3e7848ff8A0; 
        uint public regFeeinDollar= 10 ether;
        mapping(address=>bool) public isUser;

        uint public totalusers;
        uint public penalty_percentage= 10 ether;

        uint public per_day_divider= 1 minutes;
        uint public fee_percentage= 30 ether;
        uint private id;

        uint public totalbusiness; 
        mapping(uint=>address) public All_investors;

        struct ref_data{

            uint earning;
            uint count;

        }

        struct allInvestments{

            uint investedAmount;
            uint DepositTime;
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            uint reward;


        }



        struct Data{

            mapping(uint=>allInvestments) investment;
            mapping(uint=>ref_data) referralLevel;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
            address upliner;

        }


        mapping(address=>Data) public user;
        mapping(address=>bool) public isRegister;

        mapping(address=>mapping(uint=>allInvestments)) public user_investments;

        constructor(uint _id){
            
            owner=msg.sender;              
            id==_id;
            priceFeed = AggregatorV3Interface(0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165);




        }

        function sendRewardToReferrals(address investor,uint _investedAmount)  internal
        { 

            address temp = investor;       
            uint[] memory percentage = new uint[](2);
            percentage[0] = 2;
            percentage[1] = 1;
            uint j;
            uint remaining = _investedAmount;


                for(uint i=0;i<20;i++)
                {
                    if(i<10)
                    {
                        j=0;
                    }
                    else{
                        j=1;

                    }
                    
                    if(user[temp].upliner!=address(0))
                    {

                        temp = user[temp].upliner;
                        uint reward1 = ((percentage[j] * 1 ether) * _investedAmount)/100 ether;
                    
                        Token(Staking_token).transferFrom(msg.sender,temp,reward1);


                        user[temp].referralLevel[i].earning+=reward1 ;                  
                        user[temp].referralLevel[i].count++;
                        remaining-=reward1;
                    } 
                    else
                    {
                        break;
                    }

                } 
                                                    
                Token(Staking_token).transferFrom(msg.sender,address(this),remaining);


        }



        function Stake(uint _investedamount, address _ref) external  returns(bool success)
        {
            require(isRegister[msg.sender],"not reg");
            require(_investedamount > 0,"value is not greater than 0"); 
            require(Token(Staking_token).allowance(msg.sender,address(this))>=_investedamount,"allowance");

            if(user[msg.sender].investBefore == false)
            { 
                All_investors[totalusers]=msg.sender;
                isUser[msg.sender]=true;
                
                totalusers++;         

                if(_ref==address(0) || _ref==msg.sender)
                {
                    user[msg.sender].upliner=owner;
                }                            
                else{
                    
                    user[msg.sender].upliner=_ref;

                }
            }

            uint num = user[msg.sender].noOfInvestment;

            uint fee= _investedamount * fee_percentage/100 ether;
            _investedamount -= fee;

            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;

            sendRewardToReferrals( msg.sender, (_investedamount+fee));
            // Token(Staking_token).transferFrom(msg.sender,address(this),_investedamount);
            user[msg.sender].investBefore=true;

            return true;
            
        }

        function register(uint _id) external payable returns(bool success)
        {
            require(!isRegister[msg.sender],"not reg");
            require(id==_id);
            payable(owner).transfer(msg.value);
            return true;

        }

            function getLatestPrice() public view returns (int) {
            // prettier-ignore
            (
                /* uint80 roundID */,
                int price,
                /*uint startedAt*/,
                /*uint timeStamp*/,
                /*uint80 answeredInRound*/
            ) = priceFeed.latestRoundData();
            return price*10**10;
            }



        function getConversionRate(int dollar_amount) public view returns (int) {

            int ETHPrice = getLatestPrice();
            int UsdToETH = (( dollar_amount *10**18 ) / (ETHPrice));

            return UsdToETH;

        }

        function get_regFee()  public view returns(uint ){
            uint price;
            price = uint256(getConversionRate( int256(regFeeinDollar)));

            return price;

        }


        function get_TotalReward() view public returns(uint){ 
            // uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(!user[msg.sender].investment[i].unstake)
                {
                    depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                }
                else
                {
                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     uint launch_time = Token(Staking_token).launch_time();
                    uint  start= (launch_time-user[msg.sender].investment[i].DepositTime)/per_day_divider;
                    for(uint j=start;j< (start+depTime);j++ )
                    {
                        uint supply = Token(Staking_token).get_DaySupply(j);
                        uint sharePercentage = 100 ether * user[msg.sender].investment[i].investedAmount /supply;

                        rew  +=  (supply * ((sharePercentage) )/ (100*10**18) );

                    }
                }
            }
            // totalReward -= user[msg.sender].totalWithdraw_reward;

            return rew;
        }

        function getReward_perInv(uint i, address add) view public returns(uint){ //this function is get the total reward balance of the investor
            uint depTime;
            uint rew;


                if(!user[add].investment[i].unstake)
                {
                    depTime =block.timestamp - user[add].investment[i].DepositTime;
                }
                else
                {
                    depTime =user[add].investment[i].unstakeTime - user[add].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                    uint launch_time = Token(Staking_token).launch_time();
                    uint  start= (launch_time-user[add].investment[i].DepositTime)/per_day_divider;
                    for(uint j=start;j<(start+depTime);j++ )
                    {
                        uint supply = Token(Staking_token).get_DaySupply(j);
                        uint sharePercentage = 100 ether * user[add].investment[i].investedAmount /supply;

                        rew  +=  (supply * ((sharePercentage) )/ (100*10**18) );

                    }
                }
            

            return rew;
        }



        function withdrawReward() external returns (bool success){
            uint Total_reward = get_TotalReward() - total_withdraw_reaward();
            require(Total_reward>0,"you dont have rewards to withdrawn");         
        
            Token(Reward_Token).transfer(msg.sender,Total_reward);           
            user[msg.sender].totalWithdraw_reward+=Total_reward;

            return true;

        }



        function unStake(uint num) external  returns (bool success)
        {


            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");             //checking that he invested any amount or not
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;

            Token(Staking_token).transfer(msg.sender,amount);             //transferring this specific investment to the investor
          
            user[msg.sender].investment[num].unstake =true;    
            user[msg.sender].investment[num].unstakeTime =block.timestamp;    

            user[msg.sender].totalInvestment-=user[msg.sender].investment[num].investedAmount;
            user_investments[msg.sender][num] = user[msg.sender].investment[num];


            return true;

        }

        function getTotalInvestment() public view returns(uint) {   //this function is to get the total investment of the ivestor
            
            return user[msg.sender].totalInvestment;

        }


        function getAll_investments() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if(!user[msg.sender].investment[i].unstake )
               {
                   temp++;
               }

            }
         
           allInvestments[] memory temp_arr =  new allInvestments[](temp) ;
            Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( !user[msg.sender].investment[i].unstake ){

                   temp_arr[currentIndex]=user[msg.sender].investment[i];
                    temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);

                   currentIndex++;
               }

            }

            uint count=temp;
            for(uint i=0;i<temp;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }

        function getAll_investments_forReward() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint currentIndex;
            
         
            allInvestments[] memory temp_arr =  new allInvestments[](num) ;
            Invested =  new allInvestments[](num) ;

            for(uint i=0;i<num;i++)
            {

                temp_arr[currentIndex]=user[msg.sender].investment[i];
                temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);

                currentIndex++;
               

            }

            uint count=num;
            for(uint i=0;i<num;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }
        function referralLevel_earning(address _add) public view returns( uint[] memory arr1 )
        {
            uint[] memory referralLevels_reward=new uint[](20);
            for(uint i=0;i<20;i++)
            {
               
                referralLevels_reward[i] = user[_add].referralLevel[i].earning;


            }
            return referralLevels_reward ;


        }



        function referralLevel_count(address _add) public view returns( uint[] memory _arr )
        {
            uint[] memory referralLevels_reward=new uint[](20);
            for(uint i=0;i<20;i++)
            {

                referralLevels_reward[i] = user[_add].referralLevel[i].count;

            }
            return referralLevels_reward ;


        }
        
  
        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            owner = _owner;
        }


        function Set_penalty_percentage(uint _val)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            penalty_percentage = _val;
        }


        function total_withdraw_reaward() view public returns(uint)
        {
            uint Temp = user[msg.sender].totalWithdraw_reward;
            return Temp;
        }

        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        



        function Find_perdayShare(uint _day,uint _amount) public view returns(uint)
        {
            uint supply = Token(Staking_token).get_DaySupply(_day);
            uint sharePercentage = 100 ether * _amount /supply;

            return sharePercentage;
        }

       function withdrawFunds(uint _amount)  public
        {
            require(msg.sender==owner);
            uint bal = Token(Staking_token).balanceOf(address(this));
            require(bal>=_amount);

            Token(Staking_token).transfer(owner,_amount); 
        }


    }