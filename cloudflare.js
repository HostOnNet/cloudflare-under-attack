var os = require("os");
var fs = require("fs");
var touch = require("touch");

var server_load = os.loadavg()[1];

if (server_load > 6) {
    if (! fs.existsSync(".cf_under_attack")) {
        touch(".cf_under_attack");
        CloudFlareOn();
        console.log("CloudFlare = ON");
    }
} else {
    if (fs.existsSync(".cf_under_attack")) {
        var file_stats = fs.statSync(".cf_under_attack");
        var time_file_create = file_stats["ctime"];
        var time_1_hour_ago = new Date() - (3600 * 1000); // JS time is in mulli seconds.
        if (time_file_create.getTime() < time_1_hour_ago) {
            fs.unlinkSync(".cf_under_attack");
            CloudFlareOff();
        }
    }
}

function CloudFlareOn() {
    var exec = require('child_process').exec;
    exec("/usr/bin/curl https://www.cloudflare.com/api_json.html -d 'a=sec_lvl' -d 'tkn=CF_API_KEY' -d 'email=you@your-email.com' -d 'z=YOUR-DOMAIN-NAME.COM' -d 'v=help'", function callback(error, stdout, stderr){
        console.log(stdout);
    });
}



function CloudFlareOff() {
    var exec = require('child_process').exec;
    exec("/usr/bin/curl https://www.cloudflare.com/api_json.html -d 'a=sec_lvl' -d 'tkn=CF_API_KEY' -d 'email=you@your-email.com' -d 'z=YOUR-DOMAIN-NAME.COM' -d 'v=high'", function callback(error, stdout, stderr){
        console.log(stdout);
    });
}
