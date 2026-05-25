import React from 'react'

export default function EmployeeTable({ employees }) {
  if (!employees.length) {
    return <div>No employees available.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Job Title</th>
          <th>Country</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.full_name}</td>
            <td>{employee.job_title}</td>
            <td>{employee.country}</td>
            <td>${employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
