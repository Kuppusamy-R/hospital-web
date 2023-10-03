
import { ThemeProvider } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import PageNotFound from './components/page-not-found/page-not-found.component';

import './App.scss';
import AddPatient from './components/add-patient/add-patient.component';
import { useContext } from 'react';
import SimpleToast from './components/toast/toast.component';
import { AppContext } from './contexts/app.context';

const App = () => {
  console.log(`Base API URL: ${process.env.REACT_APP_API_BASE_URL}`);

  const {toastConfig} = useContext(AppContext);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
        {toastConfig.show === true && <SimpleToast toastConfig = {toastConfig} />}
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />}/>
              <Route path="addPatient" title="+ Add Patient" element={<AddPatient />} />
        </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
