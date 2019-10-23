import axios from '@utils/request';
import { rsa } from '@utils/encryption';

export const login = async ({ account, password }) => {
  const res = axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { account, password: password ? rsa(password) : void 0 },
      query: `
      mutation($account: String, $password: String){
        login( account: $account, password: $password ){
          user { id name account sex status role { id desc auth name } }
          rescode 
          message 
        }
      }`,
    }
  });
  return res.data.data.login;
}
