import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PatientContext = createContext({
    addTobeDeletedPatientItem: () => { },
    isDeletePatientModalShow: false,
    toBeDeletedPatientItem: null,
    closeDeleteModal: () => { },
    deletePatientItem: () => { },
    patientList: [],
    addPatientItem: () => {}
})

export const PatientContextProvider = ({ children }) => {

    const [isDeletePatientModalShow, setDeleteModalToggle] = useState(false);
    const [toBeDeletedPatientItem, setTobeDeletedPatientItem] = useState(null);
    const [patientList, setPatientList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}patients`)
            .then((response) => {

                return response.json();
            })
            .then((patienList) => {
                console.log(patienList);
                setPatientList(patienList);
            })
    }, [isDeletePatientModalShow]);

    const addTobeDeletedPatientItem = (patient) => {
        console.log('hi');
        setTobeDeletedPatientItem(patient);
        setDeleteModalToggle(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalToggle(false);
    }

    const deletePatientItem = () => {
        if (toBeDeletedPatientItem) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}patients/${toBeDeletedPatientItem.id}`, { method: "DELETE" })
                .then((response) => {
                    console.log(response);
                    setDeleteModalToggle(false);
                })
            patientList.filter((patient) => { return patient.id !== toBeDeletedPatientItem.id; });
        } else {
            window.alert("You have already deleted the patient details!");
        }
    };

    const addPatientItem = (patientFormFields) => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientFormFields)
        }).then(function(response) {
            if(response.status === 200){
                navigate('/');
            }else{

            }
        });
    }

    const value = {
        addTobeDeletedPatientItem,
        isDeletePatientModalShow,
        toBeDeletedPatientItem,
        closeDeleteModal,
        deletePatientItem,
        patientList,
        addPatientItem
    };
    return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
}