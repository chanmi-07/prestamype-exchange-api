/**
 * Cambio Seguro Service to interact with Cambio Seguro API
 */
import { HTTP_HEADER } from '@/integrations/global/enums/http.enum';
import { ENVIRONMENT } from '@/shared/config/enums/environment.enum';
import axios, { AxiosInstance } from 'axios';
import { CAMBIO_SEGURO_ENDPOINT } from '@/integrations/cambioseguro/domain/enums/endpoint';
import { Environment } from '@/shared/config/classes/environment';

export class CambioSeguroService {
    private readonly baseUrl = Environment.get(ENVIRONMENT.CAMBIO_SEGURO_API_URL);
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                [HTTP_HEADER.CONTENT_TYPE]: HTTP_HEADER.APPLICATION_JSON,
            },
        });
    }

    async getRequest<T>(endpoint: CAMBIO_SEGURO_ENDPOINT): Promise<T> {
        const response = await this.client.get<T>(endpoint);
        return response.data;
    }
}