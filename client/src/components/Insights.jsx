import React from 'react'

export default function Insights({ country, onCountryChange, onGetInsights, insights }) {
  return (
    <div>
      <label>
        Country: <input value={country} onChange={e => onCountryChange(e.target.value)} />
      </label>
      <button onClick={onGetInsights}>Get</button>

      {insights && (
        <div style={{ marginTop: 12 }}>
          <div>Min: {insights.min}</div>
          <div>Max: {insights.max}</div>
          <div>Avg: {insights.avg}</div>
          <div>Count: {insights.count}</div>
        </div>
      )}
    </div>
  )
}
