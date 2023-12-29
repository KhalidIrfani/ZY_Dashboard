import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Students from './pages/Students';

function App() {

  return (
    <>

        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Students />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
