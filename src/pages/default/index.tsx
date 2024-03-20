import { Exclamation, Problem } from "assets/images/icons";

const DefaultPage = () => {
  return (
    <div>
      <div className="top-part dark:bg-[#000d2f] bg-[#F3F4F7] p-[30px] rounded-[24px] h-[65vh]">
        <div className="rounded-[12px] bg-[#E6ECFE] dark:bg-[#525459] text-[#222638] dark:text-[#9EA3B5] p-[22px] w-[560px]">
          <div className="flex mb-[20px]">
            <Exclamation />
            <p className="text-[18px] font-[500] ml-[20px] mt-[-5px] w-[250px]">
              About login and password in the admin panel
            </p>
          </div>
          <p className="text-[16px] font-[500] mb-[20px]">
            Never tell anyone your login and password for your admin panel!
          </p>
          <div className="flex mb-[10px]">
            <Problem />
            <p className="text-[18px] font-[500] ml-[20px] mt-[-1px]">
              Problem
            </p>
          </div>
          <p className="text-[16px] font-[500]">
            If you are having problems with your system, contact to Hypernova!
          </p>
        </div>
      </div>
      <div className="bottom-part mt-[32px] flex justify-between items-center">
        <div className="left-part w-[500px] text-[18px] dark:text-[#9EA3B5]">
          <div className="flex justify-between">
            <p className="mb-[10px]">Connect with us: </p>
            <a className="text-[#3367F6]" href="tel:+998952405111">Hypernova Admin +998 95 240 51 11</a>
          </div>
          <div className="flex justify-between">
            <p>Telegram: </p>
            <a className="text-[#3367F6]" href="https://t.me/hypernova_inc" target="_blank">
              Hypernova Admin @hypernova_inc
            </a>
          </div>
        </div>
        <div className="right-part bg-[#E6ECFE] dark:bg-[#000d2f] p-[22px] w-[600px] rounded-[12px] text-[18px]">
          <p className="mb-[10px] dark:text-[#9EA3B5]">"Contact School" panel and management rules</p>
          <a className="text-[#3367F6]" href="https://www.hypernova.uz/">Created by Hypernova.uz</a>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
