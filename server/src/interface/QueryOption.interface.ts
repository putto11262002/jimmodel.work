export default interface QueryOption {
    limit?: number,
    offset?: number,
    include?: Array<any>,
    order?: Array<any>,
    attributes?: Array<any>,
    where?: any
}


