import React, { useEffect } from "react";

function User() {
  useEffect(() => {
    obtenerDatos();
  });

  const obtenerDatos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/app/user", {
        method: 'GET',
        crossorigin: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            },
      })
        .then((result) => {
        //   result.json();
          console.log(result);
        })
        .then((items) =>{
            console.log(items);
        }
        );
      //  const data = await res.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>User</div>
    </div>
  );
}

export default User;
