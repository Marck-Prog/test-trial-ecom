const TopBar = () => {
  const messages = [
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
  ]

  return (
    <div className='bg-black text-white py-2 overflow-hidden'>
      <div className='inline-flex animate-scroll whitespace-nowrap'>
        {messages.map((message, index) => (
          <span
            key={index}
            className={`mx-4 text-xs sm:mx-6 sm:text-sm md:mx-8 md:text-sm font-semibold ${
              message.includes('25%') ? 'text-yellow-400' : 'text-white'
            }`}
          >
            {message}
            {index < messages.length - 1 && (
              <span className='inline-block mx-2 sm:mx-3 md:mx-4 text-gray-500'>
                •
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TopBar
