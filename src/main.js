// loaded at runner/index.html
import { showWelcome, showLoginForm, unconfirmedEmail, goodAccount, wrongPassword, noAccount, askForCode, receiveCode, resetPassword, prepareToReceiveResetPasswordCode, prepareToCreateNewPassword } from './change-DOM.js'
import informEmail from './inform-email.js'
import login from './login.js'
import createCredentials from './create-credentials.js'
import confirmCode from './confirm-code.js'
import requestLoggedExperience from './request-logged-experience.js'
import claimEmailOwnership from './claim-email-ownership.js'
import verifyResetPasswordCode from './verify-reset-password-code.js'
import verifyPassword from './verify-password.js'
import processPassword from './process-password.js'
import database from './database'
import impersonate from './impersonate'

let userData
let chapters
let userId

window.Auth = {
    userData,
    chapters,
    userId,
    showWelcome, showLoginForm, unconfirmedEmail, goodAccount, wrongPassword, noAccount, askForCode, receiveCode, resetPassword, prepareToReceiveResetPasswordCode, prepareToCreateNewPassword, // DOM changing functions
    informEmail,
    login,
    createCredentials,
    confirmCode,
    requestLoggedExperience,
    claimEmailOwnership,
    verifyResetPasswordCode,
    verifyPassword,
    processPassword,
    database,
    impersonate
}