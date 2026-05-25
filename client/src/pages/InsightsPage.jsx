import React from 'react'
import Insights from '../components/Insights'

export default function InsightsPage({ country, onCountryChange, onGetInsights, insights }) {
  return (
    <div>
      <h2>Insights</h2>
      <Insights
        country={country}
        onCountryChange={onCountryChange}
        onGetInsights={onGetInsights}
        insights={insights}
      />
    </div>
  )
}
