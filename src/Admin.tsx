//TEST
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "./data";
import { useState, useEffect } from "react";
import AdminPannel from "./AdminPannel";
import { ModeToggle } from "./components/ModeToggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Admin() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [login, setLogin] = useState("");
  const [code, setCode] = useState("");
  const [timers, setTimer] = useState<number>(5);

  const logOutFunction = () => {
    setIsLogged(!isLogged);
  };
  const getData = () => {
    // Check if login and code match the User data
    if (User.tries > 0) {
      if (login === User.name && Number(code) === User.code) {
        setIsLogged(true);
      } else {
        // alert("Wrong login or code");
        setShowPopup(!showPopup);
        User.tries -= 1;
      }
      setLogin("");
      setCode("");
    } else {
      alert("No more tries");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setShowPopup(false); // Close popup when timer reaches 0
          return 5; // Reset timer for next popup
        }
        return prev - 1;
      });
    }, 1000);
    // I will be deleted while component is unmounting.
    return () => {
      clearTimeout(interval);
      clearTimeout(timer);
    };
  }, [showPopup]);

  let popup: any = null;
  if (showPopup) {
    popup = (
      <div className="h-screen w-screen fixed flex items-center justify-center bg-[#00000033]">
        <div className="">
          <Alert>
            <AlertTitle>Opps! Wrong data! Close in: {timers}</AlertTitle>
            <AlertDescription>
              Check again if you entered everything correctly. Tries remaining:{" "}
              {User.tries}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="absolute right-0 m-5">
        <ModeToggle />
      </div>
      {!isLogged ? (
        <>
          {popup}
          <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-[300px]">
              <CardHeader>
                <CardTitle>Login to Admin Pannel</CardTitle>
                <CardDescription>Manual</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="login">Login</Label>
                <Input
                  type="text"
                  id="Login"
                  placeholder="login"
                  onChange={(e) => setLogin(e.target.value)}
                />
                <Label htmlFor="password">Code</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="code"
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button className="mt-4" onClick={getData}>
                  Submit
                </Button>
              </CardContent>
              <CardFooter>
                <pre className="font-sans">Go back to </pre>
                <Link to="/">
                  <p className="underline">main page</p>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <AdminPannel userName={User.fullName} logOut={logOutFunction} />
      )}
    </>
  );
}
