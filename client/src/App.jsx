import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from './config'
import AddEmployee from './components/AddEmployee'
import EmployeeList from './components/EmployeeList'
import Insights from './components/Insights'

export default function App(){
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

  return (
    <div className="app">
      <h1>Salary Manager</h1>

      <div className="panel">
        <h2>Add Employee</h2>
        <AddEmployee onCreate={create} />
      </div>

      <div className="panel">
        <h2>Employee List</h2>
        <EmployeeList
          employees={emps}
          onFetchEmployee={fetchEmployeeById}
          selectedEmployee={selectedEmployee}
          fetchError={fetchError}
        />
      </div>

      <div className="panel">
        <h2>Insights</h2>
        <Insights
          country={country}
          onCountryChange={setCountry}
          onGetInsights={getInsights}
          insights={insights}
        />
      </div>
    </div>
  )
}
