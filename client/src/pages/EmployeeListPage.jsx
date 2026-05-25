import React from 'react'
import EmployeeList from '../components/EmployeeList'

export default function EmployeeListPage({ employees, onFetchEmployee, selectedEmployee, fetchError }) {
  return (
    <div>
      <h2>All Employees</h2>
      <EmployeeList
        employees={employees}
        onFetchEmployee={onFetchEmployee}
        selectedEmployee={selectedEmployee}
        fetchError={fetchError}
      />
    </div>
  )
}
