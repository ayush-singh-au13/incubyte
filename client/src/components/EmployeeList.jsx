import React from 'react'
import GetEmployee from './GetEmployee'
import EmployeeTable from './EmployeeTable'

export default function EmployeeList({ employees, onFetchEmployee, selectedEmployee, fetchError }) {
  return (
    <div>
      <GetEmployee onFetch={onFetchEmployee} employee={selectedEmployee} error={fetchError} />
      <div style={{ marginTop: 24 }}>
        <EmployeeTable employees={employees} />
      </div>
    </div>
  )
}
