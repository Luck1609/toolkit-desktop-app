import SessionBtn from "./start-session-btn";
import NewAppBtn from "./new-app-btn";
import MeetingScheduleBtn from "./meeting-schedule-btn";
import EndSessionBtn from "./end-session-btn";
import FinalizeBtn from "./finalize";
import { useSelector } from "@/lib/redux/hooks";

export default function AppActionButtons() {
  const {session} = useSelector(state => state.session)
  
  
  // console.log("Quarter details", session)

  return (
    <>
      {!session
        ? (
          // Start new session if there is no active session
          <SessionBtn />
        )
        : session?.finalized
          ? (
            <>
              {/* If the active session is marked as finalized */}
              {!session?.tsc ? <MeetingScheduleBtn /> : null}
              <EndSessionBtn />
            </>
          )
          : (
            <>
              <NewAppBtn />
              <FinalizeBtn />
            </>
          )
      }
    </>
  );
}
