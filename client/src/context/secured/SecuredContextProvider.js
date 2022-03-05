import { useSessionContext } from "../unsecured/sessionContext";
import BlockModelModalContextProvider from "./BlockModelModalContext";
import CreateJobModalContextProvider from "./createJobModalContext";
import CreateOptionModalContextProvider from "./createOptionModalContext";
import DayModalContextProvider from "./dayModalContext";
import JobContextProvider from "./jobContext";
import JobModalContextProvider from "./jobModalContext";
import ModelContextProvider from "./modelContext";
import OptionModalContextProvider from "./optionModalContext";
import UpdateJobModalContextProvider from "./updateJobModalContext";
import UpdateOptionModalContextProvider from "./updateOptionModalContext";
import UserContextProvider from "./userContext";

export default function SecuredContextProvider({ children }) {
  const {loginStatus} = useSessionContext();
  if(loginStatus){
    return (
        <>
          <ModelContextProvider>
            <JobContextProvider>
              <UserContextProvider>
                <JobModalContextProvider>
                  <CreateJobModalContextProvider>
                    <UpdateJobModalContextProvider>
                      <OptionModalContextProvider>
                        <CreateOptionModalContextProvider>
                          <UpdateOptionModalContextProvider>
                            <DayModalContextProvider>
                              <BlockModelModalContextProvider>
                              {children}
                              </BlockModelModalContextProvider>
                            </DayModalContextProvider>
                          </UpdateOptionModalContextProvider>
                        </CreateOptionModalContextProvider>
                      </OptionModalContextProvider>
                    </UpdateJobModalContextProvider>
                  </CreateJobModalContextProvider>
                </JobModalContextProvider>
              </UserContextProvider>
            </JobContextProvider>
          </ModelContextProvider>
        </>
      );
  }else{
      return <>{children}</>
  }
}
