import { appService } from '../main-app-service/main-app-service.js'
import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'


const EMAILS_KEY = 'emails'
const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
}
_createEmails()


export const emailService = {
	EMAILS_KEY,
	loggedinUser,
	getEmptyEmail,
	getNextEemailId,
	getPrevEemailId,
	createEmail,
}

function createEmail(title, msg, user = 'puki') {
	let email = getEmptyEmail()
	email.title = title
	email.msg = msg
	email.user = user
	save(email.id)
}

function getNextEemailId(emailId) {
	return storageService.query(EMAILS_KEY).then((emails) => {
		const idx = emails.findIndex((email) => email.id === emailId)
		return idx < emails.length - 1 ? emails[idx + 1].id : emails[0].id
	})
}

function getPrevEemailId(emailId) {
	return storageService.query(EMAILS_KEY).then((emails) => {
		const idx = emails.findIndex((email) => email.id === emailId)
		return idx < emails.length - 1 || idx >= 0 ? emails[idx - 1].id : emails[0].id
	})
}

function getEmptyEmail() {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isRead:false,
		sentAt: Date.now(),
		to: 'momo@momo.com',
	}
}

function _createEmails() {
    let email = utilService.loadFromStorage(EMAILS_KEY);
    if (!email || !email.length) {
        email = [];
        email.push(_createEmail());
        email.push(_createEmail());
        email.push(_createEmail());
        email.push(_createEmail());
        utilService.saveToStorage(EMAILS_KEY, email);
    }
    return email;
}


function _createEmail(subject = 'Miss you!', body = 'Would love to catch up sometimes!', to=null) {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isRead:false,
		sentAt: Date.now(),
		sentBy: 'momo@momo.com',
		to,
	}
}

const criteria = {
	status: {inbox: false, sent: false, trash: false, draft: true},
	txt: 'puki',
	isRead: false,
	isStared: false,
	lables: ['important'],
}
