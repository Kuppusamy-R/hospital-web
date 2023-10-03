import { useContext, useState } from "react";
import { Container, FloatingLabel, Form, Row, Col, Button, Stack, InputGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/app.context";

const defaultPatientFormFields = {
    name: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    fullAddress: ''
};

const AddPatient = () => {
    
    const [patientFormFields, setPatientFormFields] = useState(defaultPatientFormFields);

    const {addPatientItem} = useContext(AppContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientFormFields({ ...patientFormFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(patientFormFields);
        addPatientItem(patientFormFields);
    }

    return (
        <Container>
            <Stack gap={3}>
                <Row>
                    <Col md="2">
                        <Link to="/"><Button>Go Back</Button></Link>
                    </Col>
                    <Col md="10"></Col>
                </Row>
                <Row>
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Header>Add Patient</Card.Header>
                            <Card.Body>
                                <Stack gap={3}>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Patient Name"
                                            >
                                                <Form.Control onChange={handleChange} name="name" type="text" placeholder="Enter Patient Name" autoComplete="new-password"/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                label="Gender">
                                                <Form.Select onChange={handleChange} name="gender" aria-label="Select Gender" autoComplete="new-password">
                                                    <option>Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Transgender">Transgender</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                label="DOB">
                                                <Form.Control onChange={handleChange} name="dob" type="date" placeholder="Select DOB" autoComplete="new-password"/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Text>+91</InputGroup.Text>
                                                <FloatingLabel label="Phone Number">
                                                    <Form.Control onChange={handleChange} name="phoneNumber" type="text" placeholder="Phone Number" minLength ={10} maxLength = {10} autoComplete="new-password"/>
                                                </FloatingLabel>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                label="Patient Address"
                                            >
                                                <Form.Control onChange={handleChange} name="fullAddress" as="textarea" placeholder="Enter Patient Address" autoComplete="new-password"/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <Button type="submit" variant="primary">Save</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </form>
                </Row>
            </Stack>
        </Container>
    )
};

export default AddPatient;