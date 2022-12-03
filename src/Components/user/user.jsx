import axios from "axios";
import React, { useEffect } from "react";

function User() {
  const [dataView, setDataView] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);

  const [name, setName] = React.useState("")
  const [apellido, setApellido] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")

  React.useEffect(() => {
    
    obtenerDatos();
    // console.log("array");

  },[]);

  const obtenerDatos = async () => {
    try {

      const config = {
        url: "http://localhost:8080/api/app/user",
        method: 'get',
        baseURL: 'https://localhost:8080/api/',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        }
      };
      const dt = axios.request(config)
        .then((res) => {
          // console.log("ress");
          console.log(res.data.data);
          let resss = res.data.data;
          const array = resss.map((item) => ({
            ...item,
          }));
          console.log(array);
          setDataView(array)
        })
      //  const data = await res.json();
      console.log(dt);
    } catch (error) {
      console.log(error);
    }
  };

  const editar = async (e) => {
    e.preventDefault();

  }
  
  const limpiar = ()=>{
    setModoEdicion("")
    setName("")
    setApellido("")
    setEmail("")
    setPass("")
  }

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {

      const config = {
        url: "http://localhost:8080/api/app/user",
        method: 'post',
        baseURL: 'https://localhost:8080/api/',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        },
        data: {
          "nombre": name,
          "apellido": apellido,
          "email": email,
          "pass": pass
        }
      };
      const dt = axios.request(config)
        .then((res) => {
          // console.log("ress");
          // console.log(res);
          obtenerDatos()
          limpiar()
        })
      //  const data = await res.json();
      console.log(dt);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>User</div>
      <form onSubmit={modoEdicion ? editar : guardarDatos}>
        <div className="card card-body">
          <div className="mb-3">
            Ingrese nombre
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="" className="form-label">Nombre Usuario</label>
                <input type="text" className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label htmlFor="" className="form-label">Apellido Usuario</label>
                <input type="text" className="form-control"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Email Usuario</label>
                  <input type="email" className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Password Usuario</label>
                  <input type="Password" className="form-control"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary">Enviar</button>
              </div>
            </div>

          </div>
        </div>
      </form>

      <div className="row mt-4 p-4">
      <table className="table table-bordered">  
            <tr>  
                <th>ID</th>  
                <th>Name</th>  
                <th>Apellido</th>  
                <th>Email</th>  
            </tr>  
    
            {dataView.map((dat, index) => (  
              <tr data-index={index}>  
                <td>{index+1}</td>  
                <td>{dat.Nombre}</td>  
                <td>{dat.Apellido}</td>  
                <td>{dat.Email}</td>  
              </tr>  
            ))}  
    
        </table>  
     
      </div>
    </div>
  );
}

export default User;
