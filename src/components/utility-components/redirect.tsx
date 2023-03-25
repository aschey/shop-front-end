import React, { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    const domain1 = "shop-front-end.onrender.com";
    const domain2 = "masterchefgeorgi.ddns.net";

    if (window.location.hostname === domain1) {
      window.location.replace(`https://${domain2}${window.location.pathname}`);
    }
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
