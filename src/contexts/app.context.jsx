import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultToastConfig from "../models/toast.model";



export const AppContext = createContext({
    addTobeDeletedPatientItem: () => { },
    isDeletePatientModalShow: false,
    toBeDeletedPatientItem: null,
    closeDeleteModal: () => { },
    deletePatientItem: () => { },
    patientList: [],
    addPatientItem: () => { },
    toastConfig: defaultToastConfig,
    setToast: () => { },
});

export const AppContextProvider = ({ children }) => {

    const [isDeletePatientModalShow, setDeleteModalToggle] = useState(false);
    const [toBeDeletedPatientItem, setTobeDeletedPatientItem] = useState(null);
    const [patientList, setPatientList] = useState([]);
    const [toastConfig, toggleToast] = useState(defaultToastConfig);

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
            .catch((error) => {
                toggleToast({ ...defaultToastConfig, show: true, variant: "Danger", header: "Alert", body: "Someting went wrong!"});
            });
    }, [isDeletePatientModalShow]);

    const setToast = (toastConfig) => {
        toggleToast(toastConfig);
    };

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
        try {
            fetch(`${process.env.REACT_APP_API_BASE_URL}patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientFormFields)
            }).then(function (response) {
                if (response.status === 200) {
                    navigate('/');
                } else {

                }
            }).catch((error) => { console.log(error); });
        } catch (error) {
            console.log(error);
        }

    }

    const value = {
        addTobeDeletedPatientItem,
        isDeletePatientModalShow,
        toBeDeletedPatientItem,
        closeDeleteModal,
        deletePatientItem,
        patientList,
        addPatientItem,
        toastConfig,
        setToast,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}