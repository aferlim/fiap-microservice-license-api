const errorFactory = require('error-factory')

const Joi = require('@hapi/joi')
const Schema = require('./schema')

const { created, ok, badRequestWithMessage } = require('../response')

const LicenseError = errorFactory('InvalidMessage', [
	('message', 'details', 'annotate', '_object')
])

const _validateLicense = license => {
	const { error, value } = Joi.validate(license, Schema)

	if (error) {
		const { message, details, annotate } = error
		throw LicenseError(message, details, annotate)
	}

	return value
}

const Create = (license, res) => {
	try {
		_validateLicense(license)

		DATA.push(license)

		return created(res)
	} catch (error) {
		badRequestWithMessage(res, error)
	}
}

const GetAll = res => {
	return ok(res, DATA)
}

module.exports = { Create, GetAll }

const DATA = []
