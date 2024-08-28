import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom';
import { toggleNotice } from '@/lib/redux/slice/notice';
import { useSelector } from '@/lib/redux/hooks';

export default function FinalizeBtn() {
  const {session} = useSelector(state => state.session)
  const [url] = useSearchParams()
  const dispatch = useDispatch();

  const toggleForm = () => dispatch(
    toggleNotice({
      show: true,
      message: `You can't receive new applications for the current session if you continue. This means you're preparing the applications for a TSC meeting. Do you want to continue this action?`,
      url: `/finalize-session/${session?.id}`,
      mutation: `/application?status=${url.get('status')}`,
      method: "patch"
    })
  )

  return (
    <Button variant="success" onClick={toggleForm}>Prep session</Button>
  )
}
