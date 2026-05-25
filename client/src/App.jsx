import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from './config'
import AddEmployeePage from './pages/AddEmployeePage'
import EmployeeListPage from './pages/EmployeeListPage'
import GetEmployeePage from './pages/GetEmployeePage'
import InsightsPage from './pages/InsightsPage'

const pageLabels = {
  employees: 'Employees',
  add: 'Add Employee',
  search: 'Search Employee',
  insights: 'Insights',
}

export default function App(){
  const [currentPage, setCurrentPage] = useState('employees')
  const [emps, setEmps] = useState([])
  const [country, setCountry] = useState('USA')
  const [insights, setInsights] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [fetchError, setFetchError] = useState('')

  async function load(){
    const response = await fetch(`${API_BASE_URL}/employees`)
    setEmps(await response.json())
  }

  useEffect(() => {
    load()
  }, [])

  async function create(employee){
    await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
    load()
    setCurrentPage('employees')
  }

  async function getInsights(){
    const response = await fetch(`${API_BASE_URL}/metrics/country/${encodeURIComponent(country)}`)
    setInsights(await response.json())
  }

  async function fetchEmployeeById(id){
    setSelectedEmployee(null)
    setFetchError('')

    if (!id){
      setFetchError('Please enter an employee ID.')
      return
    }

    const response = await fetch(`${API_BASE_URL}/employees/${encodeURIComponent(id)}`)

    if (!response.ok){
      setFetchError('Employee not found.')
      return
    }

    setSelectedEmployee(await response.json())
  }

  const pages = {
    employees: (
      <EmployeeListPage
        employees={emps}
        onFetchEmployee={fetchEmployeeById}
        selectedEmployee={selectedEmployee}
        fetchError={fetchError}
      />
    ),
    add: <AddEmployeePage onCreate={create} />,
    search: <GetEmployeePage onFetchEmployee={fetchEmployeeById} selectedEmployee={selectedEmployee} fetchError={fetchError} />,
    insights: <InsightsPage country={country} onCountryChange={setCountry} onGetInsights={getInsights} insights={insights} />,
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">Salary Manager</div>
        <nav>
          {Object.entries(pageLabels).map(([pageKey, pageLabel]) => (
            <button
              key={pageKey}
              className={currentPage === pageKey ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentPage(pageKey)}
            >
              {pageLabel}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        {pages[currentPage]}
      </main>
    </div>
  )
}
