export interface RotinaResponse {
    id: number;
    tipo: string;
    timeStamp: string;
    detalhes: {
        lado: 'esquerdo' | 'direito' | 'ambos';
        duracao?: string;
    }
}