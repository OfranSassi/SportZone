import matchMediaPolyfill from 'mq-polyfill'

matchMediaPolyfill(window)

// implementation of window.resizeTo for dispatching event
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'))
}