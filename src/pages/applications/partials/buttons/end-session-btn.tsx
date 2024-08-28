import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { toggleModal } from '@/lib/redux/slice/notice';

export default function EndSessionBtn() {
  const dispatch = useDispatch();

  const toggleForm = () =>
    dispatch(
      toggleModal({
        show: true,
        title: "End permit session",
        url: "/quarter",
        content: "session",
      })
    );

  return (
    <Button variant="danger" onClick={toggleForm}>
      End session
    </Button>
  );
}
