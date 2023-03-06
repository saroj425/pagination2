
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todo,setTodos] = useState([]);
  const [todoesperpage,setTdoesperpage] = useState(10);
  const [currentpage,setCurrentpage] = useState();

  let noofPerpage = Math.ceil(todo.length/todoesperpage);
  const pages = [...Array(noofPerpage + 1).keys()].slice(1);

  const indexOflasttodo = noofPerpage * todoesperpage;
  const indexOfFirsttodo = indexOflasttodo - noofPerpage;
  const visibletodoes = todo.slice(indexOfFirsttodo,indexOflasttodo);

  console.log("Total Page divided by 10",noofPerpage);
  console.log("All Pages in array",pages);

  const getTodoapi = async()=>{
    let result = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
    console.log("Result data==",result.data);
    setTodos(result.data);
  }

  useEffect(() => {
    getTodoapi();
  }, []);
  return (
    <div className="App">
      <div>
        <p>Pagination</p>
        {
          visibletodoes && visibletodoes.map((todoes)=>(
            <p key={todoes.id}>{todoes.title}</p>
          ))
        }
        <span>Previous</span>
        <p><strong>{pages.map((page)=><span key={page} onClick={()=>setCurrentpage(pages)}>{`${page} |`}</span>)}</strong></p>
        <span>Next</span>
      </div>
    </div>
  );
}

export default App;
