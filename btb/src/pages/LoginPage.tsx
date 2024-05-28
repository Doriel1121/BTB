import { FormEvent, useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { LoginModel } from "../models/LoginMode.interface";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

export default function LoginPage() {
  const userRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError, fetchData } = useFetch<any>();
  const [displayMessage, setDisplayMessage] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fieldsValues = Object.fromEntries(new FormData(form).entries());
    const payload: LoginModel = {
      username: fieldsValues.username as string,
      password: fieldsValues.password as string,
    };
    sendRequest(payload);
  }
  const handleSuccess = (data: any) => {
    if (data.success) {
      localStorage.setItem("jwtToken", data?.token);
      localStorage.setItem("userData", JSON.stringify(data?.user));
      setDisplayMessage(false);
      navigate("/");
    } else {
      setDisplayMessage(true);
    }
  };

  function sendRequest(payload: LoginModel) {
    fetchData("login", "post", payload, handleSuccess);
  }

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <div className="formWrapper">
      <div className="formContainer">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <TextField
            InputProps={{
              sx: { borderRadius: "10px" },
            }}
            sx={{ width: "100%" }}
            type="text"
            id="username"
            name="username"
            ref={userRef}
            required
          />
          <FormLabel>Password:</FormLabel>
          <TextField
            InputProps={{
              sx: { borderRadius: "10px", width: "100%" },
            }}
            sx={{ width: "100%" }}
            type="password"
            id="password"
            name="password"
            required
          />
          <span className="errorMessage">
            {displayMessage ? "Incorrect Password or Username" : null}
          </span>
          <Button
            sx={{ background: "black", width: "100%", marginTop: "10px" }}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
