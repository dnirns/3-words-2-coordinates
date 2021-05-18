import { useState, useEffect } from 'react'

const Converter = () => {
  const [words, setWords] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  useEffect(() => {
    const input = document.getElementById('autosuggest')
    if (input) {
      input.addEventListener('select', (value) => {
        setWords(value.detail)
        setLat(value.target.coordinatesLat)
        setLng(value.target.coordinatesLng)
      })
    }
  })

  return (
    <div className='container mx-auto text-center py-10'>
      <div className=''>
        <what3words-autosuggest
          id='autosuggest'
          debug={true}
          return-coordinates={true}
          placeholder='e.g. daring.lion.race'
        />
      </div>

      <div>
        {words && (
          <>
            <p className='py-6'>
              Latitude / Longitude for <em className='font-bold'>what3words</em>{' '}
              address
              <span className='text-red-400 italic font-bold'>"{words}"</span>
            </p>
            <p className='font-bold text-4xl py-4 italic'>
              {lat}, {lng}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Converter
