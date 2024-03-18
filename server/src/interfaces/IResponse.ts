interface IResponse {
    isOK: boolean,
    errors?: Record<string, string>,
    message?: string
}
export default IResponse;