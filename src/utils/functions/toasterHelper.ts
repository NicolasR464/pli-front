import toast from 'react-hot-toast'

import { NotificationType } from '@/types'

import { userMessages } from '../constants'

type UserMessageKeys = keyof typeof userMessages

/**
 * Displays a toast notification with the specified message and type.
 *
 * This function uses the `react-hot-toast` library to display a toast notification.
 * @param {object} options - An object containing the message and type of the notification.
 * @param {string} options.message - The message to be displayed in the toast notification.
 * @param {NotificationType} options.type - The type of the notification (success, error, etc.).
 * @returns {void}
 */
const notify = ({
    message,
    type = NotificationType.enum.INFO,
}: {
    message: string
    type?: NotificationType
}): void => {
    switch (type) {
        case NotificationType.enum.SUCCESS: {
            toast.success(message)
            break
        }
        case NotificationType.enum.ERROR: {
            toast.error(message)
            break
        }
        default: {
            toast(message)
            break
        }
    }
}

/**
 * Function to get the user message key from the label
 * @param {string} label - The label of the user message
 * @returns {UserMessageKeys | undefined} The user message key
 */
const getUserMessageKeyFromLabel = (
    label: string,
): UserMessageKeys | undefined => {
    return Object.entries(userMessages).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value.label === label,
    )?.[0] as UserMessageKeys | undefined
}

/**
 * Function to get the search params and notify the user with a toaster
 * @param {Array<{key: string, value: string | undefined}>} paramsArray - Array containing key-value pairs of URL search parameters
 */
export const getParamsAndNotify = (
    paramsArray: {
        key: string
        value: string | undefined
    }[],
): void => {
    for (const param of paramsArray) {
        const matchingMessageKey = getUserMessageKeyFromLabel(param.key)

        if (matchingMessageKey) {
            notify({
                message:
                    userMessages[matchingMessageKey].type[
                        param.value?.toUpperCase() as keyof (typeof userMessages)[typeof matchingMessageKey]['type']
                    ],
                type: param.value?.toUpperCase() as keyof (typeof userMessages)[typeof matchingMessageKey]['type'],
            })
        }
    }
}
