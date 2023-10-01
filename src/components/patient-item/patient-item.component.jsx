import { Button } from "react-bootstrap";
import { useContext } from "react";
import { PatientContext } from "../../contexts/patient.context";

const PatientItem = ({ patient }) => {

  const {addTobeDeletedPatientItem} = useContext(PatientContext);

  const deletePatientItemHandler = () => addTobeDeletedPatientItem(patient);

  const { id, name, gender, dob, phoneNumber, fullAddress } = patient;
  return (
    <tr key={id}>
      <td>{ `${name} ${id}` }</td>
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