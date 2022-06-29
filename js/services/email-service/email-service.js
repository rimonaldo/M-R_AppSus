import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'

const EMAILS_KEY = 'mails'
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

// returns a promise
// function query() {
//     return storageService.query(EMAILS_KEY)
// }

// remove item from model and storage
// function remove(emailId) {
//     return storageService.remove(EMAILS_KEY, emailId)
// }

// returns a promise
// function get(emailId) {
//     return storageService.get(EMAILS_KEY, emailId)
// }

// saves new item or updates existing item
// function save(mail) {
//     if (mail.id) return storageService.put(EMAILS_KEY, mail)
//     else return storageService.post(EMAILS_KEY, mail)
// }

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
		title,
		id,
		msg,
		sentBy: null,
		sentAt: Date.now(),
	}
}

function _createEmails() {
	let emails = utilService.loadFromStorage(EMAILS_KEY)
	if (!emails || !emails.length) {
		emails = []
		emails.push(_createEmail('Audu Mea'))
		emails.push(_createEmail('Fiak Ibasa'))
		emails.push(_createEmail('Subali Pesha'))
		emails.push(_createEmail('Mitsu Bashi'))
		utilService.saveToStorage(EMAILS_KEY, emails)
	}
	return emails
}

function _createEmail(title = 'New mail!', msg) {
	const id = utilService.makeId()
	const mail = {
		id,
		title,
		msg,
		sentAt: Date.now(),
	}
	return mail
}

const criteria = {
	status: {inbox: false, sent: false, trash: false, draft: true},
	txt: 'puki',
	isRead: false,
	isStared: false,
	lables: ['important'],
}
