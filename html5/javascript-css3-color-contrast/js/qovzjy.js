function createReactiveCSSProps(props) {
  const keys = Object.keys(props)
  const DOM = document.documentElement

  keys.forEach(key => {
    const { initial, windowEvents } = props[key]
    if (initial) {
      DOM.style.setProperty(key, initial) 
    }
    Object.keys(windowEvents || []).forEach(event => {
      const handler = windowEvents[event]
      window.addEventListener(event, e => {
        DOM.style.setProperty(key, handler(e)) 
      })
    })
  })

  return {
    dispatch({ type, data }) {
      keys.forEach(key => {
        const { reducer } = props[key]
        const newValue = reducer && reducer({ type, data })
        if (newValue != null) {
          DOM.style.setProperty(key, newValue)
        }
      })
    }
  }
}