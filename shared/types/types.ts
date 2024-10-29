export interface CommonResponse<T> {
    result: 'SUCCESS' | 'FAIL';
    data: T | null;
    message: string;
    errorCode: string | null;
}