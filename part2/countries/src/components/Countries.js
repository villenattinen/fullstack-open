import Weather from './Weather'

const Countries = (props) => {
  
    const countriesToShow = props.countries.filter(
      country => country.name.common.toLocaleLowerCase().includes(
        props.filter.toLocaleLowerCase()
      )
    )
  
    if (countriesToShow.length >= 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } 
    else if (countriesToShow.length === 1) {
      return (
        <div>      
          {countriesToShow.map(country =>
            <Country 
                key={country.name.official} 
                name={country.name.common} 
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flags={country.flags}
            />
          )}     
        </div> 
      )
    }
    return (
      <div>
        {countriesToShow.map(country =>
          <CountryPreview
            key={country.name.common} 
            name={country.name.common}
            handleClick={() => props.setFilter(country.name.common)}
          />
        )}
      </div>
    )
  }
  
  const Country = (props) => 
    <div>
      <h1>{props.name}</h1>
      <div>
        capital {props.capital}
      </div>
      <div>
        area {props.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {Object.values(props.languages).map(language =>
          <li key={language}>
            {language}
          </li>
        )}
      </ul>
      <img src={Object.values(props.flags)[0]} alt='' />
      <Weather city={props.capital} />
    </div>
  
  const CountryPreview = (props) => 
    <div>
      {props.name}
      <button onClick={props.handleClick}>show</button>
    </div>

export default Countries
