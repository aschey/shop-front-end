import React, { useState, ChangeEvent, FormEvent } from "react";
import { SystemMessage } from "./utility-components/system";
import { SysMsg } from "../types/interface";

export default function ContactForm() {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("Submit");
  const [sysMsg, setSysMsg] = useState<SysMsg>({
    statusCode: 0,
    message: "",
  });

  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    let value = event.target.value;

    setState({ ...state, [event.target.id]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //then need to send this message to the backend
    let response = await fetch(import.meta.env.VITE_BACKEND_CONTACT_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(state),
    });

    setStatus("Submit");

    //get response from backend
    let result = await response.json();

    if (result.status === 200) {
      setSysMsg({ statusCode: result.status, message: "Message Sent" });

      //reset form if successful msg is sent
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    } else {
      setSysMsg({
        statusCode: result.status,
        message: "Message Not Sent. Try Again Later",
      });
    }
  };

  return (
    <>
      <section className="bg-secondary-50 dark:bg-gray-900">
        <div className="mx-auto mt-10 max-w-screen-md py-24 px-4 lg:mt-1 lg:py-16">
          <h2 className="mb-4 text-center text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
            Contact Us
          </h2>
          <p className="mt-8 mb-12 text-center text-3xl font-light text-gray-500 dark:text-gray-400 lg:mb-16 lg:text-xl">
            Why not add some Bulgarian flair to your next party or special
            event? We provide catering services that meet your need. Call us
            directly for a direct quote.
          </p>
          <table className="border-lg mx-auto mb-16 w-full table-fixed rounded-lg bg-white lg:w-4/5">
            <thead>
              <tr>
                <th className="w-1/4 pt-4 text-secondary-900">
                  <div className="flex justify-center gap-2 text-2xl lg:text-xl">
                    Call
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                </th>
                <th className="w-2/4 pt-4 text-secondary-900">
                  <div className="flex justify-center gap-2 text-2xl lg:text-xl">
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                </th>
                <th className="w-1/4 pt-4 text-secondary-900">
                  <div className="flex justify-center gap-2 text-2xl lg:text-xl">
                    Location
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/4 py-4 text-center text-2xl lg:text-xl">
                  +1 xxx-xxx-xxxx
                </td>
                <td className="w-2/4 text-center text-2xl lg:text-xl">
                  xyz@masterchef-georgi.com
                </td>
                <td className="w-1/4 text-center text-2xl lg:text-xl">
                  Chicago, IL
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <p className="my-10 text-center text-4xl font-light text-gray-500 dark:text-gray-400 lg:mb-16 lg:text-xl">
            Have Questions? Leave Us A Message!
          </p>
          <form onSubmit={onSubmit} id="contact-form" className="space-y-4">
            <div className="flex w-full gap-5">
              <div className="w-1/4 flex-col">
                <label
                  htmlFor="firstname"
                  className="mb-2 block text-2xl font-medium text-gray-900 dark:text-gray-300 lg:text-sm"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500 lg:text-sm"
                  placeholder="First Name"
                  onChange={onFieldChange}
                  required
                />
              </div>
              <div className="w-1/4 flex-col">
                <label
                  htmlFor="lastname"
                  className="mb-2 block text-2xl font-medium text-gray-900 dark:text-gray-300 lg:text-sm"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500 lg:text-sm"
                  placeholder="Last Name"
                  onChange={onFieldChange}
                  required
                />
              </div>
              <div className="w-1/2 flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 block text-2xl font-medium text-gray-900 dark:text-gray-300 lg:text-sm"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500 lg:text-sm"
                  placeholder="name@email.com"
                  onChange={onFieldChange}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-2xl font-medium text-gray-900 dark:text-gray-300 lg:text-sm"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-2xl text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500 lg:text-sm"
                placeholder="Let us know how we can help"
                onChange={onFieldChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-2xl font-medium text-gray-900 dark:text-gray-400 lg:text-sm"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 lg:text-sm"
                placeholder="Leave a comment..."
                onChange={onFieldChange}
                minLength={10}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-secondary-500 py-4 px-6 text-center text-3xl font-medium text-white hover:bg-secondary-300 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-fit lg:py-3 lg:text-sm"
            >
              Send message
            </button>
          </form>
          {sysMsg.statusCode > "0" ? <SystemMessage sysMsg={sysMsg} /> : null}
        </div>
      </section>
    </>
  );
}
