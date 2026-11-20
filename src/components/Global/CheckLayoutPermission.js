import LoadingScreen from "./LoadingScreen";
import NoPermission from "./NoPermission";
import { useAuth } from "/src/hooks/use-auth";

export default function CheckLayoutPermission({ permissions, children }) {
  const { can, authStatus } = useAuth();
  if (authStatus === "preparing") {
    return <LoadingScreen></LoadingScreen>;
  }
  if (can(permissions)) {
    return children;
  }
  return <NoPermission />;
}
