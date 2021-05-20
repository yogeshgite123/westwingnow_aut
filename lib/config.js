module.exports = {
    "prod": {
        //Assumption that configuration given for Production
        browserName: 'chrome',
        baseUrl: 'https://www.westwingnow.de/',
        logLevel: 'info',
        maxInstance: 5,
        username: 'yogeshgite123@rediffmail.com',
        password: 'Password!1',
        timeout: 10000,
        bail:0,
        firstname: 'Yogesh'    
    },
    "qa": {
        //QA Configuration go here
    },
    "snd": {
        //Snadbox Configuration go here
    }
}