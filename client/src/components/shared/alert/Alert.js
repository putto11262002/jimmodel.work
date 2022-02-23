import { useEffect } from "react";
import { useAlertContext } from "../../../context/unsecured/alertContext";
import './index.scss'
export default function Alert() {
  const {alert,alertActions} = useAlertContext()
  useEffect(() => {
    var timer;
    if(alert.show){
     timer = setTimeout(() => alertActions.setHide(), 5000);
    }
    return () => clearTimeout(timer);
  }, [alert]);
 if(alert.show){
  return (
    <div className="rounded alert-container border shadow p-0">
      <div className={`alert alert-${alert.colour} m-0 text-center`} role="alert">
        {alert.message}
      </div>
    </div>
  );
 }else {
   return null;
 }
}
