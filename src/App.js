import './App.css';
import { Routes, Route } from 'react-router'
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Create from './routes/create/create.component';
import Edit from './routes/edit/edit.component';
import Authentication from './routes/authentication/authentication.component'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path='/auth' element={<Authentication />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
