import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const mailService = {
    query,
    getMailById
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

let gMails = [{
        id: 'e101',
        from: 'Morty Smith',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        status: 'sent',
        isStarred: false

    },
    {
        id: 'e102',
        from: loggedinUser.fullname,
        subject: 'Yo!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        status: 'inbox',
        isStarred: false
    },
    {
        id: 'e103',
        from: 'Rick Sanchez',
        subject: 'Wubba Lubba Dub Dub!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        status: 'trash',
        isStarred: false
    },
    {
        id: 'e104',
        from: 'Beth Smith',
        subject: 'Holy Crap!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        status: 'inbox',
        isStarred: false
    }
]


function query(criteria) {
    const { status, txt } = criteria
    const mailsToDisplay = gMails.filter(mail => mail.status === status)
    return Promise.resolve(mailsToDisplay)
}

function _createMail(subject, body, to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to
    }
}

function getMailById(mailId) {
    const mail = gMails.findIndex(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function _saveCarsToStorage() {
    storageService.saveToStorage(KEY, gMails)
}