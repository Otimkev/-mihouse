export interface IRenders {
    id?: string;
    userId?: string;
    public?: boolean;
    roomType?: string;
    roomStyle?: string;
    originalImageUrl: string;
    renderedImageUrl: string;
    createdAt?: string;
}

export default async function getRenders() {
    
}