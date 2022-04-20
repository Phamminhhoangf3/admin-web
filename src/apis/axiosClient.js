import axios from 'axios'

export const FetchAPI = async (
    path,
    method,
    headers,
    body,
    endpoint = process.env.REACT_APP_API_ENDPOINT
) => {
    const defaultHeader = { 'Content-type': 'application/json' }
    try {
        return await axios({
            url: endpoint + path,
            method,
            headers: defaultHeader,
            data: body
        })
    } catch (error) {
        if (error.response && error.response.status !== 401) {
            return error.response
        }
        return {
            status: 401,
        }
    }
}

export const get = (path, query = '', headers = {}, endpoint) => {
    return FetchAPI(path + query, 'GET', headers, null, endpoint)
}

export const post = (path, body, headers, endpoint) => {
    return FetchAPI(path, 'POST', headers, body, endpoint)
}

export const patch = (path, body, headers, endpoint) => {
    return FetchAPI(path, 'PATCH', headers, body, endpoint)
}

export const destroy = (path, query, body, headers, endpoint) => {
    return FetchAPI(path + query, 'DELETE', headers, body, endpoint)
}
