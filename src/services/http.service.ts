import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseApiUrl} from '../configs/index';
import {keyStorage} from '../consts';

export class HttpService {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: baseApiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      timeoutErrorMessage: 'Request timed out',
    });

    this.instance.interceptors.request.use(
      async config => {
        try {
          const accessToken = await AsyncStorage.getItem(
            keyStorage.accessToken,
          );
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error('Error reading access token:', error);
        }

        return config;
      },
      error => {
        console.error('Error from request interceptor:', error);
        return Promise.reject(error);
      },
    );
  }
}

const httpService = new HttpService().instance;

export default httpService;
