export interface ChatMessage {
    id?: number; // Optional, as it might not be available when sending a new message
    sender: string;
    recipient: string;
    message: string; 
    timestamp?: string | Date; // Adjust the type based on your timestamp field
}