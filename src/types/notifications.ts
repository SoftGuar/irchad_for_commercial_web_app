export interface NotificationPayload {
    requestId: string;
    timestamp: string;
    notificationType: string;
    channels: Array<"email" | "push" | "in-app">;
    broadcast: boolean;
    recipient: Array<{
        userId: number;
        email: string;
    }>;
    message: {
        subject: string;
        body: string;
        attachments?: string[];
        pushNotification?: {
            title: string;
            body: string;
            icon?: string;
            action?: {
                type: string;
                url: string;
            };
        };
    };
    schedule?: {
        sendAt: string;
    };
    metadata?: {
        priority: "low" | "normal" | "high";
        retries: number;
    };
}
export interface updateNotificationInput {
    title?: string;
    message?: string;
    read?: boolean;
    type?: string;
    metadata?: Record<string, any>;
}

export interface Notification { 
    id: number;
     title: string; 
     message: string; 
     is_read: boolean; 
     created_at: string }