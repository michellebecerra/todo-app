import React, { useState, useEffect } from 'react';
// Hooks ^ , componentDidMount
function App() {
  return (
    <div>
      <List />
    </div>
  );
}

const List = (props) => {
  const [ todos, setTodos ] = useState([]);
  const [ text, setText ] = useState([]);

  // Ajax
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3001/todos');
    //console.log(await res.json());
    setTodos(await res.json());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const items = todos.map(todo => <Item todo={todo} key={todo._id} fetchTodos={fetchTodos} />);

  return <div >{items}</div>; 
};

const Item = (props) => {
  const { done, desc, _id } = props.todo;
  return <div>{desc}</div>;
};

export default App;