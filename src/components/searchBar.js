import { useState, useEffect } from "react";
import axios from 'axios';

function SearchBar() {
    const [term, setTerm] = useState('Business')
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] = useState([])
    
    useEffect(() => {
     const timerId = setTimeout(() => {
        setDebouncedTerm(term)
     }, 1000)

     return () => {
        clearTimeout(timerId)
     }
    }, [term])

    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php?', {
              params: {
                  action: 'query',
                  list: 'search',
                  format: 'json',
                  origin: '*',
                  srsearch: debouncedTerm,
              },
            })
            setResults(data.query.search)
           };
           search()
    }, [debouncedTerm])

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    className="ui button"
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <div className="info">
                        <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                    </div>
                </div>
            </div>
        )
    })

   
    return <div>
         <div className="ui segment">
        <div className="ui form">
           <div className="field">
           <label>Search Details</label>
           <input value={term} onChange={(e) => setTerm(e.target.value)}/>
           </div>
           </div>
           </div>
          <div>
          {renderedResults}
          </div>
    </div>
}

export default SearchBar;