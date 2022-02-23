import React, { useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'


export const Home = () => {
  const [enrollment, setEnrollment] = useState('')
  const [car, setCar] = useState([])
  const apiUrl = 'http://localhost:8000/cars?enrollment='

  const handleChange = (e) => {
    e.preventDefault()

    setEnrollment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (enrollment.length <= 9) {
      if (enrollment.length !== 0) {
        axios
          .get(`${apiUrl}${enrollment}`)
          .then((res) => {
            if (res.data.data.length !== 0) {
              setCar(res.data.data)
            } else {
              Swal.fire(
                'Error',
                'Esta matricula no se encuentra en el sistema.',
                'error'
              )
              setCar([])
            }
          })
          .catch((error) => setCar([]))
      } else {
        Swal.fire('Error', 'No Ingreso Datos', 'error')
        setCar([])
      }
    } else {
      Swal.fire('Error', 'Formato de matricula: xxx xxx / xx xxx xx', 'error')
      setCar([])
    }
  }

  return (
    <div className='container'>
      <div className='row vh-100 justify-content-center align-items-center'>
        <div className='col-auto bg-light border border-dark p-5'>
          <form onSubmit={handleSubmit} method='get'>
            <div className='input-group p-3 mb-2 bg-white border border-dark'>
              <input
                type='text'
                className='form-control mb-3 border border-dark'
                placeholder='Ingresar Matricula'
                onChange={handleChange}
              />
              <button type='submit' className='btn btn-success w-100'>
                Buscar
              </button>
            </div>
            {car.map((car) => (
              <div className='card border-dark' key={car.id}>
                <div className='card-header'>Datos Del Vehiculo</div>
                <ul>
                  <li>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        Vehiculo: {car.attributes.brand} {car.attributes.name}
                      </h5>
                      <p className='card-text'>
                        Modelo: {car.attributes.model}
                      </p>
                      <p className='card-text'>
                        Matricula: {car.attributes.enrollment}
                      </p>
                      <p className='card-text'>
                        Titular: {car.attributes.owner}
                      </p>
                      <p className='card-text'>Color: {car.attributes.color}</p>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  )
}
