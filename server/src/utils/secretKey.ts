/*使用node-rsa生成秘钥对*/

import * as NodeRSA from 'node-rsa';
import { NodeEnv } from '../type';

export default class SecretKey {
  pubkey = '';
  prikey = '';
  constructor() {
    // 本地开发就不每次都刷新key了。
    // local与
    if (process.env.NODE_ENV === NodeEnv.Local) {
      this.pubkey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtUxOnubgDlGSV25UGide
Lf1RbPoI2fcOtMJcE3/vRLEWF1h1JsIY+2/toem/hTX3F1CWjOPq+62DCI8anF+G
xInFPQUFyZ9a6Ls6+4cDb7nqQvr/+Tl+tVnroHp7arRQQD+UJwzNmQvx99LHbwbm
pMdkblFM8a+PGiyMeU3TnssmvHoD3ZNQrLPTJJefFY+rQEJnA0Blivt+uRfSWD1W
iyluuhk8dzvB/Zwm/Cs1kFJYjgVjvOMpzmPqR22gMM5bCHfFpEdrLdTXrr5Nyh2c
gautK172ysBJZjkrYU/l7uYEsVMmR5j9qBTZFCNOBos2lja3HvFOo2xRt/UKJ5QI
PwIDAQAB
-----END PUBLIC KEY-----`;
      this.prikey = `-----BEGIN PRIVATE KEY-----
          MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1TE6e5uAOUZJX
          blQaJ14t/VFs+gjZ9w60wlwTf+9EsRYXWHUmwhj7b+2h6b+FNfcXUJaM4+r7rYMI
          jxqcX4bEicU9BQXJn1rouzr7hwNvuepC+v/5OX61WeugentqtFBAP5QnDM2ZC/H3
          0sdvBuakx2RuUUzxr48aLIx5TdOeyya8egPdk1Css9Mkl58Vj6tAQmcDQGWK+365
          F9JYPVaLKW66GTx3O8H9nCb8KzWQUliOBWO84ynOY+pHbaAwzlsId8WkR2st1Neu
          vk3KHZyBq60rXvbKwElmOSthT+Xu5gSxUyZHmP2oFNkUI04GizaWNrce8U6jbFG3
          9QonlAg/AgMBAAECggEAdORZQKzdQ34mm8af5SkC2SYeLORddqOLUNKL6WqwS5re
          AnlfN3koAF3fWmjKukncIaUtHHQLWvA5rvgNkUsqKmglyr0FSUU8qRem5OvdNFkr
          iLoq9naykp0ChjrSfi76GyKjFDZ2DTqdbUrymUxaw11oDJTQxneKDbcxbzjVu+hs
          IzHmHLlY6+CcXwvIg+92NTQLZd9IMj5MbY4LFFKGrJ9gaqwz6ZE2y2xVMJk33DsA
          dTN4flhKkXVIeSAjq1u3CJdvVgsjJXdHb+pC3DSUsV6aA6LqvzXmrIeiM/1rMLGh
          XKoNIgbyp9KvNjVnjgvHDH6A+W+0kQy/qRmRQFLPCQKBgQDZ0ARGSrIU2vHJj5j6
          7DPsDSVsaa5msMgdj1ld6eMHt0oIBlzebkcODs5ZOtAj6cFNpRnQMA/xRVnymdiX
          C8QRvBpcZztizlwrin1EACM/Shjvo27W+FeO2EmbnvFaWLL16KoI7WvwA7DbSlfS
          uctI6t3IhuUaruD+W1L0TWjwmwKBgQDVFW1OJ63B0zDKYFDEKf0VKLch9MObl++2
          86CClNalRlpYXIbTQV8WTmARvNVqqjC7tmYx/e6CNrSXmDRIj8N6keIANMlVgvcc
          6yeqst5NTtFVf/WcZrEgwglg1S7gUdAM1lgaK8xLrp8K+/YP2CWNZhoaXduv0/EY
          6Snm08CHLQKBgD6Qovmx8Q9OiM9WASJqgMuYRxyqCp+SvhjHmWsBiOYpfwlpEnoO
          ATkHhbxZyXnXZmAwQYbsl1e9jQXDrVRN2+cgOg461PMfxZf4Mt06kOVYGmuTbX4w
          Xa45cINUF43VFqrORzFDSZLq7H1BEJMGLV9nn4c/QEX238gQYXatWaxrAoGBAJPg
          vOziaJn9IP0x/ptEsJkAmqd8IExZE0mapig5dwVYX9a2z/LIiV8HoXBt5oaR+iQr
          n5zOJ7pCkO4r+QzqiLUFjRyrhZZMv4ZYRD0YyWJJcsmtdhzGv+KGBtAm4tNWs9ZU
          4uu2vZ9AXqvW1JuGW/lXhIIL5SyPH+Ez35qMFi85AoGBAMRgOxHyw+gcz+NcCLeR
          x1ZsZWNtcqTkkfHULEWdWicZf/q9Lyt/HDMfycSO6EOu2VREeeDTR/XIKNc6vT11
          0zWHvhh50Ha6bNhdhAZ4UjiELM2q/KTZkv8egpYy9w7O5+UpG9y7rct7QT8ibuE5
          +l22aCurvD+EgU4AFfq6t6H/
          -----END PRIVATE KEY-----`;
    } else {
      const key = new NodeRSA({ b: 2048 });
      this.pubkey = key.exportKey('pkcs8-public');
      this.prikey = key.exportKey('pkcs8-private');
      console.log('this.pubkey', this.pubkey);
      console.log('this.prikey', this.prikey);
    }
  }
}
