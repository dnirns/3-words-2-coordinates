import { useState, useEffect } from 'react'
import axios from 'axios'

const Converter = () => {
  const [words, setWords] = useState('')
  const [place, setPlace] = useState()

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios.get(
          `https://api.what3words.com/v3/convert-to-coordinates?key=${process.env.REACT_APP_WORDS_API}&words=${words}&format=json`
        )
        setPlace(res.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    const input = document.getElementById('autosuggest')
    if (input) {
      input.addEventListener('select', (value) => {
        setWords(value.detail)
      })
      getLocation()
    }
  }, [words])

  return (
    <div className='container mx-auto text-center py-10'>
      <p className='py-4 text-sm italic'>Search a 'what3words' address:</p>
      <div className=''>
        <what3words-autosuggest
          id='autosuggest'
          debug={true}
          return-coordinates={true}
          placeholder='eg: chainsaw.proved.emotional'
        />
      </div>

      <div>
        {place && (
          <>
            <p className='py-6'>
              Latitude / Longitude for <em className='font-bold'>what3words</em>{' '}
              address
              <span className='text-red-400 italic font-bold'>"{words}"</span>
            </p>
            <p className='font-bold text-4xl py-4 italic'>
              {place.coordinates.lat}, {place.coordinates.lng}
            </p>
            <p>{place.nearestPlace}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Converter
