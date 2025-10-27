import { authenticatedFetch } from './base'

/**
 * Get survey questions
 *
 * @param {number} observationProtocolSurveyId - protocol survey instance ID
 * @param {number} caseId - case ID
 * @param {number} surveyId - survey ID
 * @param {number} languageId - language ID
 * @returns {*} - response containing a list of questions
 */
export const getSurvey = (observationProtocolSurveyId, caseId, surveyId, languageId) => {
	return authenticatedFetch(
		`/api/observationalProtocol/ops/${observationProtocolSurveyId}/case/${caseId}/survey/${surveyId}/language/${languageId}/questions`,
		{
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		}
	)
		.then(function(response) {
			if (response.status === 200) {
				return response.json()
			}
		})
		.then(function(obj) {
			return obj
		})
}

/**
 * Get survey navigation (next and previous survey/case)
 *
 * @param {number} observationProtocolSurveyId - protocol survey instance ID 
 * @param {number} caseId - case ID
 * @param {number} surveyId - survey ID
 * @param {number} languageId - language ID
 * @returns {*} - response containing navigation model
 */
export const getSurveyNavigation = (observationProtocolSurveyId, caseId, surveyId, languageId) => {
	return authenticatedFetch(
		`/api/observationalProtocol/ops/${observationProtocolSurveyId}/case/${caseId}/survey/${surveyId}/language/${languageId}/surveyNavigation`,
		{
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		}
	)
		.then(function(response) {
			if (response.status === 200) {
				return response.json()
			}
		})
		.then(function(obj) {
			return obj
		})
}

/**
 * @obsolete
 * Description placeholder
 *
 * @param {*} protocolId 
 * @returns {*} 
 */
export const getProtocol = (protocolId) => {
	return authenticatedFetch(`/api/observationalProtocol/${protocolId}`, {
		method: 'GET',
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (response.status === 200) {
				return response.json()
			}
		})
		.then(function(obj) {
			return obj
		})
}

/**
 * Get bilateral areas names
 *
 * @param {number} versionId - protocol version ID
 * @returns {*} - response containing bilateral areas names
 */
export const fetchBilateralAreas = (versionId) => {
	return authenticatedFetch(
		`/api/observationalProtocol/version/${versionId}/bilateralAreas`,
		{
			method: 'get'
		}
	)
		.then(function(response) {
			if (response.status === 200) {
				return response.json()
			}
		})
		.then(function(response) {
			return response
		})
}
