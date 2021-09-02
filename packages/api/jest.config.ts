import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: InitialOptionsTsJest = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  roots: [
    "<rootDir>/src",
  ],
  modulePaths: [
    "<rootDir>",
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  testTimeout: 20000,
  testEnvironment: 'node',
}

export default config
