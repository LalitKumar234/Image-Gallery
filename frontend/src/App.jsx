import './App.css';
import FileUploadForm from './components/FileUploadForm';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ImagePopup from './components/ImagePopup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/upload' element={<FileUploadForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
