# CloudFlare Under Attack

This is a simple Node.js script, that run on server every X minutes.

It check server load, if load is high, turn on CloudFlare IUAM mode.

Run the script in cronjob every 5 minutes

```
*/5 * * * *  cd /root/ddos && /usr/bin/nodejs cloudflare.js
```

You need to install dependency for node.js, for that run

```
cd /root/ddos
npm install
```

## Editing cloudflare.js

You need to edit the file, update following

* CF_API_KEY = your cloudflare API key.
* YOUR-DOMAIN-NAME.COM = Your domain under cloudflare protection.
* you@your-email.com = your cloudflare login email address.
