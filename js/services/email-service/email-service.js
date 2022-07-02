import {appService} from '../main-app-service/main-app-service.js'
import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'

const EMAILS_KEY = 'inbox'
const SENT_KEY = 'sent'
const TRASH_KEY = 'trash'
const STARRED_KEY = 'starred'
const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
}
const gSentMails = [
	{
		id: '001',
		subject: 'War and Peace',
		isUnread: true,
		sentAt: Date.now(),
		to: 'Tolstoy@gmail.com',
		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing nulla ligulamperdiet nibh. Aliquam phancur, neque mtincidunt sagittis ipsum vitae vulputate. Mauris blasellus d',
		sentBy: ' loggedinUser',
		isStarred: false,
		status: 'sent',
		isSelected: false,
	},
	// {
	// 	id: 005,
	// 	subject: 'i love to love',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'momo@gmail.com',
	// 	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cralandit. In pellentesque nibh tellus, vitae malesuada erat posuere quis. Praesenm libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	sentBy: ' loggedinUser',
	// 	isStarred: false,
	// 	status: 'sent',
	// 	isSelected: false,
	// },
	// {
	// 	id: 002,
	// 	subject: 'folks, it’s good',mentum at, iaculis varius ipsum. Astibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'Napoleon@gmail.com',
	// 	sentBy: ' loggedinUser',
	// 	isStarred: false,
	// 	status: 'sent',
	// 	isSelected: false,
	// },
	// {
	// 	id: 003,
	// 	subject: 'i love to love',
	// 	isUnread: true,
	// 	body: 'Lorem ipsum dolor sit amet, conseit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	sentAt: Date.now(),
	// 	to: ' Joe Bide@gmail.com',
	// 	sentBy: ' loggedinUser',
	// 	isStarred: false,
	// 	status: 'sent',
	// 	isSelected: false,
	// },
	// {
	// 	id: 004,
	// 	subject: 'i love to love',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	body: 'Lorem ipsum dolor sit amet, cola mi. Maecenas pulvin
	// 	sentBy: ' loggedinUser',
	// 	isStarred: false,
	// 	status: 'sent',
	// 	isSelected: false,
	// },
]
const gEmails = [
	{
		id: '011',
		subject: 'War and Peace',
		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus non nisl id blellentesque nibh tellus, vitae malesuada erat posuere quis. Praesent id fringilla mi. Maecenas pulvinar interdum blandit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
		isUnread: true,
		sentAt: Date.now(),
		to: 'user',
		sentBy: {
			email: 'Tolstoy@gmail.com',
			fullname: 'Tolstoy',
		},
		isStarred: false,
		status: 'inbox',
		isSelected: false,
	},
	// {
	// 	id: '101',
	// 	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus non nisl ellentesque nibh tellus, vitae malesuada erat posuere quis. Praesent id fringilla mi. Maecenas pulvinar interdum blandit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	subject: 'War and Peace',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'user',
	// 	sentBy: {
	// 		email: 'Tolstoy@gmail.com',
	// 		fullname: 'Tolstoy',
	// 	},
	// 	isStarred: false,
	// 	status: 'inbox',
	// 	isSelected: false,
	// },
	// {
	// 	id: '111',
	// 	subject: 'War and Peace',
	// 	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus non nisln pellentesque nibh tellus, vitae malesuada erat posuere quis. Praesent id fringilla mi. Maecenas pulvinar interdum blandit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'user',
	// 	sentBy: {
	// 		email: 'Tolstoy@gmail.com',
	// 		fullname: 'Tolstoy',
	// 	},
	// 	isStarred: false,
	// 	status: 'inbox',
	// 	isSelected: false,
	// },
	// {
	// 	id: '201',
	// 	subject: 'War and Peace',
	// 	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus non nin pellentesque nibh tellus, vitae malesuada erat posuere quis. Praesent id fringilla mi. Maecenas pulvinar interdum blandit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'user',
	// 	sentBy: {
	// 		email: 'Tolstoy@gmail.com',
	// 		fullname: 'Tolstoy',
	// 	},
	// 	isStarred: false,
	// 	status: 'inbox',
	// 	isSelected: false,
	// },
	// {
	// 	id:' 0451',
	// 	subject: 'War and Peace',
	// 	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus non nisl pellentesque nibh tellus, vitae malesuada erat posuere quis. Praesent id fringilla mi. Maecenas pulvinar interdum blandit. Sed lobortis vel elit non tincidunt. Nam libero turpis, venenatis a elementum at, iaculis varius ipsum. Aliquam erat volutpat.Suspendisse nulla ligula, mollis sit amet vulputate eu, dapibus nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras faucibus cursus sapien. Maecenas facilisis felis non quam consectetur egestas. Aliquam eget turpis ex. Curabitur vitae tellus tortor. Ut ac erat mi.Cras consequat efficitur euismod. Aenean accumsan, massa eu molestie congue, felis nunc elementum sapien, id vestibulum ex libero a nunc. Aliquam et imperdiet nibh. Aliquam pharetra malesuada est, dictum fermentum enim ultricies non. Integer erat arcu, rhoncus vel commodo in, aliquam quis mi. In nec egestas odio. Proin vulputate, ipsum vel lacinia pulvinar, neque mauris porta sem, nec sodales tortor massa et nulla.Suspendisse volutpat lacus nec leo volutpat ullamcorper. Aliquam cursus nibh vel dui suscipit, vitae eleifend quam commodo. Cras efficitur imperdiet hendrerit. Pellentesque tincidunt sagittis ipsum vitae vulputate. Mauris blandit blandit enim nec posuere. Morbi at lacinia ex, eget aliquam ipsum. Morbi nisl purus, dignissim sit amet lectus nec, malesuada aliquam tellus. Ut ultricies eleifend erat, a ultrices ipsum egestas vitae. Quisque laoreet pulvinar aliquet. Nullam elementum luctus massa eget efficitur. Cras tempor dignissim lacus, quis gravida sapien interdum et. Suspendisse tristique laoreet facilisis. Etiam non blandit ante. Aliquam efficitur ligula risus, ut tempor ipsum facilisis a. Curabitur volutpat iaculis interdum.Maecenas vel porta magna. Etiam tristique, sapien sed lobortis finibus, risus mi interdum urna, sit amet ullamcorper massa tellus sit amet tellus. Integer et vulputate velit. Sed lacinia, nisl in malesuada rhoncus, enim elit sagittis mi, at vulputate nunc velit ac neque. Ut lacinia sodales augue ut fermentum. Phasellus tempus est vitae vulputate mollis. Phasellus egestas tincidunt enim id rutrum. Sed venenatis massa tellus, quis faucibus tellus accumsan in. Phasellus tristique enim vel lectus fermentum faucibus. Aliquam bibendum ultricies velit id bibendum. Quisque suscipit, justo ac gravida imperdiet, sem purus rhoncus magna, in vestibulum sapien mauris non lectus. Cras id',
	// 	isUnread: true,
	// 	sentAt: Date.now(),
	// 	to: 'user',
	// 	sentBy: {
	// 		email: 'Tolstoy@gmail.com',
	// 		fullname: 'Tolstoy',
	// 	},
	// 	isStarred: false,
	// 	status: 'inbox',
	// 	isSelected: false,
	// },
]

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

