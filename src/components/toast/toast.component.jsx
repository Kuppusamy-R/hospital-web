import './toast.component.style.scss';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app.context';
import defaultAlertConfig from '../../models/toast.model';
import { Toast } from 'react-bootstrap';

const SimpleToast = () => {

  const { setToast, toastConfig } = useContext(AppContext);

  const { variant, show, header, body, autohide, animation, closeButton } = toastConfig;

  return (

    <>
      <Toast className='custom-toast-position' bg={variant.toLowerCase()} show = {show} 
        onClose={() => {setToast(defaultAlertConfig)}} animation={animation} autohide={autohide} >
        <Toast.Header closeButton = {closeButton}>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </>
  );
}

export default SimpleToast;