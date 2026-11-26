"use client";
import { getApiPath } from "@/helpers";
import { intersection } from "lodash";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";

const API_PATHS = {
  PROFILE_PATH: "/api/v1/liff/sessions/me",
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthProvider() {
  const [liffObject, setLiffObject] = useState(null);

  const can = (permissions = []) => {
    if (permissions === "no_permission") {
      return true;
    }
    if (typeof permissions === "string") {
      permissions = [permissions];
    }
    return (
      intersection(permissions, lineUser?.user?.role.permissions).length > 0
    );
  };

  const fetcher = async (...args) => {
    const replaceParams = {};
    args[0] = getApiPath(args[0], true, replaceParams);
    if (args.length <= 1) {
      args.push({});
    }
    const options = args[1];
    if (!options.headers) {
      options.headers = {};
    }
    if (options.is_form_data !== null && !options.is_form_data) {
      options.headers["content-type"] = "application/json";
    }
    let json;
    let response = await fetch(...args);
    if (!!options.file) {
      return response;
    }
    if (!options.is_image_url) {
      json = await response.json();
      json.response = response;
    } else {
      json = await response.text();
    }
    return json;
  };
  const fetcherWithAuth = async (...args) => {
    if (args.length <= 1) {
      args.push({});
    }
    const options = args[1];
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["x-liff-id"] = process.env.NEXT_PUBLIC_LIFF_ID;
    options.headers["Authorization"] = `Liff ${liff.getAccessToken()}`;
    const json = await fetcher(...args);
    if (!!options?.file) {
      return json;
    }
    if (json?.response.status === 401) {
      window.alert(json.response.status);
      return;
    }
    return json;
  };

  const {
    data: lineUser,
    error: lineUserError,
    mutate: mutateLineUser,
  } = useSWR(
    API_PATHS.PROFILE_PATH,
    async (...args) => {
      const json = await fetcherWithAuth(...args);
      return json;
    },
    {
      refreshInterval: 60000,
    },
  );

  return {
    can,
    fetcher,
    fetcherWithAuth,
    liffObject,
    setLiffObject,
    lineUser,
    lineUserError,
    mutateLineUser,
  };
}
