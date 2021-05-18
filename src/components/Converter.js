import { useState } from 'react'
import axios from 'axios'

const Converter = () => {
  const [words, setWords] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [location, setLocation] = useState({})
  const [error, setError] = useState({})

  const convertWords = async () => {
    try {
      const res = await axios.get(
        `https://api.what3words.com/v3/convert-to-coordinates?words=${words}&key=${process.env.REACT_APP_WORDS_API}`
      )
      const data = res.data
      setLat(data.coordinates.lat)
      setLng(data.coordinates.lng)
      setLocation(data)
      setError({})
    } catch (err) {
      const res = err.response.data
      setError(res.error)
      setLocation({})
    }
  }
  return (
    <div className='container mx-auto text-center'>
      <div>
        {/* autocomplete input from w3w api docs */}
        <what3words-autosuggest
          id='autosuggest'
          placeholder='e.g. daring.lion.race'
        />
      </div>{' '}
      <button
        className='my-6 rounded px-4 py-2 bg-green-400 text-white hover:bg-opacity-90'
        onClick={convertWords}
      >
        GET COORDINATES
      </button>
      {location.coordinates && (
        <div>
          <p className='font-bold text-lg py-4'>
            {lat},{lng}
          </p>

          <p>
            {location.nearestPlace}, {location.country}
          </p>
          <a href={location.map}>
            <p className='py-6 italic font-bold text-green-400 hover:text-green-300'>
              {location.words}
            </p>
          </a>
        </div>
      )}
      {error.message && (
        <p className='py-10 text-red-500'>Error: {error.message}</p>
      )}
    </div>
  )
}

export default Converter
