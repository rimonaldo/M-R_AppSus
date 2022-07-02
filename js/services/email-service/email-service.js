import { appService } from '../main-app-service/main-app-service.js'
import { utilService } from '../main-app-service/util-service.js'
import { storageService } from '../main-app-service/async-storage-service.js'


const EMAILS_KEY = 'inbox'
const SENT_KEY = 'sent'
const TRASH_KEY = 'trash'
const STARRED_KEY = 'starred'
const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
}
_createSentEmails()
_createEmails()
_createStars()
createTrash()

export const emailService = {
	EMAILS_KEY,
	SENT_KEY,
	TRASH_KEY,
	loggedinUser,

	getNextEemailId,
	getPrevEemailId,
	getNewEmail,
	query,
	get,
	remove,
	save,
	composeEmail,


}


function _createTrash(){
	// const id = utilService.makeId()
	return {
		id:null,
		subject:'im a trashy',
		body:'dump me',
		isRead: false,
		sentAt: Date.now(),
		sentBy: {
			email: 'momo@gmail.com',
			fullname: 'momo'
		},
		
		isStarred: false,
		status:'trash',
		isTrashed:true,
		isSelected:false,
		
		
		
	}
}

function composeEmail() {
	return  _composeEmail()
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

function _createSentEmails() {
	let email = utilService.loadFromStorage(SENT_KEY) || {}
	
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

function createTrash(){
	let emails = utilService.loadFromStorage(TRASH_KEY) || {}
	if (!emails || !emails.length) {
		emails = [];
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		utilService.saveToStorage(TRASH_KEY, emails);
	}
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
			fullname: 'momo'
		},
		to,
		isStarred: false,
		status:'inbox',
		isSelected:false,
		
	}
}

function _composeEmail(){
	return {
		id:null,
		subject:null,
		body:null,
		isRead: false,
		sentAt: Date.now(),
		sentBy: loggedinUser,
		to: null,
		isStarred:false,
		status:'draft',
		isSelected:false,
	}
}

function _createSentEmail(subject, body, to = null) {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isRead: false,
		sentAt: Date.now(),
		sentBy: loggedinUser,
		to,
		isStarred:false,
		status:'sent',
		isSelected:false,

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
