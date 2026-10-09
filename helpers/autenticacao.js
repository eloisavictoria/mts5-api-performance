const postLogin = JSON.parse(open('./fixtures/postLogin.json'));
import http from 'k6/http';

export function obterToken() {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(postLogin);
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resposta = http.post(url, payload, params);
    return resposta.json('token');
}