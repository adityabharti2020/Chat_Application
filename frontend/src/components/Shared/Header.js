import React from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
// import className from "classname";
import { useNavigate } from "react-router-dom";
import { Popover, Transition, Menu } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../api/axios";


const Header = () => {
  const navigate = useNavigate();
 

  return (
    <div className="h-16 px-4 bg-cyan-500 flex justify-between items-center">
      <div className="relative">
        <HiOutlineSearch
          fontSize={25}
          className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search...."
          className="text-sm pr-4 pl-11 focus:outline-none rounded h-10 w-[24rem]"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open && "bg-slate-300"}
                  inline-flex items-center text-gray-700 hover:text-opacity-900 focus:outline-none active:bg-slate-300 p-1.5 rounded-lg`
                }
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="mt-3 absolute right-1 z-10 w-80">
                  <div className="shadow-md rounded-sm ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-900 font-medium">
                      Messages
                    </strong>
                    <div className="mt-3 px-1 text-sm">
                      <p>This is The Pannel</p>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open && "bg-slate-300"}
                  "inline-flex items-center text-gray-700 hover:text-opacity-900 focus:outline-none active:bg-slate-300 p-1.5 rounded-lg`}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="mt-3 absolute right-1 z-10 w-80">
                  <div className="shadow-md rounded-sm ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-900 font-medium">
                      Notification
                    </strong>
                    <div className="mt-3 px-1 text-sm">
                      <p>This is Notification Pannel</p>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-600">
              <span className="sr-only">Open User Menu</span>
              <div className="flex justify-center items-center">
                <img
                  src="https://source.unsplash.com/60x60?face"
                  className="h-12 w-12 rounded-full"
                />
                <span className="sr-only">Aditya Bharti</span>
                {/*style={{background:'url("https://source.unsplash.com/60x60?face")'}} */}
              </div>
            </Menu.Button>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-10 right-0 w-48 rounded-sm mt-2 shadow-md p-1 bg-white ring-1 ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`
                      ${active && "bg-gray-100"}
                      "text-gray-700 hover:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ring-black ring-1 ring-opacity-5`}
                    onClick={() => navigate("/profile")}
                  >
                    Your profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`
                      ${active && "bg-gray-100"}
                      "text-gray-700 hover:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ring-black ring-1 ring-opacity-5`
                    }
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`
                    ${active && "bg-gray-100"}
                    "text-gray-700 hover:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ring-black ring-1 ring-opacity-5`
                    }
                    
                  >
                    logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Header