import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const getLocalItem = () => {
  const todos = localStorage.getItem("Todos");
  if (todos) {
    return JSON.parse(localStorage.getItem("Todos"));
  } else {
    return [];
  }
};

function TodoForm() {
  const [todoinput, setTodoInput] = React.useState("");
  const [items, setItems] = React.useState(getLocalItem());
  const [togglesubmit, setToggleSubmit] = React.useState(true);
  const [isEditItem, setIsEditItem] = React.useState(null);
  function handleChange(e) {
    setTodoInput(e.target.value);
  }

  function addItem(e) {
    e.preventDefault();
    if (!todoinput) {
      alert("Please fill data");
    } else if (todoinput && !togglesubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: todoinput };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setTodoInput("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: todoinput,
      };
      setItems([...items, allInputData]);
      setTodoInput("");
    }
  }

  function deleteItem(id) {
    const updateditems = items.filter((elem) => {
      return id !== elem.id;
    });
    setItems(updateditems);
  }

  function removeall() {
    setItems([]);
  }

  React.useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(items));
  }, [items]);

  function editItem(id) {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setTodoInput(newEditItem.name);
    setIsEditItem(id);
  }

  return (
    <div className="todoform">
      <div className="header">
        <h1>What's Your Plan Today</h1>
      </div>
      <form className="forminput" onSubmit={addItem}>
        <input
          type="text"
          name="todoinput"
          placeholder="Add a Todo"
          value={todoinput}
          onChange={handleChange}
          autoComplete="off"
        />
        {togglesubmit ? (
          <button className="btn">Submit</button>
        ) : (
          <button className="btn">Edit</button>
        )}
      </form>

      <div className="showitems">
        {items.map((elem) => {
          return (
            <div className="todos" key={elem.id}>
              <div className="todo">
                <span>{elem.name}</span>
              </div>
              <div className="icons">
                <RiCloseCircleLine
                  onClick={() => deleteItem(elem.id)}
                  title="Delete Item"
                />
                <TiEdit
                  onClick={() => editItem(elem.id)}
                  title="Edit Item"
                  className="editicon"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className=" btn clear-all " onClick={removeall}>
        <span> Clear All</span>
      </div>
    </div>
  );
}

export default TodoForm;
