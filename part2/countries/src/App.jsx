import { useEffect, useState } from 'react'
import CountryData from './components/CountryData'
import axios from 'axios'


const COUNTRIES_API_URI = 'https://studies.cs.helsinki.fi/restcountries/api/all'

function App() {
const [ countries, setCountries ] = useState(null)
const [ searchValue, setSearchValue ] = useState('')

useEffect(() => {
  axios
  .get(COUNTRIES_API_URI)
  .then(response => setCountries(response.data))
  .catch(error => console.log('Imposible to fetch data from server, error:', error.message))
}, [])


const handleChange = (e) => {
  setSearchValue(e.target.value)
}

const countriesToShow = searchValue
? countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
: null

  return (
    <>
    <div>
      find countries: <input onChange={handleChange} value={searchValue} type="text" />
    </div>
    <div>
      {
        countriesToShow?.length > 10
        ? <div>Too many matches, especify another filter</div>
        : countriesToShow?.length > 1 
          ? countriesToShow?.map(country => <div key={country.name.common}>{country.name.common}<button onClick={() => setSearchValue(country.name.common)}>show</button></div>)
          : countriesToShow?.map(country => <CountryData key={country.name.common} country={country}/>)
      }
    </div>
    </>
  )
}

export default App