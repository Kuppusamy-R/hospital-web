import { useContext, useState } from "react";
import { Container, FloatingLabel, Form, Row, Col, Button, Stack, InputGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/app.context";
import * as formik from 'formik';
import * as yup from 'yup';

const defaultPatientFormFields = {
    name: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    fullAddress: ''
};

const AddPatient = () => {

    const { Formik } = formik;

    const schema = yup.object().shape({
        name: yup.string().required(),
        gender: yup.string().required(),
        dob: yup.string().required(),
        phoneNumber: yup.string().required(),
        fullAddress: yup.string().required()
    });

    const [addPatientPhoneNumber, setaddPatientPhoneNumber] = useState('');
    const { addPatientItem } = useContext(AppContext);

    const handleFormSubmit = async (values) => {
        addPatientItem({ ...defaultPatientFormFields,
        name: values.name,
        gender: values.gender,
        dob: values.dob,
        phoneNumber: values.phoneNumber,
        fullAddress: values.fullAddress});
    }

    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'patient name is required!';
        } else if (values.name.length < 3) {
            errors.name = 'atleast 3 characters required!';
        }

        if(!values.phoneNumber){
            errors.phoneNumber = 'phone Number is required!';
        }else if(values.phoneNumber.toString().length < 10){
            errors.phoneNumber = `10 digit phone number required (given ${values.phoneNumber.toString().length} digit)`;
        }

        if(!values.dob){
            errors.dob = 'dob is required!';
        }

        if(!values.gender){
            errors.gender = 'gender is required!'
        }

        if(!values.fullAddress){
            errors.fullAddress = 'patient address is required!'
        }

        return errors;
    }

    const keepOnlyNumber = (event) => {
        setaddPatientPhoneNumber(event.target.value.replace(/[^0-9]/gi, ''));
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
                    <Formik
                        validationSchema={schema}
                        onSubmit = {handleFormSubmit}
                        initialValues={{
                            name: '',
                            gender: '',
                            dob: '',
                            phoneNumber: addPatientPhoneNumber,
                            fullAddress: ''
                        }}
                        validate={validateForm}
                        enableReinitialze = {true}>

                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
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
                                                        <Form.Control
                                                            name="name"
                                                            type="text"
                                                            placeholder="Enter Patient Name"
                                                            autoComplete="new-password"
                                                            value={values.name || ''}
                                                            onChange={handleChange}
                                                            isValid={touched.name && !errors.name}
                                                            isInvalid={touched.name && !!errors.name}
                                                        />
                                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FloatingLabel
                                                        label="Gender">
                                                        <Form.Select
                                                            name="gender" aria-label="Select Gender" autoComplete="new-password"
                                                            value={values.gender || ''}
                                                            onChange={handleChange}
                                                            isValid={touched.gender && !errors.gender}
                                                            isInvalid={touched.gender && !!errors.gender}
                                                        >
                                                            <option>Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Transgender">Transgender</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col>
                                                    <FloatingLabel
                                                        label="DOB">
                                                        <Form.Control
                                                            name="dob"
                                                            type="date"
                                                            placeholder="Select DOB"
                                                            autoComplete="new-password"
                                                            max={new Date().toISOString().split("T")[0]}
                                                            value={values.dob}
                                                            onChange={handleChange}
                                                            isValid={touched.dob && !errors.dob}
                                                            isInvalid={touched.dob && !!errors.dob} />
                                                        <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroup.Text>+91</InputGroup.Text>
                                                        <FloatingLabel label="Phone Number">
                                                            <Form.Control
                                                                name="phoneNumber"
                                                                type="text"
                                                                placeholder="Phone Number"
                                                                minLength={10} maxLength={10}
                                                                autoComplete="new-password"
                                                                value={addPatientPhoneNumber || ''}
                                                                onChange={e => {handleChange(e); keepOnlyNumber(e)}}
                                                                isValid={touched.phoneNumber && !errors.phoneNumber}
                                                                isInvalid={touched.phoneNumber && !!errors.phoneNumber} 
                                                                pattern="[0-9]{10}"/>
                                                            <Form.Control.Feedback type="invalid" tooltip>{errors.phoneNumber}</Form.Control.Feedback>
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FloatingLabel
                                                        label="Patient Address"
                                                    >
                                                        <Form.Control
                                                            name="fullAddress"
                                                            as="textarea"
                                                            placeholder="Enter Patient Address"
                                                            autoComplete="new-password"
                                                            value={values.fullAddress || ''}
                                                            onChange={handleChange}
                                                            isValid={touched.fullAddress && !errors.fullAddress}
                                                            isInvalid={touched.fullAddress && !!errors.fullAddress}  />
                                                            <Form.Control.Feedback type="invalid">{errors.fullAddress}</Form.Control.Feedback>
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>

                                            <Button type="submit" variant="primary">Save</Button>
                                        </Stack>
                                    </Card.Body>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Row>
            </Stack>
        </Container>
    )
};

export default AddPatient;