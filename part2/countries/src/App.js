import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'
import './index.css'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filter} onChange={props.handleFilter} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.log('Unable to fetch countries')
      })
    console.log('countries set')
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }  

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />

      <Countries 
        countries={countries} 
        filter={filter} 
        setFilter={setFilter} 
      />
    </div>
  )
}

export default App
