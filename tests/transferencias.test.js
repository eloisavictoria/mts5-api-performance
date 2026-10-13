import http from 'k6/http';
import { sleep, check } from 'k6';
import {obterToken} from '../helpers/autenticacao.js';
import {pegarBaseUrl} from '../utils/variaveis.js';

export const options = {
  interactions: 1, // número de interações
};

export default function() {
  const token = obterToken();
  const url = pegarBaseUrl() + '/transferencias';
  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 11,
    token:""
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
  const resposta = http.post(url, payload, params);
  
  check(resposta, {
    'status é 201': (r) => r.status === 201
  });

  sleep(1); // pausa de 1 segundo entre as interações
}
