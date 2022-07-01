import { appService } from '../main-app-service/main-app-service.js'
import { utilService } from '../main-app-service/util-service.js'
import { storageService } from '../main-app-service/async-storage-service.js'


const EMAILS_KEY = 'inbox'
const SENT_KEY = 'sent'
const STARRED_KEY = 'starred'
const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
}
_createSentEmails()
_createEmails()
_createStars()


export const emailService = {
	EMAILS_KEY,
	SENT_KEY,
	loggedinUser,
	getEmptyEmail,
	getNextEemailId,
	getPrevEemailId,
	createEmail,
	getNewEmail,
	query,
	get,
	remove,
	save,
	composeEmail,
	saveEmails,
	saveSentEmails,
	getStars,
	saveStar,


}

// getNewEmail()

function composeEmail() {
	return  _createEmptyEmail()
}

function getNewEmail() {
	console.log('new:', _createSentEmail());
}

function _createStars(){
	let stars = utilService.loadFromStorage(STARRED_KEY) || []
	if(stars){
		utilService.saveToStorage(STARRED_KEY,stars)
	}
}


function getStars(){
	return utilService.loadFromStorage(STARRED_KEY)
}

function saveStar(email){
	let stars = utilService.loadFromStorage(STARRED_KEY) || []
	stars.push(email)
	utilService.saveToStorage(STARRED_KEY,stars)
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
		isRead: false,
		sentAt: Date.now(),
		to: 'momo@momo.com',

	}
}

function _createEmails() {
	let email = utilService.loadFromStorage(EMAILS_KEY)
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



function _createEmail(subject = 'Miss you!', body = 'Would love to catch up sometimes!', to = 'momo@momo.com') {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isRead: false,
		sentAt: Date.now(),
		sentBy: {
			email: to,
			fullname: to.split('@')[0]
		},
		to,
	}
}





function _createSentEmails() {
	let email = utilService.loadFromStorage(SENT_KEY) || {};
	if (!email || !email.length) {
		email = [];
		email.push(_createSentEmail());
		email.push(_createSentEmail());
		email.push(_createSentEmail());
		email.push(_createSentEmail());
		utilService.saveToStorage(SENT_KEY, email);
	}
	return email;
}

function _createEmptyEmail(){
	return {
		id:null,
		subject:null,
		body:null,
		isRead: false,
		sentAt: Date.now(),
		sentBy: loggedinUser,
		to: null
	}
}

function _createSentEmail(subject, body, to) {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isRead: false,
		sentAt: Date.now(),
		sentBy: loggedinUser,
		to: null
	}
}


// returns a promise
function query(entityType) {
	return storageService.query(entityType)
}

// remove item from model and storage
function remove(entityType, entityId) {
	return storageService.remove(entityType, entityId)
}

// returns a promise
function get(entityType, entityId) {
	return storageService.get(entityType, entityId)
}

// saves new item or updates existing item
function save(entityType, newEntity) {
	if (newEntity.id) return storageService.put(entityType, newEntity)
	else return storageService.post(entityType, newEntity)
}

function saveEmails(emails) {
	return storageService.post(EMAILS_KEY, emails)
}

function saveSentEmails(emails) {
	return storageService.post(SENT_KEY, emails)
}

// const criteria = {
// 	status: { inbox: false, sent: false, trash: false, draft: true },
// 	txt: 'puki',
// 	isRead: false,
// 	isStarred: false,
// 	lables: ['important'],
// }
