import { utilService } from './util-service'
import { storageService } from './async-storage-service'

const EMAILS_KEY = 'mails';
_createEmails()
export const mailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    get,
    getNextEemailId,
    getPrevEemailId,
    createEmail: createEmail
}

function createEmail(title,msg,user='puki'){
    let email = getEmptyEmail()
    email.title = title
    email.msg = msg
    email.user = user
    save(email.id)
}

// returns a promise 
function query() {
    return storageService.query(EMAILS_KEY)
}

// remove item from model and storage
function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}

// returns a promise
function get(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
}

// saves new item or updates existing item 
function save(mail) {
    if (mail.id) return storageService.put(EMAILS_KEY, mail)
    else return storageService.post(EMAILS_KEY, mail)
}


function getNextEemailId(emailId) {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId)
            return (idx < emails.length - 1) ? emails[idx + 1].id : emails[0].id
        })
}

function getPrevEemailId(emailId) {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId)
            return (idx < emails.length - 1 || idx >=0 ) ? emails[idx - 1].id : emails[0].id
        })
}

function getEmptyEmail() {
    const id = utilService.makeId()
    return {
        title,
        id,
        msg,
        sentBy:null,
        sentAt: Date.now()
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('Audu Mea'));
        emails.push(_createEmail('Fiak Ibasa'));
        emails.push(_createEmail('Subali Pesha'));
        emails.push(_createEmail('Mitsu Bashi'));
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}

function _createEmail(title = "New mail!", msg) {
    const mail = {
        id: utilService.makeId(),
        title,
        msg,
        sentAt: Date.now(),
    };
    return mail;
}
