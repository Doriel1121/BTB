import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";

export default function Header() {
  const [username, setUserName] = useState();
  const { handleLogout } = useContext(AppContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    setUserName(user);
  }, []);

  return (
    <div className="header">
      <span>RICK & MORTY</span>
      <span onClick={() => handleLogout()}>{username?.firstName}</span>
    </div>
  );
}
