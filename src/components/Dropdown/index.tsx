import React, { useState, useEffect, useRef } from "react";

import "./Dropdown.scss";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/down-arrow.svg";
import { useSwitchNetwork } from "wagmi";
// import { ReactComponent as DrodpownDownArrowIcon } from "../../assets/icons/dropdown-down-arrow.svg";

interface IDropdownProps {
  label: string;
  lists: {
    label: string;
    leftIcon?: string;
    chainId: number;
  }[];
  setSelectedList?: React.Dispatch<
    React.SetStateAction<{
      label: string;
      leftIcon?: string;
      chainId: number;
    } | null>
  >;
  selectedList?: {
    label: string;
    leftIcon?: string;
    chainId: number;
  } | null;
}

const Dropdown: React.FC<IDropdownProps> = ({ lists, label, setSelectedList, selectedList }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { switchNetwork } = useSwitchNetwork();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setOpenDropdown((d) => !d)}>
        <span>
          {/* <DrodpownDownArrowIcon /> */}
          {selectedList ? (
            <>
              <img src={selectedList?.leftIcon} alt="" />
              {selectedList.label}
            </>
          ) : (
            label
          )}
        </span>
      </div>
      {openDropdown && (
        <div className="dropdown-content">
          {lists.map((list, index) => (
            <div
              key={index}
              className="dropdown-content-list"
              onClick={() => {
                setOpenDropdown(false);
                if (switchNetwork) switchNetwork(list.chainId);
              }}
            >
              <span>
                {list.leftIcon && <img src={list.leftIcon} alt={list.label} />}
                &nbsp;{list.label}
              </span>
              {/* <DownArrowIcon /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
