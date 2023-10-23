export type TOrder = {
    account_number: number;
    amount: string;
    bank_code: string;
    created_at: string;
    id: number;
    message: string;
    status: 'wait' | 'error' | 'success';
    user_game_id: number;
}
