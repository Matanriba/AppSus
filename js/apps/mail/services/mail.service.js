import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const mailService = {
    query,
    getMailById,
    setMailAsRead
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

let gMails = storageService.loadFromStorage(KEY) || [{
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
        isRead: true,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        status: 'inbox',
        isStarred: false
    }
]

function query(criteria) {
    const { status, txt, isRead } = criteria
    console.log('isRead: ', isRead)
    let mailsToDisplay = gMails.filter(mail => {
        return mail.status === status &&
            (mail.body.toLowerCase().includes(txt.toLowerCase()) ||
                mail.subject.toLowerCase().includes(txt.toLowerCase()) ||
                mail.from.toLowerCase().includes(txt.toLowerCase()))
    })
    if (isRead === 'read') mailsToDisplay = mailsToDisplay.filter(mail => mail.isRead)
    else if (isRead === 'unread') mailsToDisplay = mailsToDisplay.filter(mail => !mail.isRead)
    return Promise.resolve(mailsToDisplay)

}

function setMailAsRead(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId)
    gMails[mailIdx].isRead = true
    _saveMailsToStorage()
}

function _createMail(subject, body, to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to,
        status: 'sent'
    }
}

function addMail(mailToAdd) {
    const mail = _createMail(mailToAdd.subject, mailToAdd.body, mailToAdd.to)
    gMails.unshift(mail)
    _saveMailsToStorage()
    return Promise.resolve()
}

function getMailById(mailId) {
    const mail = gMails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails)
}