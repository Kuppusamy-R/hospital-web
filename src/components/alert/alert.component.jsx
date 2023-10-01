import Alert from 'react-bootstrap/Alert';

import './alert.component.style.scss';

const SimpleAlert = ({variant}) => {

  return (
    <>
    <Alert className='custom-alert' key={variant} variant={variant}>
        This is an alert—check it out!
    </Alert>
    </>
  );
}

export default SimpleAlert;