export interface RotinaRequest {
    tipo: string;
    timeStamp: string;
    detalhes: {
        lado: 'esquerdo' | 'direito' | 'ambos';
        duracao?: string;
    }
}