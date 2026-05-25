import React from 'react'
import GetEmployee from '../components/GetEmployee'

export default function GetEmployeePage({ onFetchEmployee, selectedEmployee, fetchError }) {
  return (
    <div>
      <h2>Search Employee</h2>
      <GetEmployee
        onFetch={onFetchEmployee}
        employee={selectedEmployee}
        error={fetchError}
      />
    </div>
  )
}