function _createTrash() {
	// const id = utilService.makeId()
	return {
		id: null,
		subject: 'im a trashy',
		body: 'dump me',
		isRead: false,
		sentAt: Date.now(),
		sentBy: {
			email: 'momo@gmail.com',
			fullname: 'momo',
		},

		isStarred: false,
		status: 'trash',
		isTrashed: true,
		isSelected: false,
	}
}

function composeEmail() {
	return _composeEmail()
}

function getNewEmail() {
	console.log('new:', _createSentEmail())
}

function _createStars() {
	let stars = utilService.loadFromStorage(STARRED_KEY) || []
	if (stars) {
		utilService.saveToStorage(STARRED_KEY, stars)
	}
}

function _createEmails() {
	let email = utilService.loadFromStorage(EMAILS_KEY)
	if (!email || !email.length) {
		email = []
		email.push(_createEmail())
		email.push(_createEmail())
		email.push(_createEmail())
		email.push(_createEmail())
		utilService.saveToStorage(EMAILS_KEY, gEmails)
	}
	return gEmails
}

function _createSentEmails() {
	let email = utilService.loadFromStorage(SENT_KEY) || {}

	if (!email || !email.length) {
		email = []
		email.push(_createSentEmail())
		email.push(_createSentEmail())
		email.push(_createSentEmail())
		email.push(_createSentEmail())
		utilService.saveToStorage(SENT_KEY, gSentMails)
		return gSentMails
	}
}

function createTrash() {
	let emails = utilService.loadFromStorage(TRASH_KEY) || {}
	if (!emails || !emails.length) {
		emails = []
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		emails.push(_createTrash())
		utilService.saveToStorage(TRASH_KEY, emails)
	}
}

function _createEmail(
	subject = 'Miss you!',
	body = 'Would love to catch up sometimes!',
	to = 'momo@momo.com'
) {
	const id = utilService.makeId()
	return {
		id,
		subject,
		body,
		isUnread: true,
		sentAt: Date.now(),
		sentBy: {
			email: to,
			fullname: 'momo',
		},
		to,
		isStarred: false,
		status: 'inbox',
		isSelected: false,
	}
}

function _composeEmail() {
	return {
		id: null,
		subject: null,
		body: null,
		isRead: false,
		sentAt: Date.now(),
		sentBy: loggedinUser,
		to: null,
		isStarred: false,
		status: 'draft',
		isSelected: false,
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
		isStarred: false,
		status: 'sent',
		isSelected: false,
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
