import axios from "axios";
import React, { useEffect } from "react";

function Ticket() {
   const [dataView, setDataView] = React.useState([]);
   const [modoEdicion, setModoEdicion] = React.useState(false);

   const [num_ticket, setNum_ticket] = React.useState("")
   const [trabajo_group, setTrabajo_group] = React.useState("")
   const [operator_group, setOperator_group] = React.useState("")
   const [detail_user, setDetail_user] = React.useState("")
   const [id, setId] = React.useState(-1)

   React.useEffect(() => {

      obtenerDatos();
      // console.log("array");

   }, []);

   const obtenerDatos = async () => {
      try {

         const config = {
            url: "http://localhost:8080/api/app/ticket",
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
      try {

         const config = {
            url: "http://localhost:8080/api/app/ticket/update",
            method: 'post',
            baseURL: 'https://localhost:8080/api/',
            headers: {
               'Content-Type': 'application/json',
               'X-Requested-With': 'XMLHttpRequest',
               'Access-Control-Allow-Origin': '*'
            },
            data: {
               "num_ticket": num_ticket,
               "trabajo_group": trabajo_group,
               "operator_group": operator_group,
               "detail_user": detail_user,
               "id": id
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

   const openEdit = async (item) => {
      console.log(item);
      try {
         setId(item.id)
         setModoEdicion(true)
         setNum_ticket(item.trabajo_group)
         setTrabajo_group(item.operator_group)
         setOperator_group(item.detail_user)
         setDetail_user(item.detail_user)
      } catch (error) {

      }
   }

   const limpiar = () => {
      setModoEdicion("")
      setNum_ticket("")
      setTrabajo_group("")
      setOperator_group("")
      setDetail_user("")
      setId(-1)
      setModoEdicion(false)
   }

   const guardarDatos = async (e) => {
      e.preventDefault();
      try {

         const config = {
            url: "http://localhost:8080/api/app/ticket",
            method: 'post',
            baseURL: 'https://localhost:8080/api/',
            headers: {
               'Content-Type': 'application/json',
               'X-Requested-With': 'XMLHttpRequest',
               'Access-Control-Allow-Origin': '*'
            },
            data: {
               "num_ticket": num_ticket,
               "trabajo_group": trabajo_group,
               "operator_group": operator_group,
               "detail_user": detail_user
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
                        <label htmlFor="" className="form-label">Numero de Ticket</label>
                        <input type="text" className="form-control"
                           value={num_ticket}
                           onChange={(e) => setNum_ticket(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className="col">
                     <div className="mb-3">
                        <label htmlFor="" className="form-label">Grupo de trabajo</label>
                        <input type="text" className="form-control"
                           value={trabajo_group}
                           onChange={(e) => setTrabajo_group(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className="row">
                     <div className="col">
                        <div className="mb-3">
                           <label htmlFor="" className="form-label">Detalle Usuario</label>
                           <input type="text" className="form-control"
                              value={detail_user}
                              onChange={(e) => setDetail_user(e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="col">
                        <div className="mb-3">
                           <label htmlFor="" className="form-label">Grupo Operador</label>
                           <input type="text" className="form-control"
                              value={operator_group}
                              onChange={(e) => setOperator_group(e.target.value)}
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
                  <th>Numero Ticket</th>
                  <th>Grupo de trabajo</th>
                  <th>Grupo Operador</th>
                  <th>Detalle</th>
                  <th>Action</th>
               </tr>

               {dataView.map((dat, index) => (
                  <tr data-index={index}>
                     <td>{index + 1}</td>
                     <td>{dat.num_ticket}</td>
                     <td>{dat.trabajo_group}</td>
                     <td>{dat.operator_group}</td>
                     <td>{dat.detail_user}</td>
                     <td><button className="btn btn-warning"
                        onClick={() => openEdit(dat)}
                     >Edit</button></td>
                  </tr>
               ))}

            </table>

         </div>
      </div>
   );
}
export default Ticket;
