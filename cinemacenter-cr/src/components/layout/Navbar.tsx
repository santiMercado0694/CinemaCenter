"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import * as React from 'react';

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
  subItems?: { name: string; href: string }[]; // Sub-items for dropdown
};

const navigation: NavigationItem[] = [
  {
    name: "Cine Coliseo",
    href: "#",
    current: false,
    subItems: [
      { name: "DeadPool & Wolverine", href: "#" },
      { name: "Intensamente 2", href: "#" },
      { name: "Mi Villano Favorito 4", href: "#" },
    ],
  },
  {
    name: "Teatro Español",
    href: "#",
    current: false,
    subItems: [
      { name: "Twister", href: "#" },
      { name: "Un Lugar En Silencio Día Uno", href: "#" },
    ],
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [currentMenu, setCurrentMenu] = React.useState<string | null>(null);

  const handleMouseEnter = (menuName: string) => {
    setCurrentMenu(menuName);
  };

  const handleMouseLeave = () => {
    setCurrentMenu(null);
  };

  return (
    <MaxWidthWrapper>
      <Disclosure as="nav" className="bg-gray-800 mt-4">
        <div className="py-2 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            {/* Logo Container */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-start">
                <Image
                  alt="Your Company"
                  src="/logoCine.png"
                  width={150}
                  height={50}
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex pr-96">
              <div className="hidden sm:flex sm:ml-6">
                <div className="flex space-x-5 items-center">
                  {navigation.map((item) =>
                    item.subItems ? (
                      <div
                        key={item.name}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                        className="relative"
                      >
                        <a
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                        {currentMenu === item.name && (
                          <div
                            className="absolute z-10 mt-2 bg-gray-700 text-white rounded-md shadow-lg"
                            style={{ minWidth: '200px' }}
                          >
                            {item.subItems.map(subItem => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm hover:bg-gray-600"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </MaxWidthWrapper>
  );
}
