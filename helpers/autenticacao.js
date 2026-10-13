const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import http from 'k6/http';
import {pegarBaseUrl} from '../utils/variaveis.js';

export function obterToken() {
    const url = pegarBaseUrl() + '/Login';
    const payload = JSON.stringify(postLogin);
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resposta = http.post(url, payload, params);
    return resposta.json('token');
}