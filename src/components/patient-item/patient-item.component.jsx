import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";

const PatientItem = ({ patient }) => {

  const {addTobeDeletedPatientItem} = useContext(AppContext);

  const deletePatientItemHandler = () => addTobeDeletedPatientItem(patient);

  const { id, name, gender, dob, phoneNumber, fullAddress } = patient;
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{dob}</td>
      <td>{phoneNumber}</td>
      <td>{fullAddress}</td>
      <td>
        <Button type="submit" variant="danger" onClick={deletePatientItemHandler}>Delete</Button>
      </td>
    </tr>
  );
}

export default PatientItem;