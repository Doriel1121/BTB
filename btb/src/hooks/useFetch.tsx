import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

type FetchType = "get" | "post";

export function useFetch<T>(baseUrl?: string) {
  const defaultUrl = "http://localhost:3000/";
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    isError: false,
  });
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (
      path: string,
      type: FetchType,
      payload: any = null,
      onSuccess?: (data: T) => void,
      onError?: (error: any) => void
    ) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isError: false,
      }));
      try {
        const url = `${baseUrl ? baseUrl : defaultUrl}${path}`;
        const headers = { Authorization: `Bearer ${token}` };
        let response;
        if (type === "get") {
          response = await axios.get<T>(url, {
            headers,
          });
        } else {
          response = await axios.post<T>(url, payload, {
            headers,
          });
        }
        setState({ data: response.data, isLoading: false, isError: false });
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (error) {
        setState({ data: null, isLoading: false, isError: true });
        if (onError) {
          onError(error);
        }
        if (
          error.response &&
          !error.response.data.success &&
          error.response.data.message === "Unauthorized"
        ) {
          localStorage.clear();
          navigate("/login");
        }
      }
    },
    [baseUrl, navigate, token]
  );

  return { ...state, fetchData };
}
