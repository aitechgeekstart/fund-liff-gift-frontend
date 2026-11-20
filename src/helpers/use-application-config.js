import { createContext, useContext, useState } from "react";

const ApplicationConfigContext = createContext();
export default function ApplicationConfigProvider({ children }) {
  const applicationConfig = useApplicationConfigProvider();
  return (
    <ApplicationConfigContext.Provider value={applicationConfig}>
      {children}
    </ApplicationConfigContext.Provider>
  );
}

export const useApplicationConfig = () => {
  return useContext(ApplicationConfigContext);
};

function useApplicationConfigProvider() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [activeMenu, setActiveMenu] = useState([]);
  return { breadcrumbs, setBreadcrumbs, activeMenu, setActiveMenu };
}
