import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';

export default function NewAppBtn() {

  return (
    <Link to="">
      <Button variant="primary">
        New application
      </Button>
    </Link>
  );
}
