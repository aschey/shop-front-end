import React, {
  useState,
  useEffect,
  useContext,
  ReactHTMLElement,
  HtmlHTMLAttributes,
} from "react";
// import { UserContext } from "../context/UserContextProvider";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import CartContext from "../contexts/cart/CartContext";
import * as Scroll from "react-scroll";

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

export default function Navbar() {
  //   const { user, setUser, newDisplayName } = useContext(UserContext);
  const [nav, setNav] = useState(navigation);
  const navigate = useNavigate();
  const { cartItems, itemCount } = useContext(CartContext);
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const scroller = Scroll.scroller;
  const [anchorClicked, setAnchorClicked] = useState(false);

  console.log("cart item from context");
  console.log(cartItems);

  useEffect(() => {
    console.log("useEffect navbar ");
    console.log("window.location.pathname: " + window.location.pathname);
    let navigation = updateNavigation(nav);
    console.log(navigation);
    setNav([...navigation]);
  }, [window.location.pathname]);

  const updateNavigation = (navigation: NavItem[]) => {
    const pathName = window.location.pathname;

    console.log("pathName: " + pathName);

    // loop through the navigation array
    for (let i = 0; i < navigation.length; i++) {
      if (pathName === navigation[i].to.toLowerCase()) {
        // if the URL path contains the href value, set current to true
        navigation[i].current = true;
        console.log("pathName: " + pathName + "nagivation.current is true");

        //note if contact is clicked, home will be true, and contact is false
      } else {
        // otherwise, set current to false
        navigation[i].current = false;
      }
    }
    console.log("navigation: ");
    console.log(navigation);
    return navigation;
  };

  useEffect(() => {
    console.log("path");
    if (path === "/home" && anchorClicked) {
      console.log("path is /home");
      scrollToAnchor();
    } else if (path === "/shop" || path === "/about") {
      setAnchorClicked(false);
    }
  }, [path]);

  const scrollToAnchor = () => {
    console.log("scroll to anchor");
    scroller.scrollTo("contact", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -10,
    });
  };

  const goToHomeAndScroll = async () => {
    console.log("go to home and scroll");
    navigate("/");
    setAnchorClicked(true);
  };

  return (
    <header>
      <nav className="fixed z-50 w-full border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <a href="/" className="flex items-center md:min-w-[200px]">
            <p className="text-shadow-header mr-3 h-9 text-4xl">🇧🇬</p>
            <span className="text-shadow-header self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              MasterChef Georgi
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {/* <a
              href="#"
              className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
            >
              Log in
            </a> */}
            {/* ---------------Shopping Cart Button START------------*/}
            <>
              <Link
                to="/cart"
                className="relative mr-2 rounded-lg bg-secondary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {itemCount ? (
                  <>
                    <span className="absolute right-[-5px] bottom-[-5px] flex h-5 w-5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-75"></span>
                      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-300 text-xs text-white">
                        {itemCount}
                      </span>
                    </span>
                  </>
                ) : null}
              </Link>
            </>

            {/* ---------------Shopping Cart Button END------------*/}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              {navigation.map((item) =>
                item.name === "Contact" ? (
                  <li key={item.name}>
                    {location === "home" ? (
                      <button
                        className={
                          anchorClicked
                            ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700"
                            : "block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                        }
                        onClick={scrollToAnchor}
                      >
                        Contact
                      </button>
                    ) : (
                      <button
                        className={
                          anchorClicked
                            ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700"
                            : "block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
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
                          ? "block rounded bg-primary-700 py-2 pr-4 pl-3 text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700"
                          : "block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
