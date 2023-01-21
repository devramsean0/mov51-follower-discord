export interface IappToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface Istreams {
    data: {
        id: string;
        user_id: string;
        user_login: string;
        user_name: string;
        game_id: string;
        game_name: string;
        type: string;
        title: string;
        viewer_count: number;
        started_at: string;
        language: string;
        thumbnail_url: string;
        tag_ids: string;
    }[];
    paignation: {
        cursor: string;
    }
}
export interface IappTokenRefreshed {
    access_token: string;
    refresh_token: string;
    scope: string[];
    token_type: string;
}