import http from 'k6/http';
import { sleep, check } from 'k6';
import {obterToken} from './helpers/autenticacao.js';

export const options = {
  interactions: 1, // número de interações
};

export default function() {
  const token = obterToken();
  const url = 'http://localhost:3000/transferencias';
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
    'status é 201': (r) => r.status === 201,
    'resposta contém sucesso': (r) => r.json('mensagem') === 'Transferência realizada com sucesso',
  });

  sleep(1); // pausa de 1 segundo entre as interações
}
