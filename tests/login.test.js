import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('./fixtures/postLogin.json'));

export const options = {
    interactions: 10, // número de interações
    // stages: [
    // { duration: '10s', target: 10 },
    // { duration: '20s', target: 10 },
    // { duration: '10s', target: 30 },
    // { duration: '20s', target: 30 },
    // { duration: '20s', target: 0 },
    // ],
//   vus: 10, // número de usuários virtuais
//   duration: '30s',
  thresholds:{
    http_req_duration: ['p(90)<2000', 'max<1000'], 
    http_req_failed: ['rate<0.01'],
  }
};

export default function () {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(postLogin);
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resposta = http.post(url, payload, params);
    //console.log(resposta);

    check(resposta, {
        'Validar status 200': (r) => r.status === 200,
        'Validar que o token é string': (r) => typeof(r.json().token) === 'string',
    })
    sleep(1);
}