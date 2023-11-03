import React, { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import Logo from "../../assets/images/sidebarLogo.png";
import bscLogo from "../../assets/icons/bsc.png";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as MenuIcon2 } from "../../assets/icons/menu2.svg";
import { useChainId } from "wagmi";

import { ReactComponent as MoonIcon } from "../../assets/icons/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import { ReactComponent as Pair } from "../../assets/icons/liveexplorer.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import Menu from "../../assets/images/menu.png";
import BitChain from "../../assets/images/LogoImg.png";
import "./Navigation.scss";
import Dropdown from "../Dropdown";
import Loogo from "../../assets/images/patrick-logo.png";

import styled from "styled-components";

const Button = styled.button`
  background-color: #0a090256;
  color: #ffba00;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  transform: translateY(0px); /* Reset the translateY */
  transition: transform 0.2s, box-shadow 0.2s; /* Add smooth transition effects */

  &:hover {
    transform: translateY(-2px); /* Move the button up slightly on hover */
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Increase the box shadow on hover for a more pronounced 3D effect */
  }
`;

const lists = [
  {
    label: "",
    leftIcon: bscLogo,
    chainId: 80001,
  },
];

const Navigation: React.FC = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [openClose, setOpenClose] = useState(false);
  const [openCloses, setOpenCloses] = useState(false);
  const { open } = useWeb3Modal();
  const chain = useChainId();
  const [activeLink, setActiveLink] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("Testnet"); // Initially selected option

  // Get the current location using useLocation hook

  const [isOpen, setIsOpen] = useState(false);

  const [selectedList, setSelectedList] = useState<{
    label: string;
    leftIcon?: string;
    chainId: number;
  } | null>({
    label: "",
    leftIcon: bscLogo,
    chainId: 80001,
  });

  useEffect(() => {
    setSelectedList(lists.find((f) => f.chainId === chain) ?? null);
  }, [chain]);

  useEffect(() => {
    // Get the current URL pathname
    const currentUrlPathname = window.location.pathname;

    // Set the active link based on the current URL pathname
    setActiveLink(currentUrlPathname);
  }, []);

  useEffect(() => {
    if (openClose) {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflowY = "initial";
      document.body.style.height = "initial";
    }
  }, [openClose]);

  useEffect(() => {
    if (isDarkMode) {
      if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
      }
      document.body.classList.add("dark");
    } else {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      }
      document.body.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="navigation-wrapper">
      <div className="mx">
        <div className="desktophead">
          <div>
            {" "}
            <img src={Loogo} className="logoo" style={{ borderRadius: "50%" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            <nav className="site-navigation">
              <ul className="nav">
                <li>
                  <Link
                    to="https://patrickbateman.live/"
                    className={`navlink ${location.pathname === "/f" ? "active" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`navlink ${location.pathname === "/" ? "active" : ""}`}
                  >
                    Swap
                  </Link>
                </li>
                <li>
                  <Link to="/tstaking" className={`navlink ${location.pathname === "/tstaking" ? "active" : ""}`}>
                    Staking{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lpstaking"
                    className={`navlink ${location.pathname === "/lpstaking" ? "active" : ""}`}
                  >
                    LP Staking
                  </Link>
                </li>
                <li></li>
                <li>
                  <div className="web3-btn">
                    <Web3Button />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mobilehead">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {" "}
            <img
              src={Loogo}
              className="logoo"
              style={{ width: 70, maxHeight: 70, borderRadius: "50%" }}
            />
          </div>
          <div className="web3-btn">
            <Web3Button />
          </div>
          <div>
            {" "}
            <div className="circlebg newmwnu" onClick={() => setOpenClose((m) => !m)}>
              <MenuIcon />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openClose && (
            <motion.div
              className="sidebar-backdrop"
              onClick={() => setOpenClose(false)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="bar"
                onClick={(e: any) => e.stopPropagation()}
                animate={{ right: 0, transitionDelay: "-200ms" }}
                exit={{ right: -300 }}
                initial={{ right: -300 }}
              >
                <div className="header-side-bar">
                  <div className="close-icon" onClick={() => setOpenClose(false)}>
                    <Close />
                  </div>

                  <div style={{ flex: 1 }}>
                    <nav>
                      <NavLink
                        to="https://patrickbateman.live/"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Home</span>
                      </NavLink>
                      <NavLink
                        to="/"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Swap</span>
                      </NavLink>
                      <NavLink
                        to="/tstaking"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Staking</span>
                      </NavLink>
                      <NavLink
                        to="/lpstaking"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>LP Staking</span>
                      </NavLink>
                    </nav>
                    <div className="allChains"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {openCloses && (
            <motion.div
              className="sidebar-backdrop"
              onClick={() => setOpenCloses(false)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="bar"
                onClick={(e: any) => e.stopPropagation()}
                animate={{ left: 0, transitionDelay: "-200ms" }}
                exit={{ left: -300 }}
                initial={{ left: -300 }}
              >
                <div className="header-side-bar">
                  <div className="close-icon" onClick={() => setOpenCloses(false)}>
                    <Close />
                  </div>

                  <div style={{ flex: 1 }}>
                    <nav>
                      <NavLink
                        to="https://8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>Website</span>
                      </NavLink>
                      <NavLink
                        to="https://protracker.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProTracker</span>
                      </NavLink>
                      <NavLink
                        to="https://bridge.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProBridge</span>
                      </NavLink>
                      <NavLink
                        to="https://prodex.app"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProDex</span>
                      </NavLink>
                      <NavLink
                        to="https://prostake.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProStake</span>
                      </NavLink>
                      <NavLink
                        to="https://gallery.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProGallery</span>
                      </NavLink>
                      <NavLink
                        to="https://propad.app"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>ProPad</span>
                      </NavLink>
                      <NavLink
                        to="https://explorer.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <span>8Bit Scan</span>
                      </NavLink>
                    </nav>
                    <div className="allChains"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navigation;
