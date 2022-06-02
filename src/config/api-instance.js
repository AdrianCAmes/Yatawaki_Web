import axios from 'axios';
import bindErrorInterceptor from './bind-error-interceptor';
import { BASE_URL } from './config';

const apiInstance = axios.create({ baseURL: BASE_URL });
bindErrorInterceptor(apiInstance);

export default apiInstance;