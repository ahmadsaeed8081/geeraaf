import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="tw-flex tw-bg-transparent  tw-gap-3 tw-border-opacity-20  tw-scroll-container tw-mt-3 tw-productOverflow  tw-whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`sm:tw-px-4 tw-px-3   sm:tw-py-4 tw-py-3 ${className} ${
              activeTab === tab.title
                ? "tw-w-full tw-text-black tw-font-zen-dots sm:tw-text-lg tw-text-sm  tw-bg-button-gradient tw-bg-BG"
                : " tw-border   tw-border-textColor  tw-text-textColor tw-font-zen-dots  tw-w-full"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tw-mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "tw-hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
