import GradientBorder from "./ui/GradientBorder";
import { useActiveTabStore } from "../utils/store";

export default function Navbar() {
  const { activeTab, setActiveTab } = useActiveTabStore();

  const tabs = ["Queue", "Table", "History"];

  return (
    <>
      <div className="flex text-white bg-transparent rounded-md mx-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`w-1/3 h-[50px] transition-all duration-300 ${
              activeTab === tab
                ? "bg-gradient-to-t from-[#fff]/25 via-[#fff]/5 via-50% to-transparent border-white border-b-1"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <GradientBorder />
    </>
  );
}
