const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const License = require('./license/index')

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
})

const start = async srv => {
	const swaggerOptions = {
		info: {
			title: 'License Microservice Documentation',
			version: '1'
		}
	}

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	])

	await srv.start()
	console.log('Server running on %s', srv.info.uri)
}

process.on('unhandledRejection', err => {
	console.log(err)
	process.exit(1)
})

start(server)

License(server)
