/**
 * List of URLs excluded from the logging
 *
 * @type {Array<string>}
 */
const excludedUrls = [
	'/api/utility/log',
	'/api/authorization/refresh/'
]

/**
 * List of error codes for authorization related errors
 *
 * @type {Array<number>}
 */
export const AuthErrors = [51, 52, 53]

/**
 * Wrapper for fetch that handles authorization errors and error logging
 *
 * @param {string} path - fetch path
 * @param {object} params - fetch parameters
 * @returns {*} fetch result
 */
export const authenticatedFetch = (path, params) => {
	let request = {
		...params, 
		headers: {
			...params.headers
		}
	}

	//const dispatch = history.store.dispatch

	return fetch(path, { ...request, credentials: 'include' }).then((response) => {
        /*
		if (response.headers.get('token-expired') || response.status === 401) {

			let params = queryString.parse(browserHistory.location.search);
			//always log when submitting survey
			if (response.url && 
				/\/api\/survey\/\d+\/\d+\/\d+\/\d+/.test(response.url) &&
				request.method  == 'POST') {
				utilityLog(
					'Requested Url: ' + response.url + '\n' +
                	'Status: ' + response.status + '\n' +
                	'Method: ' + params?.method + '\n' +
                	'Body: ' + params?.body, 
					3);
			}

			return refreshToken().then((response) => {
				const authErrors = [51, 52]
				syncCookies();
				if (response && response.status === 200) {
					return fetch(path, { ...request, credentials: 'include' })
				} else {
					var patient = params.patient
					var token = params.token
					if (!!patient && !!token) {
						return autoSignIn(patient, token).then((response) => {
							syncCookies();
							if (response && response.isSuccessful) {
								return fetch(path, { ...request, credentials: 'include' })
							} else if (response && response.redirectTo) {
								var urlHasParams = response.redirectTo.indexOf('?') > 0
								var redirectTo = response.linkExpired ? response.redirectTo : `${response.redirectTo}${!!token ? `${urlHasParams ? '&' : '?'}token=${token}` : ''}`

								history.push(redirectTo)
								return response
							} else if (response && AuthErrors.includes(parseInt(response.errorCode))) {
								dispatch({
									type: 'SHOW_AUTH_ERROR_DIALOG',
									data: {
										options: {
											buttonUrl: response.redirectTo,
											authErrorCode: response.errorCode,
											disableBackdropClick: true
										}
									}
								})
							
								return response
							} else {
								history.push('/auth/login')
								return response
							}
						})
					} else if (response) {
						response = response.json()
							.then((jsonResponse) => {
								if (jsonResponse && AuthErrors.includes(parseInt(jsonResponse.errorCode))) {
									dispatch({
										type: 'SHOW_AUTH_ERROR_DIALOG',
										data: {
											options: {
												buttonUrl: jsonResponse.redirectTo,
												authErrorCode: jsonResponse.errorCode,
												disableBackdropClick: true
											}
										}
									})

									return response
								} else {
									history.push('/auth/login')
									return response
								}
							})
							.catch(() => response)

						return response
					} else {
						history.push('/auth/login')
						return response
					}
				}
			})
		}
		else if ([400, 404, 500].includes(response.status) && !excludedUrls.some(u => response.url.includes(u))) {
			response = response.json().then((jsonResponse) => {
				if (jsonResponse && AuthErrors.includes(parseInt(jsonResponse.errorCode))) {
					dispatch({
						type: 'SHOW_AUTH_ERROR_DIALOG',
						data: {
							options: {
								buttonUrl: jsonResponse.redirectTo,
								authErrorCode: jsonResponse.errorCode,
								disableBackdropClick: true
							}
						}
					})

					return jsonResponse
				} else {
					utilityLog(
						'Requested Url: ' + response.url + '\n' +
						'Status: ' + response.status + '\n' +
						'Method: ' + params?.method + '\n' +
						'Body: ' + params?.body,
						2);

					return response
				}
			})
			.catch(() => response)
		}
        */
		return response
	})
}
