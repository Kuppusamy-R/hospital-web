
import { useContext } from "react";
import { Container, Stack, Row, Col, Table, Button, Placeholder } from "react-bootstrap";
import SimpleModal from "../../components/modal/simple-modal.component";
import PatientItem from "../../components/patient-item/patient-item.component";
import { AppContext } from "../../contexts/app.context";
import { Link } from "react-router-dom";
import "./home.style.scss";


const Home = () => {

  const { isDeletePatientModalShow, closeDeleteModal, deletePatientItem, patientList } = useContext(AppContext);
  const handleClose = () => closeDeleteModal();

  // const showdeleteModal = (event) => {
  //   event.preventDefault();
  //   setShowModal({ isShow: true, id: event.target.id.value });
  // };

  const modalConfig = {
    showModal: isDeletePatientModalShow,
    handleClose: handleClose,
    title: "Delete Patient Profile",
    bodyName: "Are you sure want this patient profile?",
    footerConfig: [
      {
        id: 1,
        variant: "secondary",
        clickHandler: handleClose,
        buttonName: "Cancel"
      },
      {
        id: 2,
        variant: "danger",
        clickHandler: deletePatientItem,
        buttonName: "Delete"
      }
    ]
  };

  return (
    <Container>
      <Stack gap={3}>
        <Row>
          <Col md="10"></Col>
          <Col md="2">
            <Link to="/addPatient"><Button>+ Add Patient</Button></Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Phone Number</th>
                  <th>Full Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  patientList.length === 0 ?
                    (
                      <>
                        <tr>
                          <td colSpan={6}>
                            <Placeholder as="p" animation="glow">
                              <Placeholder className="place-holder-custom" />
                            </Placeholder>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6}>
                            <Placeholder as="p" animation="glow">
                              <Placeholder className="place-holder-custom" />
                            </Placeholder>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6}>
                            <Placeholder as="p" animation="glow">
                              <Placeholder className="place-holder-custom" />
                            </Placeholder>
                          </td>
                        </tr>
                      </>)
                    :
                    patientList.map((patient) => {
                      return (<PatientItem key={patient.id} patient={patient} />);
                    })
                }
              </tbody>
            </Table>
          </Col>
          <SimpleModal modalConfig={modalConfig} />
        </Row>
      </Stack>
    </Container>
  );
}

export default Home;