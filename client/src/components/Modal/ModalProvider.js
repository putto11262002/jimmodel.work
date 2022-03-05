
import { useCreateJobModalContext } from "../../context/secured/createJobModalContext";
import { useCreateOptionModalContext } from "../../context/secured/createOptionModalContext";
import { useDayModalContext } from "../../context/secured/dayModalContext";
import { useJobModalContext } from "../../context/secured/jobModalContext";
import { useOptionModalContext } from "../../context/secured/optionModalContext";
import { useUpdateOptionModalContext } from "../../context/secured/updateOptionModalContext";
import { useUpdateJobModalContext } from "../../context/secured/updateJobModalContext";
import DayModal from "./calender/DayModal";
import CreateJobModal from "./job/CreateJobModal";
import JobModal from "./job/JobModal";
import UpdateJobModal from "./job/UpdateJobModal";
import CreateOptionModal from "./option/CreateOptionModal";
import OptionModal from "./option/OptionModal";
import UpdateOptionModal from "./option/UpdateOptionModal";
import { useBlockModelModalContext } from "../../context/secured/BlockModelModalContext";
import BlockModelModal from "./option/BlockModelModal";


export default function ModalProvider() {
    const {show: showCreateOptionModal } = useCreateOptionModalContext();
    const {show: showCreateJobModal} = useCreateJobModalContext();
    const {show: showDayModal} = useDayModalContext();
    const {show: showOptionModal} = useOptionModalContext();
    const {show: showUpdateOptionModal} = useUpdateOptionModalContext();
    const {show: showUpdateJobModal} = useUpdateJobModalContext();
    const {show: showJobModal} = useJobModalContext();
    const {show: showBlockModelModal} = useBlockModelModalContext()

  return <>
  {showCreateOptionModal && <CreateOptionModal/>}
 {showCreateJobModal && <CreateJobModal/>}
 {showDayModal && <DayModal/>}
{showOptionModal && <OptionModal/>}
{showUpdateOptionModal && <UpdateOptionModal/>}
{showUpdateJobModal && <UpdateJobModal/>}
{showJobModal && <JobModal/>}
{showBlockModelModal && <BlockModelModal/>}


  </>;
}
