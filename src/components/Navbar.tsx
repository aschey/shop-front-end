import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import CartContext from "../contexts/cart/CartContext";
import * as Scroll from "react-scroll";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

interface NavItem {
  name: string;
  to: string;
  current: boolean;
}

const navigation: NavItem[] = [
  { name: "Home", to: "/home", current: true },
  { name: "Shop", to: "/shop", current: false },
  { name: "About", to: "/about", current: false },
  { name: "Contact", to: "/#contact", current: false },
];

export default function NavbarComponent() {
  //   const { user, setUser, newDisplayName } = useContext(UserContext);
  const [nav, setNav] = useState(navigation);
  const navigate = useNavigate();
  const { itemCount } = useContext(CartContext);
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const scroller = Scroll.scroller;
  const [anchorClicked, setAnchorClicked] = useState(false);

  useEffect(() => {
    let navigation = updateNavigation(nav);

    setNav([...navigation]);
  }, [window.location.pathname]);

  const updateNavigation = (navigation: NavItem[]) => {
    const pathName = window.location.pathname;

    // loop through the navigation array
    for (let i = 0; i < navigation.length; i++) {
      if (pathName === navigation[i].to.toLowerCase()) {
        // if the URL path contains the href value, set current to true
        navigation[i].current = true;

        //note if contact is clicked, home will be true, and contact is false
      } else {
        // otherwise, set current to false
        navigation[i].current = false;
      }
    }

    return navigation;
  };

  useEffect(() => {
    if (path === "/home" && anchorClicked) {
      scrollToAnchor();
    } else if (path === "/shop" || path === "/about") {
      setAnchorClicked(false);
    }
  }, [path]);

  const scrollToAnchor = () => {
    scroller.scrollTo("contact", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -10,
    });
  };

  const goToHomeAndScroll = async () => {
    navigate("/");
    setAnchorClicked(true);
  };

  return (
    <header>
      <Navbar fluid={true} rounded={true} className="fixed z-50 w-full">
        <Navbar.Brand
          href="/"
          className="flex md:min-w-[200px] lg:items-center"
        >
          <p className="text-shadow-header relative bottom-2 mr-3 h-9 text-6xl lg:static lg:text-4xl">
            🇧🇬
          </p>
          <span className="text-shadow-header hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white md:inline lg:text-2xl">
            MasterChef Georgi
          </span>
          {/* </a> */}
        </Navbar.Brand>
        <div className="flex md:order-2">
          {/* ---------------Shopping Cart Button START------------ */}
          <>
            <Link
              to="/cart"
              className="relative mr-3 rounded-lg bg-secondary-600 px-3 py-1.5 text-sm font-medium text-white shadow-md hover:bg-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 26 26"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-8 w-14 lg:h-8 lg:w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCount ? (
                <>
                  <span className="absolute right-[-6px] bottom-[-6px] flex h-6 w-6 lg:bottom-[-5px] lg:right-[-5px] lg:h-5 lg:w-5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-75"></span>
                    <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary-300 text-xl text-white lg:h-5 lg:w-5 lg:text-xs">
                      {itemCount}
                    </span>
                  </span>
                </>
              ) : null}
            </Link>
          </>
          {/* ---------------Shopping Cart Button END------------*/}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {navigation.map((item) =>
            item.name === "Contact" ? (
              <li key={item.name}>
                {location === "home" ? (
                  <button
                    className={
                      anchorClicked
                        ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-xl text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-xl lg:text-primary-700"
                        : "block border-b border-gray-100 py-2 pl-3 text-xl text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:text-xl lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                    }
                    onClick={scrollToAnchor}
                  >
                    Contact
                  </button>
                ) : (
                  <button
                    className={
                      anchorClicked
                        ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-xl text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-xl lg:text-primary-700"
                        : "block border-b border-gray-100 py-2 pl-3 text-xl text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:text-xl lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                    }
                    onClick={goToHomeAndScroll}
                  >
                    Contact
                  </button>
                )}
              </li>
            ) : (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className={
                    item.current
                      ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-xl text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-xl lg:text-primary-700"
                      : "block border-b border-gray-100 py-2 pl-3 text-xl text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:text-xl lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
