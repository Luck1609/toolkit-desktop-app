import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { toggleFormModal } from '@/lib/redux/slice/notice';

export default function StartSessionBtn() {
  const dispatch = useDispatch();

  const toggleForm = () => dispatch(toggleFormModal({
    show: true,
    title: "Start new permit session",
    url: "/quarter",
    content: "session",
    value: {
      name: "",
      start_date: "",
      end_date: ""
    }
  }))

  return (
    <Button variant="success" onClick={toggleForm}>Start session</Button>
  )
}
