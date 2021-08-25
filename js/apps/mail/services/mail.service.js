import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const mailService = {
    query
}

const KEY = 'mailDB'

let gMails = [{
    id: 'e101',
    from: 'Morty Smith',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: Date.now(),
    to: 'momo@momo.com'
}]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    return Promise.resolve(gMails)
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