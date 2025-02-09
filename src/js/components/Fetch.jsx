import React, {useState, useEffect}  from 'react'

const Fetch = () => {
    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState([]);
  
  
    const apiUrl = 'https://playground.4geeks.com/todo';
    const username = 'DiegoV';
  
  
  
  
  
    const createUser = () => {
      fetch(`${apiUrl}/users/${username}`, {
        
        method: "POST"
  
      })
        .then(resp => {
          console.log(resp.ok);
          console.log(resp.status); 
          console.log(resp.text()); 
          return resp.json(); 
        })
        .then(data => {
          
          console.log(data); 
        })
        .catch(error => {
        
          console.log(error);
        });
    }
  
    const getList = () => {
      fetch(`${apiUrl}/users/${username}`)
        
        .then(resp => {
          console.log(resp.ok); 
          console.log(resp.status); 
          if (resp.status == 404) {
            createUser() 
          }
          if (resp.ok) {
            return resp.json(); 
  
          }
        })
        .then(data => {
  
          
          console.log(data);  
          if (data) {
            setList(data.todos) 
          }
        })
        .catch(error => {
        
          console.log(error);
        });
    }
    const addTask = () => {
      fetch(`${apiUrl}/todos/${username}`, {
       
        method: "POST",
        body: JSON.stringify({ label: inputValue, is_done: false }),
        headers: {
          "Content-Type": "application/json"
        }
  
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json(); 
  
          }
        })
        .then(data => {
          if (data) {
            setList(list.concat(data))  
            setInputValue('')
          }
        })
        .catch(error => {
          
          console.log(error);
        });
  
    }
    const eliminarTarea = (todo_id) => {
      fetch(`${apiUrl}/todos/${todo_id}`, {  
        method: 'DELETE',
      })
        .then(resp => {
          if(resp.ok){ 
            return resp
          }
        })
        .then( data => { 
          if(data){ 
            setList(list.filter(item=> item.id != todo_id))
          }
        })
        .catch(error => console.log(error));
    }; 
    const eliminarUsuario = () => {
      fetch(`${apiUrl}/users/${username}`, { 
        method: 'DELETE',
      })
        .then(resp => {
          if(resp.ok){ 
            return resp
          }
        })
        .then( data => { 
          if(data){ 
            setList([]) 
            createUser()
          }
        })
        .catch(error => console.log(error));
    }; 
  
  

  
  
  
    const items = () => {
      if (inputValue != '') {
        addTask();
        setInputValue('');
        return
      }
      alert('El espacio no puede estar vacio');
  
    }
  
  
    const Apretar = (event) => {
      if (event.keyCode === 13) {
        items();
      }
    }
  
  
  
    useEffect(() => {
      getList()
    }, [])
    return (
    <div> <div className='Cuerpo'>


    <div>
      <h1>To-Do-With-Fetch</h1>
      <input className='cuadro' value={inputValue} type='text' onKeyDown={Apretar} placeholder='No hay texto! añadir texto' onChange={(e) => setInputValue(e.target.value)} />

      <div className='Lista'>

        <ul>
          {
            list.map((item, index) => {
              return <li className=' li-none list-group-items justify-content-between d-flex' key={index}>{item.label}
                <span className='btn btn-danger' onClick={()=> eliminarTarea(item.id)} >X</span> 
              </li>
            })


          } 
          <button  className='btn btn-danger' onClick={eliminarUsuario} >ELiminar lista Completa</button>

        </ul>

      </div>
    </div>





  </div></div>
  )
}

export default Fetch