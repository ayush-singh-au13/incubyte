import React from 'react'
import AddEmployee from '../components/AddEmployee'

export default function AddEmployeePage({ onCreate }) {
  return (
    <div>
      <h2>Add Employee</h2>
      <AddEmployee onCreate={onCreate} />
    </div>
  )
}
