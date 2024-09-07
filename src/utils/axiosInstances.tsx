import { whichSide } from '@/utils/functions'

import { Context } from '@/types'
import { environment } from '@/types/environment'

import axios from 'axios'

export const userInstance = axios.create({
    baseURL:
        whichSide() === Context.enum.SERVER
            ? environment.USER_BASE_URL
            : environment.NEXT_PUBLIC_USER_BASE_URL,
    timeout: 10_000,
})

export const articleInstance = axios.create({
    baseURL:
        whichSide() === Context.enum.SERVER
            ? environment.ARTICLE_BASE_URL
            : environment.NEXT_PUBLIC_ARTICLE_BASE_URL,
    timeout: 10_000,
})

export const transactionInstance = axios.create({
    baseURL:
        whichSide() === Context.enum.SERVER
            ? environment.TRANSACTION_BASE_URL
            : environment.NEXT_PUBLIC_TRANSACTION_BASE_URL,
    timeout: 10_000,
})

export const instantMsgInstance = axios.create({
    baseURL:
        whichSide() === Context.enum.SERVER
            ? environment.INSTANT_MESSAGE_BASE_URL
            : environment.NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL,
    timeout: 10_000,
})
