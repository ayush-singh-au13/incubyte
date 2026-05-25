import React from 'react'
import EmployeeTable from '../components/EmployeeTable'

export default function EmployeeListPage({ employees, listPage, onPreviousPage, onNextPage, canPrevious, canNext }) {
  return (
    <div>
      <h2>All Employees</h2>
      <EmployeeTable employees={employees} />
      <div className="pagination">
        <button type="button" onClick={onPreviousPage} disabled={!canPrevious}>
          Previous
        </button>
        <span className="pagination-info">Page {listPage}</span>
        <button type="button" onClick={onNextPage} disabled={!canNext}>
          Next
        </button>
      </div>
    </div>
  )
}
