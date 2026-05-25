import React, { useState } from 'react'

export default function AddEmployee({ onCreate }) {
  const [form, setForm] = useState({ full_name: '', job_title: '', country: '', salary: '' })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onCreate(form)
        setForm({ full_name: '', job_title: '', country: '', salary: '' })
      }}
    >
      <input
        placeholder="Full name"
        value={form.full_name}
        onChange={e => setForm({ ...form, full_name: e.target.value })}
        required
      />
      <input
        placeholder="Job title"
        value={form.job_title}
        onChange={e => setForm({ ...form, job_title: e.target.value })}
        required
      />
      <input
        placeholder="Country"
        value={form.country}
        onChange={e => setForm({ ...form, country: e.target.value })}
        required
      />
      <input
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={e => setForm({ ...form, salary: e.target.value })}
        required
      />
      <button type="submit">Add</button>
    </form>
  )
}
