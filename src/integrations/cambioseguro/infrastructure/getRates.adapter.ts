/**
 * Get Rates Adapter for Cambio Seguro integration
 */
import { CAMBIO_SEGURO_ENDPOINT } from "@/integrations/cambioseguro/domain/enums/endpoint";
import { CambioSeguroService } from "@/integrations/cambioseguro/infrastructure/cambioseguro.service";
import { RatesInterface } from "@/integrations/cambioseguro/domain/types/cambioseguro.interface";

export class GetRatesAdapter {
    private readonly cambioSeguroService: CambioSeguroService;

    constructor() {
        this.cambioSeguroService = new CambioSeguroService();
    }

    async getRates(): Promise<RatesInterface> {
        return await this.cambioSeguroService.getRequest<RatesInterface>(CAMBIO_SEGURO_ENDPOINT.RATES);
    }
}