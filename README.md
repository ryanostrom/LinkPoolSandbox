# @LinkPoolSandbox/LinkPoolSandbox

Copyright (c) 2021-Praxent, LLC. All Rights Reserved.

## Precursor. Using this Starter

#### 1. Find/Replace "LinkPoolSandbox" with a camelcase name of your project, i.e., ProjectName

#### 2. Navigate to `packages/app/ios` and change the following directory and file names, replacing with your ProjectName (same as step 1)

- `LinkPoolSandbox`
- `LinkPoolSandbox.xcodeproj`
- `LinkPoolSandbox.xcodeproj/xcshareddata/xcschemes/LinkPoolSandbox (Production).xcscheme`
- `LinkPoolSandbox.xcodeproj/xcshareddata/xcschemes/LinkPoolSandbox (Staging).xcscheme`
- `LinkPoolSandbox.xcodeproj/xcshareddata/xcschemes/LinkPoolSandbox-tvOS.xcscheme`
- `LinkPoolSandbox.xcodeproj/xcshareddata/xcschemes/LinkPoolSandbox.xcscheme`
- `LinkPoolSandbox.xcworkspace`
- `LinkPoolSandboxTests`
- `LinkPoolSandboxTests/LinkPoolSandboxTests.m`

#### 3. Navigate to `packages/app/android/app/src` and change the following director names, replacing with your ProjectName (same as step 1)

- `debug/java/com/LinkPoolSandbox`
- `main/java/com/LinkPoolSandbox`

#### 4. Delete this `Precursor` section of the README

#### 5. Delete and init git:

- Navigate to project root
- `$ rm -rf .git`
- `$ git init`

Now just follow the rest of the readme to get your project up and running.

## I. Server

### 1. Environment Versions

* Node 12.18.0

### 2. Run Locally

* nvm use
* yarn
* docker compose build
* docker compose up

### 3. Infrastructure

TBD: AWS IaC via Terraform (will reside at project-root/aws)

## II. App

### 1. Environment Versions

* XCode 12.5
* Node 12.18.0

### 2. Run Locally

* cd packages/app
* yarn
* cd ios
* pod install --repo-update
* npm run ios || npm run android

### 3. Deploy

Automatic deployment on `develop` to iOS and Android via AppCenter.

### 4. Troubleshooting

#### A. iOS
* npm start -- --reset-cache
* cd packages/app/ios && rm -rf Pods Podfile.lock ../node_modules && yarn install && pod install

#### B. Android

You may need to add the following file at the following path:

Path: `packages/app/android/local.properties`
Contents: `sdk.dir=/Users/YOUR-USERNAME/Library/Android/sdk`
