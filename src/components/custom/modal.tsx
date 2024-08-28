import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "@/lib/redux/hooks";
import { toggleModal } from "@/lib/redux/slice/notice";
import { modalGroup } from "@/lib/modals";

export default function Modal() {
  const { modal } = useSelector((state) => state.notice),
    dispatch = useDispatch(),
    close = () => dispatch(toggleModal());

  const Component = modalGroup[modal.content as keyof typeof modalGroup]


  return (
    modal.show ? (
      <Dialog open={modal.show} onOpenChange={close}>
        <DialogContent className={cn("dark:!bg-default w-full max-w-3xl", modal?.className)}>
          {modal?.wrap === false ? (
            <Component data={modal?.data} />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center mb-3 border-b dark:border-input pb-3">
                  {modal?.title}
                </DialogTitle>

                <div className="!text-slate-300">
                  <Component data={modal?.data} />
                </div>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    ) : null
  );
}
