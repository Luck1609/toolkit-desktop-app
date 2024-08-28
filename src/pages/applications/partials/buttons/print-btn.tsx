import { useDispatch } from 'react-redux'
import { Printer } from "lucide-react";
import { Button } from '@/components/ui/button'
import { togglePreviewModal } from '@/lib/toolkit/reducers/modal';

export default function PrintBtn({data, title}) {
  const dispatch = useDispatch();

  const toggleForm = () =>
    dispatch(
      togglePreviewModal({
        data,
        show: true,
        component: "applicationPrint",
        title,
        wrap: false,
        className: "!max-w-6xl"
      })
    );

  return (
    <Button
      className="flex items-center space-x-1"
      variant="primary"
      onClick={toggleForm}
    >
      <Printer size={18} />
      <span className="">Print</span>
    </Button>
  );
}
