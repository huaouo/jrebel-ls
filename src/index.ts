import * as handlers from './handler'

addEventListener('fetch', (event) => {
  const req = event.request
  const uri = new URL(req.url).pathname
  let resp
  switch (uri) {
    case '/jrebel/leases':
    case '/agent/leases':
      resp = handlers.jrebelLeaseHandler(req)
      break
    case '/jrebel/leases/1':
    case '/agent/leases/1':
      resp = handlers.jrebelLease1Handler(req)
      break
    case '/jrebel/validate-connection':
      resp = handlers.jrebelValidateHandler(req)
      break
    case '/guid':
      resp = handlers.guidHandler(req)
      break
    default:
      resp = handlers.forbidHandler(req)
      break
  }
  event.respondWith(resp)
})
