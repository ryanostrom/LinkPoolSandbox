import 'dotenv/config'
import App from './App'
import validateEnv from 'utils/validateEnv'

validateEnv()

const app = new App()

app.listen()
