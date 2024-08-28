import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
// import { toggleNotice } from "@/lib/toolkit/reducers/notice";
import { useSearchParams } from "react-router-dom";
import DeferredReasonForm from "./deferred-reason-form";
import { useState } from "react";

export default function SelectedApplicationAction({ rows, status }) {
  const [commentFormShow, setCommentFormShow] = useState(false),
  // const [comment, setComment] = useState({
  //     show: false,
  //     payload: null,
  //   }),
    dispatch = useDispatch(),
    [url] = useSearchParams(),
    // status = url.get("status"),
    toggleAction = (action, comment) => () => {
      const payload = {
        data: rows.reduce(
          (tableRows, row) => [...tableRows, row.original.id],
          []
        ),
        action,
      };
      action === "deferring" ? (payload.comment = comment) : null;

        console.log('Appliation action is =>', action)


      dispatch(
        // toggleNotice({
        //   show: true,
        //   message: `${rows.length} has been selected for batch ${action}, do you wish to continue with this action`,
        //   url: "/applications/action",
        //   mutation: `/application?status=${status}`,
        //   method: "patch",
        //   payload,
        // })
      );
    };

  const updateComment = (comment) => {
    setCommentFormShow(!commentFormShow);
    toggleAction("deferring", comment)()
  },
    toggleDeclineForm = () =>
      setCommentFormShow(!commentFormShow);
    
  console.log('Current status', status)
  
  return (
    <>
      <div className="flex space-x-3">
        {(status === "received" || !status) && (
          <>
            <Button
              className="h-8 leading-3"
              variant="success"
              disabled={rows?.length === 0}
              onClick={toggleAction("recommendation")}
            >
              Recommend
            </Button>

            <Button
              className="h-8 leading-3"
              variant="warn"
              // className="bg-amber-500"
              disabled={rows?.length === 0}
              onClick={toggleAction("defer")}
            >
              Defer
            </Button>

            <Button
              className="h-8 leading-3"
              variant="danger"
              disabled={rows?.length === 0}
              onClick={toggleAction("delete")}
            >
              Delete
            </Button>
          </>
        )}

        {status === "recommended" && (
          <>
            <Button
              className="h-8 leading-3 bg-green-500 text-white"
              disabled={rows?.length === 0}
              onClick={toggleAction("approval")}
            >
              Approve
            </Button>

            {/* <Button
              className="h-8 leading-3 bg-amber-600 text-white"
              disabled={rows?.length === 0}
              onClick={toggleDeclineForm}
            >
              Defer
            </Button> */}

            {/* <Button
              className="h-8 leading-3"
              variant="danger"
              disabled={rows?.length === 0}
              onClick={toggleAction("rejection")}
            >
              Reject
            </Button> */}
          </>
        )}
      </div>

      {commentFormShow && (
        <DeferredReasonForm updateComment={updateComment} close={toggleDeclineForm} />
      )}
    </>
  );
}
