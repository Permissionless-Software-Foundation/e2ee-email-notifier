# e2ee-email-notifier

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Overview

This app monitors a Bitcoin Cash (BCH) address for end-to-end encrypted (e2ee) messages. When a new message is detected, and alert is sent to your email to alert you that a new message has arrived.

## Requirements

- node **^14.18.2**
- npm **^8.3.0**
- Docker **^20.10.8**
- Docker Compose **^1.27.4**

## Installation

```bash
git clone https://github.com/Permissionless-Software-Foundation/e2ee-email-notifier
cd e2ee-email-notifier
./install-mongo-sh
npm install
npm start
```

## Usage

- `npm start` Start server on live mode
- `npm run docs` Generate API documentation
- `npm test` Run mocha tests
- `docker-compose build` Build a 'production' Docker container
- `docker-compose up` Run the docker container

## License

[MIT](./LICENSE.md)
