import { useAuth } from "@/hooks/use-auth";
import crypto from "crypto";
import QueryString from "query-string";
import useSWR from "swr";

export default function useCustomSWR(
  ready,
  path,
  auth = true,
  options = {
    permissions: [],
  },
  queryParams = {},
  method = "GET",
  requestBody = null,
) {
  let swrOption = {
    suspense: false,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    dedupingInterval: 6000, // แคชข้อมูลเป็นเวลา 60 วินาที
    ...options,
  };

  const { fetcherWithAuth, fetcher, can, user } = useAuth();
  // check permissions
  // if (swrOption.permissions?.length > 0 && !can(swrOption.permissions)) {
  //   ready = false;
  // } else {
  //   swrOption = omit(swrOption, ["permissions"]);
  // }
  if (!queryParams) {
    queryParams = {};
  }
  if (!requestBody) {
    requestBody = {};
  }
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ ...queryParams, ...requestBody }))
    .digest("hex")
    .substring(0, 8);
  queryParams.sha = hash;
  let _path = path;
  if (Object.keys(queryParams).length > 0) {
    const query = QueryString.stringify(queryParams, {
      arrayFormat: "bracket",
    });
    _path = [_path, query].join("?");
  }

  let _fetcher = fetcher;
  _fetcher = fetcherWithAuth;
  const __fetcher = async (...args) => {
    if (!args[1]) args.push({});
    if (method !== "GET") {
      args[1].method = method;
      if (!!requestBody) {
        args[1].body = JSON.stringify(requestBody);
      }
    }
    return _fetcher(...args);
  };
  const readyCheck = () => {
    return ready;
  };
  const swr = useSWR(readyCheck() ? _path : null, __fetcher, swrOption);
  const rowCount = swr.data?.total_count || 0;
  return { ...swr, rowCount };
}
