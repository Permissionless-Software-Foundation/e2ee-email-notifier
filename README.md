# e2ee-email-notifier

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Overview

This app monitors a Bitcoin Cash (BCH) address for end-to-end encrypted (e2ee) messages. When a new message is detected, and alert is sent to your email to alert you that a new message has arrived.

## Requirements

- node **^20.16.0**
- npm **^10.8.1**
- Docker **^24.0.7**
- Docker Compose **^1.27.4**

## Installation

```bash
git clone https://github.com/Permissionless-Software-Foundation/e2ee-email-notifier
cd e2ee-email-notifier
./install-mongo-sh
npm install
npm start
```

## Configuration

- Create a bash sell script called `e2ee-email-notifier.sh`. You can use [e2ee-email-notifier-example.sh](./e2ee-email-notifier-example.sh) as a template.
  - Customize that file with the login details for your email server.
- Edit [these lines in the config file](https://github.com/Permissionless-Software-Foundation/e2ee-email-notifier/blob/5e232453d2df49baf18e6f593176801c56e98dac/config/env/common.js#L101-L103) with the BCH address that will receive e2ee messages, and the email address you want the notifications sent to.

## Usage

- `npm start` Start server on live mode
- `npm run docs` Generate API documentation
- `npm test` Run mocha tests

## License

[MIT](./LICENSE.md)

## Handy Links

[Pedigree](./PEDIGREE.md) - Explanation of the previous open source repositories that were used to build this one.
