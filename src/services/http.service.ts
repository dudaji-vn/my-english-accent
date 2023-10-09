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
    });

    this.instance.interceptors.request.use(
      async config => {
        try {
          const accessToken = await AsyncStorage.getItem(
            keyStorage.accessToken,
          );
          if (accessToken) {
            console.log('accessToken', accessToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error('Error reading access token:', error);
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}

const httpService = new HttpService().instance;

export default httpService;
