//TEST

import { User } from "./data";
import { useState } from "react";
import AdminPannel from "./AdminPannel";

export default function Admin() {
  const [isLogged, setIsLogged] = useState(false);
  const [login, setLogin] = useState("");
  const [code, setCode] = useState("");

  const getData = () => {
    // Check if login and code match the User data
    if (login === User.name && Number(code) === User.code) {
      setIsLogged(true);
    } else {
      alert("Wrong login or code");
    }
    setLogin("");
    setCode("");
  };

  return (
    <>
      {!isLogged ? (
        <div className="h-screen w-screen flex items-center">
          <div className="mx-auto bg-slate-100 h-[400px] w-[250px] p-4">
            <label>Login</label>
            <input
              className="mt-1 m-2"
              type="text"
              placeholder="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)} // Store login input
            />
            <label>Code</label>
            <input
              className="mt-1 m-2"
              type="text"
              placeholder="code"
              value={code}
              onChange={(e) => setCode(e.target.value)} // Store code input
            />
            <button
              className="ml-[35%] border-2 p-1 rounded-lg bg-slate-300"
              onClick={getData}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <AdminPannel />
      )}
    </>
  );
}
