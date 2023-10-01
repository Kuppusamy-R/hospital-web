
import { ThemeProvider } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import PageNotFound from './components/page-not-found/page-not-found.component';
import { PatientContextProvider } from './contexts/patient.context';

import './App.scss';
import AddPatient from './components/add-patient/add-patient.component';
import SimpleAlert from './components/alert/alert.component';
 
const App = () => {
  console.log(`Base API URL: ${process.env.REACT_APP_API_BASE_URL}`);
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <PatientContextProvider> 
        <SimpleAlert/>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />}/>
              <Route path="addPatient" title="+ Add Patient" element={<AddPatient />} />
        </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </PatientContextProvider>
    </ThemeProvider>
  );
}

export default App;
