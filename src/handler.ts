import { v4 as uuidv4 } from 'uuid'
import { jrebelSign } from './sign'

async function getParams(req: Request): Promise<any> {
  const formData = await req.formData()
  const body: any = {}
  for (const entry of formData.entries()) {
    body[entry[0]] = entry[1]
  }
  return body
}

export async function jrebelLeaseHandler(request: Request): Promise<Response> {
  const body = await getParams(request)
  const randomness = body.randomness
  const username = body.username
  const guid = body.guid
  let offline = body.offline
  if (!offline) {
    offline = 'false'
  }
  let validFrom
  let validUntil

  if (offline === 'true') {
    const clientTime = Number(body.clientTime)
    const clinetTimeUntil = clientTime + 180 * 24 * 60 * 60 * 1000;
    validFrom = clientTime
    validUntil = clinetTimeUntil
  }

  const respBody = {
    "serverVersion": "3.2.4",
    "serverProtocolVersion": "1.1",
    "serverGuid": "a1b4aea8-b031-4302-b602-670a990272cb",
    "groupType": "managed",
    "id": 1,
    "licenseType": 1,
    "evaluationLicense": false,
    "signature": "OJE9wGg2xncSb+VgnYT+9HGCFaLOk28tneMFhCbpVMKoC/Iq4LuaDKPirBjG4o394/UjCDGgTBpIrzcXNPdVxVr8PnQzpy7ZSToGO8wv/KIWZT9/ba7bDbA8/RZ4B37YkCeXhjaixpmoyz/CIZMnei4q7oWR7DYUOlOcEWDQhiY=",
    "serverRandomness": "H2ulzLlh7E0=",
    "seatPoolType": "standalone",
    "statusCode": "SUCCESS",
    "offline": offline === 'true',
    "validFrom": validFrom,
    "validUntil": validUntil,
    "company": username,
    "orderId": "",
    "zeroIds": [

    ],
    "licenseValidFrom": 1490544001000,
    "licenseValidUntil": 1691839999000
  }

  if (!(randomness && username && guid)) {
    return new Response(null, { status: 403 })
  }

  respBody.signature = jrebelSign(randomness, guid, offline, validFrom, validUntil)
  return new Response(JSON.stringify(respBody))
}

export async function jrebelLease1Handler(request: Request): Promise<Response> {
  const body = await getParams(request)
  const username = body.username

  const respBody = {
    "serverVersion": "3.2.4",
    "serverProtocolVersion": "1.1",
    "serverGuid": "a1b4aea8-b031-4302-b602-670a990272cb",
    "groupType": "managed",
    "statusCode": "SUCCESS",
    "msg": null,
    "statusMessage": null,
    "company": username
  }

  return new Response(JSON.stringify(respBody))
}

export async function jrebelValidateHandler(request: Request): Promise<Response> {
  const body = await getParams(request)
  const username = body.username

  const respBody = {
    "serverVersion": "3.2.4",
    "serverProtocolVersion": "1.1",
    "serverGuid": "a1b4aea8-b031-4302-b602-670a990272cb",
    "groupType": "managed",
    "statusCode": "SUCCESS",
    "company": username,
    "canGetLease": true,
    "licenseType": 1,
    "evaluationLicense": false,
    "seatPoolType": "standalone"
  }

  return new Response(JSON.stringify(respBody))
}

export async function guidHandler(request: Request): Promise<Response> {
  return new Response(uuidv4())
}

export async function forbidHandler(request: Request): Promise<Response> {
  return new Response(null, { status: 403 })
}
