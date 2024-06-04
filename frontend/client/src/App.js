import './App.css';
import {Routes, Route} from "react-router-dom";
import NotesList from "../src/views/notes/NotesList"
import CreateNote from './views/notes/CreateNote';
import Home from "../src/views/home/Home"
import ArchivedList from "../src/views/archived/ArchivedList"
import ActiveList from "../src/views/active/ActiveList"

function App() {
  return (
    <div className="App bg-custom-bg bg-contain bg-center h-screen">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/notes' element={<NotesList />}/>
        <Route path='/notes/create' element={<CreateNote />}/>
        <Route path='/archived' element={<ArchivedList />} />
        <Route path='/active' element={<ActiveList />} />
      </Routes>
    </div>
  );
}

export default App;
