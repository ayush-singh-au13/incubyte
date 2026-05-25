import React, { useState } from 'react'

export default function GetEmployee({ onFetch, employee, error }) {
  const [employeeId, setEmployeeId] = useState('')

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          onFetch(employeeId)
        }}
      >
        <input
          placeholder="Employee ID"
          type="number"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      {employee && (
        <div style={{ marginTop: 12 }}>
          <h3>Search Result</h3>
          <div>ID: {employee.id}</div>
          <div>Full Name: {employee.full_name}</div>
          <div>Job Title: {employee.job_title}</div>
          <div>Country: {employee.country}</div>
          <div>Salary: ${employee.salary}</div>
        </div>
      )}
    </div>
  )
}
