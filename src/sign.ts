import * as rs from 'jsrsasign'

export function jrebelSign(clientRandomness: string, guid: string,
    offline: string, validFrom?: number, validUntil?: number): string {
    const serverRandomness = 'H2ulzLlh7E0='
    const keyBase64 = 'MIICXAIBAAKBgQDQ93CP6SjEneDizCF1P/MaBGf582voNNFcu8oMhgdTZ/N6qa6O7XJDr1FSCyaDdKSsPCdxPK7Y4Usq/fOPas2kCgYcRS/iebrtPEFZ/7TLfk39HLuTEjzo0/CNvjVsgWeh9BYznFaxFDLx7fLKqCQ6w1OKScnsdqwjpaXwXqiulwIDAQABAoGATOQvvBSMVsTNQkbgrNcqKdGjPNrwQtJkk13aO/95ZJxkgCc9vwPqPrOdFbZappZeHa5IyScOI2nLEfe+DnC7V80K2dBtaIQjOeZQt5HoTRG4EHQaWoDh27BWuJoip5WMrOd+1qfkOtZoRjNcHl86LIAh/+3vxYyebkug4UHNGPkCQQD+N4ZUkhKNQW7mpxX6eecitmOdN7Yt0YH9UmxPiW1LyCEbLwduMR2tfyGfrbZALiGzlKJize38shGC1qYSMvZFAkEA0m6psWWiTUWtaOKMxkTkcUdigalZ9xFSEl6jXFB94AD+dlPS3J5gNzTEmbPLc14VIWJFkO+UOrpl77w5uF2dKwJAaMpslhnsicvKMkv31FtBut5iK6GWeEafhdPfD94/bnidpP362yJl8Gmya4cI1GXvwH3pfj8S9hJVA5EFvgTB3QJBAJP1O1uAGp46X7Nfl5vQ1M7RYnHIoXkWtJ417Kb78YWPLVwFlD2LHhuy/okT4fk8LZ9LeZ5u1cp1RTdLIUqAiAECQC46OwOm87L35yaVfpUIjqg/1gsNwNsj8HvtXdF/9d30JIM3GwdytCvNRLqP35Ciogb9AO8ke8L6zY83nxPbClM='
    const keyHex = Buffer.from(keyBase64, 'base64').toString('hex');

    let data
    if (offline === 'true') {
        data = [clientRandomness, serverRandomness, guid, offline, validFrom, validUntil].join(';')
    } else {
        data = [clientRandomness, serverRandomness, guid, offline].join(';')
    }

    let sig = new rs.KJUR.crypto.Signature({ alg: "SHA1withRSA" })
    let prvKey = rs.KEYUTIL.getKey(keyHex, null, "pkcs5prv");
    sig.init(prvKey)
    sig.updateString(data)
    const signHex = sig.sign()
    const signBase64 = Buffer.from(signHex, 'hex').toString('base64')
    return signBase64
}