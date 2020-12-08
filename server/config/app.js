// Libs & utils
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import { pathConfig } from './'
//=====================================
//  GLOBAL APP CONFIGURATION
//-------------------------------------
export const appConfig = {
	// server address
	host: process.env.HOST || '192.168.43.178',
	port: 3001 || 3001,

	configureApp: app => {
		// server address
		app.set('host', appConfig.host)
		app.set('port', appConfig.port)

		// HTTP headers
		app.disable('x-powered-by')
		app.use(helmet.frameguard({ action: 'deny' }))
		app.use(helmet.noSniff())
		app.use(helmet.xssFilter())
		app.use(helmet.ieNoOpen())
		connectDB()
		// gzip compression
		app.use(compression())
		// static files
		app.use(express.static(pathConfig.static, { index: false }))
	}
}