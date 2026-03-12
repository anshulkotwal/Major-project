#!/usr/bin/env node

const crypto = require('crypto');

console.log('\n🔐 Generating JWT Secret...\n');

const secret = crypto.randomBytes(32).toString('hex');

console.log('Your JWT Secret:');
console.log('================');
console.log(secret);
console.log('================\n');

console.log('Copy this and paste it in your .env file as JWT_SECRET\n');
console.log('Example:');
console.log(`JWT_SECRET=${secret}\n`);
