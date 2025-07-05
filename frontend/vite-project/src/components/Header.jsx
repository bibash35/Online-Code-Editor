import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo (1).png";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import cat from "../assets/cat.png";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { logoutGit } from "../redux/slice/gitSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import Githublogin from "../pages/Githublogin"
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import { handleOpen } from "./TopHeader";
import Help from '../pages/Help'; 
import Blog from '../pages/Blog'; 
import Library from '../pages/AddLibrary'; 
const Header = () => {
  
  let user = useSelector((store) => store.user.value);
  let git = useSelector((store) => store.git.value);
  const dispatch = useDispatch();
  const {signInWithGithub}=Githublogin();

  const dropdownRef = useRef(null);

  const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
  const [htmlDropdownOpen, setHTMLDropdownOpen] = useState(false);
  const [cssDropdownOpen, setCssDropdownOpen] = useState(false);
  const [jsDropdownOpen, setJsDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const [paneVisibility, setPaneVisibility] = useState({
    HTML: true,
    CSS: false,
    JavaScript: false,
    Console: false,
    Output: true,
  });

  
  const toggleFileDropdown = () => {
    setFileDropdownOpen(!fileDropdownOpen);
  };
  const toggleHtmlDropdown = () => {
    setHTMLDropdownOpen(!htmlDropdownOpen);
  };
  const toggleCssDropdown = () => {
    setCssDropdownOpen(!cssDropdownOpen);
  };
  const toggleJsDropdown = () => {
    setJsDropdownOpen(!jsDropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  const togglePane = (pane) => {
    // Toggle the visibility of the clicked pane
    setPaneVisibility((prev) => ({
      ...prev,
      [pane]: !prev[pane],
    }));

    // Update the pane sizes based on the new visibility
    updatePaneSizes({ ...paneVisibility, [pane]: !paneVisibility[pane] });
  };

  const updatePaneSizes = (visibility) => {
    const visiblePaneCount = Object.values(visibility).filter((v) => v).length;
    const newSize = 100 / visiblePaneCount + "%";

    // Calculate new sizes only for visible panes
    const newSizes = Object.keys(visibility).map((pane) =>
      visibility[pane] ? newSize : "0%"
    );
    setSizes(newSizes);
  };

  useEffect(() => {
    updatePaneSizes(paneVisibility);
  }, [paneVisibility]);




  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFileDropdownOpen(false);
      setHTMLDropdownOpen(false);
      setCssDropdownOpen(false);
      setJsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [html, setHtml] = useLocalStorage(
    "html",
    `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
  </head>
  <body>
  
  </body>
  </html>`
  );
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  const [sizes, setSizes] = useState(["20%", "20%", "20%", "20%", "20%"]);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
      <html>
      <head>
      <style>${css}</style>
      </head>
      <body style="background-color: #f0f0f0;">
      ${html}
      ${js ? `<script>${js}</script>` : ""}
      </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  useEffect(() => {
    const handleConsoleMessage = (event) => {
      if (event.data.source === "iframe") {
        setConsoleOutput((prev) => [...prev, ...event.data.payload]);
      }
    };
    window.addEventListener("message", handleConsoleMessage);
    return () => {
      window.removeEventListener("message", handleConsoleMessage);
    };
  }, []);

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const runJavaScript = () => {
    const log = [];
    const consoleLog = console.log;
    console.log = (...args) => {
      log.push(args.join(" "));
    };

    try {
      eval(js);
    } catch (error) {
      log.push(error.message);
    }

    console.log = consoleLog;
    setConsoleOutput((prev) => [...prev, ...log]);
  };

  const paneHeight = "100%";
  const paneStyle = {
    borderRight: "1px solid #ccc",
    height: paneHeight,
  };



  return (
    <>
    <TopHeader/>

      <header className="bg-gray-200 text-black py-1">
        <div className="mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <a href="#" onClick={handleOpen}>
              <img src={logo} className="h-6" alt="Logo" />
            </a>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleFileDropdown}
                className="py-2 px-4 rounded inline-flex items-center">
                <span className="text-sm">File</span>
                <IoMdArrowDropdown className="ml-2 text-sm" />
              </button>
              {fileDropdownOpen && (
                <ul className="absolute bg-white py-3  right-0 top-full mt-1 shadow drop-shadow-md flex flex-col min-w-[200px] z-10">
                  <li>
                    <a className="block px-4 py-2  text-sm text-black bg-white hover:bg-gray-20" href="#" >New </a>
                  </li>
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                    <a className="flex-grow text-sm text-black" href="#"> Make bin private</a>
                    <span className="bg-[#4caf50] text-white rounded text-sm px-1 ml-6"> PRO</span>
                  </li>
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                    <a className="flex-grow text-sm text-black" href="#">
                      Delete
                    </a>
                    <span className=" text-black text-sm px-1 ml-6 ">
                      ctrl+shift+del
                    </span>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200" href="#">
                      Archive
                    </a>
                  </li>
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                    <a className="flex-grow text-sm text-black" href="#">
                      My bins
                    </a>
                    <span className=" text-black text-sm px-1 ml-6 ">
                      ctrl+o
                    </span>
                  </li>
                  <hr />
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                      Add description
                    </a>
                  </li>
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                    <a className="flex-grow text-sm text-black" href="#">
                      Save snapshot
                    </a>
                    <span className=" text-black  text-sm px-1 ml-6">
                      cltr+s
                    </span>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                      Clone
                    </a>
                  </li>
                  <hr />
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                    <a className="flex-grow text-sm text-black" href="#">
                      Publish to vanity homepage
                    </a>
                    <span className="bg-[#4caf50] text-white rounded text-sm px-1 ml-6">
                      PRO
                    </span>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                      Export as gist
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                      Download
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-20">
                      Save as template
                    </a>
                  </li>
                </ul>
              )}
              {/* <span className="text-sm gap-1">Add Library</span> */}
              <Link to="/library" className="text-sm gap-1 hover:text-blue-700">
  Add Library
</Link>
            </div>
          </div>

          {/* Middle Section: Tabs */}
          <div className="flex-grow flex justify-center">
            <div className="flex gap-1 border  rounded  shadow-md ">
              <button
                className={`hover:bg-white text-sm border-l border-gray-300 transition duration-300 px-2 py-2`}
                onClick={() => togglePane("HTML")}
              >
                HTML
              </button>
              <button
                className={`hover:bg-white text-sm border-l border-gray-300 transition duration-300 px-2 py-2`}
                onClick={() => togglePane("CSS")}
              >
                CSS
              </button>
              <button
                className={`hover:bg-white border-l border-gray-300 text-sm transition duration-300 px-2 py-2`}
                onClick={() => togglePane("JavaScript")}
              >
                JavaScript
              </button>
              <button
                className={`hover:bg-white border-l border-gray-300 text-sm transition duration-300 px-2 py-2`}
                onClick={() => togglePane("Console")}
              >
                Console
              </button>
              <button
                className={`hover:bg-white text-sm border-l border-gray-300 transition duration-300 px-2 py-2 `}
                onClick={() => togglePane("Output")}
              >
                Output
              </button>
            </div>
          </div>

           {/* Right Section part */}

          <div className="flex space-x-4 ">
            {
              user || git  ? (
                <>
                  <span
                    onClick={toggleLoginDropdown}
                    className=" px-2 cursor-pointer hover:bg-gray-200"
                  >
                    Account
                  </span>
                  {loginDropdownOpen && (
                    <ul className="absolute top-8 right-28 z-50 bg-white cursor-pointer py-3 shadow drop-shadow-md flex flex-col w-64">
                      <li>
                        <h2 className="px-6 py-2 text-left text-black bg-white hover:underline cursor-pointer">
                        {user?.Username || git?.screenName}
                        </h2>
                      </li>
                      <li>
                        <p
                          className="px-6 py-2 mb-2 text-sm text-[#00000080] bg-white hover:underline"
                          onClick={() => {
                            dispatch(logout());
                            dispatch(logoutGit());
                          }}
                        >
                          Logout
                        </p>
                      </li>
                      <li className="flex-grow w-full h-1 ">
                        <p className="py-1 text-base text-white cursor-pointer bg-[#4CAF50] w-full text-center">
                          Support JS Bin: upgrade to PRO
                        </p>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <>

                  <span
                    onClick={toggleLoginDropdown}
                    className="bg-yellow-300 px-2 cursor-pointer"
                  >
                    Login or Register
                  </span>
                  {loginDropdownOpen && (
                    <ul className="absolute top-8 right-28 z-50 bg-white py-3 mt-1 shadow drop-shadow-md flex flex-col w-72 ">
                      <li className="flex items-center justify-between cursor-pointer  border
                 first-letter:  border-black py-2 mx-7 shadow-md mt-2 bg-gray-100 "
                        onClick={signInWithGithub}
                      >
                        <img src={cat} className="h-7 " />
                        <a className="block text-black">
                          Login or Register via Github
                        </a>
                      </li>
                      <li>
                        <Link
                          to={"login"}
                          className="block mt-2 ml-6 px-6 py-2 text-black bg-white hover:bg-gray-200 underline"
                        >
                          or use your email address
                        </Link>
                      </li>
                    </ul>
                  )}

                </>
              )
            }
            
          <Link to="/blog" >Blog</Link>
          <Link to="/help" >Help</Link>

          </div>
        </div>
      </header>

      {/* Pane style part */}

      <div style={{ height: 560, overflow: "hidden" }}>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          {paneVisibility.HTML && (
            <Pane style={paneStyle}>
              <div style={{ background: "#EDEDED", height: "100%" }}>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="py-2 px-4 rounded inline-flex items-center"
                    onClick={toggleHtmlDropdown}
                  >
                    <span className="text-sm text-sky-400 font-normal ">
                      HTML
                    </span>
                    <IoMdArrowDropdown className="ml-2 text-sm text-sky-400 mt-2" />
                  </button>

                  {htmlDropdownOpen && (
                    <ul className="absolute  bg-white py-3  right-50 top-full shadow drop-shadow-md flex flex-col w-44 z-10">
                      <li>
                        <a className="block px-4 py-2  text-sm text-black bg-white hover:bg-gray-200">
                          HTML
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          MarkDown
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          Jade
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Convert to HTML
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    height="540px"
                    theme={tokyoNightDay}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>
            </Pane>
          )}
          {paneVisibility.CSS && (
            <Pane style={paneStyle}>
              <div style={{ background: "#EDEDED", height: "100%" }}>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="py-2 px-4 rounded inline-flex items-center"
                    onClick={toggleCssDropdown}
                  >
                    <span className="text-sm text-sky-400 font-normal ">
                      CSS
                    </span>
                    <IoMdArrowDropdown className="ml-2 text-sm text-sky-400 mt-2" />
                  </button>
                  {cssDropdownOpen && (
                    <ul className="absolute bg-white py-3  right-90 top-10 shadow drop-shadow-md flex flex-col w-44 z-50">
                      <li>
                        <a className="block px-4 py-2  text-sm text-black bg-white hover:bg-gray-200">
                          CSS
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          Less
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          Myth
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-20">
                          Sass with Compass
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-2">
                          SCSS with Compass
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200" href="#">
                          Stylus
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Convert to CSS
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={css}
                    height="540px"
                    theme={tokyoNightDay}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value) => {
                      setCss(value);
                    }}
                  />
                </div>
              </div>
            </Pane>
          )}
          {paneVisibility.JavaScript && (
            <Pane style={paneStyle}>
              <div style={{ background: "#EDEDED", height: "100%" }}>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="py-2 px-4 rounded inline-flex items-center"
                    onClick={toggleJsDropdown}
                  >
                    <span className="text-sm text-sky-400 font-normal ">
                      JavaScript
                    </span>
                    <IoMdArrowDropdown className="ml-2 text-sm text-sky-400 mt-2" />
                  </button>
                  {jsDropdownOpen && (
                    <ul className="absolute bg-white py-3  right-90 top-10 shadow drop-shadow-md flex flex-col w-44 z-50">
                      <li>
                        <a className="block px-4 py-2  text-sm text-black bg-white hover:bg-gray-200">
                          Javascript
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          ES6/Babel
                        </a>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                        <a className="flex-grow text-sm text-black" href="#">
                          JSX(React)
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Coffe Script
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Traceur
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Typescript
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Processing
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Livescript
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Clojurescript
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200">
                          Convert to Javascript
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={js}
                    height="540px"
                    theme={tokyoNightDay}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value) => {
                      setJs(value);
                    }}
                  />
                </div>
              </div>
            </Pane>
          )}
          {paneVisibility.Console && (
            <Pane style={paneStyle}>
              <div style={{ background: "#EDEDED", height: "100%" }}>
                <div className="flex justify-between items-center ">
                  <h2 className="ml-3 mt-2 font-bold text-[#00000080]">
                    Console
                  </h2>
                  <div className="flex gap-4">
                    <button
                      className="bg-gray-200 text-sm border border-black
                     text-black rounded mt-2 px-2 mr-2"
                      onClick={clearConsole}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="p-2 h-full overflow-y-auto bg-[#EDEDED]">
                  {consoleOutput.map((msg, index) => (
                    <div key={index}>{msg}</div>
                  ))}
                </div>
              </div>
            </Pane>
          )}
          {paneVisibility.Output && (
            <Pane style={paneStyle}>
              <div style={{ background: "#EDEDED", height: "100%" }}>
                <div className="flex justify-between items-center text-center">
                  <h2 className="ml-3 mt-2 font-bold text-[#00000080] ">
                    Output
                  </h2>
                  <div className="flex gap-3 items-center text-center">
                    <button
                      className="bg-gray-200 border border-black
                     text-black rounded mt-2 px-2 text-sm"
                      onClick={() => {
                        updateOutput();
                        runJavaScript();
                      }}
                    >
                      Run with Js
                    </button>
                    <label
                      htmlFor="Auto-runJS"
                      className="flex items-center text-center space-x-2 text-sm mt-1"
                      onClick={() => {
                        updateOutput();
                        runJavaScript();
                      }}
                    >
                      Auto-runJS
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 text-sm
                         text-center items-center"
                      />
                    </label>
                  </div>
                </div>
                <iframe
                  title="Result"
                  srcDoc={output}
                  style={{
                    border: "none",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f0f0f0",
                  }}
                />
              </div>
            </Pane>
          )}
        </SplitPane>
      </div>

    {/* Footer part */}
      <Footer/>
    </>
  );
};

export default Header;
