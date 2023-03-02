import { Routes, Route } from 'react-router-dom';
import { Input, Pending, Result } from './pages'
import { ButtonAppBar } from './components';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ButtonAppBar />}>
          <Route path='/' element={<Input />}></Route>
          <Route path='/pending' element={<Pending />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
