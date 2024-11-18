'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/shadcn/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/shadcn/ui/command'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'

import { useTransactionStore } from '@/stores/transaction'
import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/addressSuggestions'
import type { PreTransactionParams } from '@/utils/apiCalls/transaction/mutations'
import { useCreatePreTransaction } from '@/utils/apiCalls/transaction/mutations'
import { getUserById } from '@/utils/apiCalls/user'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { EmailTypeSchema, NotificationType } from '@/types'
import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { Address } from '@/types/article'
import { addressObjectEmpty } from '@/types/formValidations/adCreation'
import type { PreTransactionFormData } from '@/types/formValidations/preTransaction'
import { preTransactionSchema } from '@/types/formValidations/preTransaction'
import { TransactionStatesSchema } from '@/types/transaction/actions'

import { cn } from '../shadcn/utils'
import { useAuth } from '@clerk/nextjs'
import { useDebouncedCallback } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, CircleX, House, HousePlus } from 'lucide-react'

const PreTransactionForm: React.FC = () => {
    const [newAddressOpen, setNewAddressOpen] = useState(false)
    // Extra CSS
    const addressInputClass = 'w-full sm:w-[420px]'

    const { mutateAsync: createPreTransaction, isPending } =
        useCreatePreTransaction()

    const {
        mutateAsync: sendEmail,
        isSuccess: emailSent,
        isPending: sendingEmail,
    } = useSendEmail()

    const { getToken, userId: userIdA } = useAuth()

    const userB = useTransactionStore((state) => state.userB)
    const articleB = useTransactionStore((state) => state.articleB)
    const setRequestSent = useTransactionStore((state) => state.setRequestSent)

    // React query to get article owner data
    const { data: userA } = useQuery({
        queryKey: ['user', userIdA],
        queryFn: () => getUserById(userIdA),
        enabled: !!userIdA,
    })

    const setOpenRequestDialog = useTransactionStore(
        (state) => state.setOpenRequestDialog,
    )

    const form = useForm<PreTransactionFormData>({
        resolver: zodResolver(preTransactionSchema),
        defaultValues: {
            savedUserAddressLabel: undefined,
            addressInput: '',
            newAddressObject: addressObjectEmpty,
            registeredAddressObject: addressObjectEmpty,
        },
    })

    const {
        reset,
        control,
        watch,
        setValue,
        handleSubmit,
        register,
        setError,
    } = form

    const { fields, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    const savedUserAddressLabelWatch = watch('savedUserAddressLabel')
    const addressInputWatch = watch('addressInput')
    const newAddressObjectWatch = watch('newAddressObject')

    /**
     * Fetches address suggestions based on user input.
     *
     * This function is debounced to prevent excessive API calls. It only triggers
     * when the input length is greater than 3 characters.
     * @param {string} input - The user's input for address search
     * @returns {Promise<AddressSuggestion[]>} A promise that resolves to an array of address suggestions
     */
    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            if (input.length > 3) {
                const addresses = await getAddressSuggestions(input)

                let index = 0
                if (addresses)
                    for (const address of addresses) {
                        update(index, address)
                        index++
                    }

                if (!addresses) {
                    return []
                }
            }

            return []
        },
        500,
    )

    /**
     * Handles the form submission.
     * @param {ArticleFormData} data - The form data to be submitted
     * @returns {Promise<void>}
     */
    const onSubmit = async (data: PreTransactionFormData): Promise<void> => {
        if (
            !data.newAddressObject.label &&
            !data.registeredAddressObject.label
        ) {
            setError('savedUserAddressLabel', {
                message: 'Tu dois choisir une adresse',
            })
            setError('addressInput', {
                message: 'Tu dois choisir une adresse',
            })

            return
        }

        const JWT = await getToken({ template: 'trocup-1' })

        if (!JWT || !userA || !userB.email || !articleB) {
            return
        }

        const transactionData: PreTransactionParams = {
            data: {
                userA: userA.id,
                userB: userB.id,
                articleB,
                ...(data.registeredAddressObject.label && {
                    address: data.registeredAddressObject,
                }),
                ...(data.newAddressObject.label && {
                    address: data.newAddressObject,
                }),
                state: TransactionStatesSchema.enum.PENDING,
            },
            JWT,
        }

        const { id: transactionID } = await createPreTransaction(
            transactionData,
            {
                onSuccess: () => {
                    notify({
                        message: userMessages.requestSent.type.SUCCESS,
                        type: NotificationType.enum.SUCCESS,
                    })
                    setOpenRequestDialog(false)
                },
                onError: () => {
                    notify({
                        message: userMessages.requestSent.type.ERROR,
                        type: NotificationType.enum.ERROR,
                    })
                    setOpenRequestDialog(false)
                },
            },
        )

        /** If the pre-transaction was successful, we send a confirmation email for the userB to confirm the transaction. */
        await sendEmail(
            {
                contentData: {
                    userA: {
                        pseudo: userA.pseudo,
                        avatarUrl: userA.avatarUrl,
                    },
                    userB,
                    articleB,
                    transactionID,
                },
                emailType: EmailTypeSchema.enum.TRANSACTION_REQUEST,
            },

            {
                onSuccess: () => {
                    notify({
                        message: userMessages.requestSent.type.SUCCESS,
                        type: NotificationType.enum.SUCCESS,
                    })

                    setRequestSent(true)

                    // Reset the form
                    reset()
                },
                onError: () => {
                    notify({
                        message: userMessages.requestSent.type.ERROR,
                        type: NotificationType.enum.ERROR,
                    })
                },
            },
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(onSubmit)()
                }}
                className='mx-auto max-w-4xl space-y-8 rounded-lg bg-white p-6 shadow-md'
            >
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Saved user addresses Select */}
                    {!!userA &&
                        !!userA.addresses &&
                        userA.addresses.length > 0 && (
                            <div className='flex justify-center'>
                                <FormField
                                    control={control}
                                    name='savedUserAddressLabel'
                                    render={({ field }) => (
                                        <FormItem className={addressInputClass}>
                                            <FormLabel>
                                                {
                                                    'Sélectionne une adresse enregistrée\u00A0: '
                                                }
                                            </FormLabel>
                                            <div className='flex items-center'>
                                                <Select
                                                    onValueChange={(value) => {
                                                        setValue(
                                                            'newAddressObject',
                                                            addressObjectEmpty,
                                                        )

                                                        const parsedValue =
                                                            JSON.parse(
                                                                value,
                                                            ) as Address

                                                        setValue(
                                                            'registeredAddressObject',
                                                            parsedValue,
                                                        )

                                                        field.onChange(value)
                                                    }}
                                                    value={field.value ?? ''}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className={cn(
                                                                addressInputClass,
                                                                'justify-between',
                                                            )}
                                                        >
                                                            <SelectValue
                                                                placeholder={
                                                                    <House className='opacity-50' />
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {userA.addresses?.map(
                                                            (address) => (
                                                                <SelectItem
                                                                    key={
                                                                        address.label
                                                                    }
                                                                    value={JSON.stringify(
                                                                        address,
                                                                    )}
                                                                >
                                                                    {
                                                                        address.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {!!savedUserAddressLabelWatch && (
                                                    <CircleX
                                                        className='ml-2 h-6 w-6 shrink-0 cursor-pointer text-red-500'
                                                        onClick={() => {
                                                            setValue(
                                                                'savedUserAddressLabel',
                                                                undefined,
                                                            )

                                                            setValue(
                                                                'registeredAddressObject',
                                                                addressObjectEmpty,
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    {/* Article Address Input */}
                    <div className='mt-[9px] flex justify-center'>
                        <FormField
                            control={control}
                            name='addressInput'
                            render={({ field }) => (
                                <FormItem
                                    className={`flex flex-col ${addressInputClass} `}
                                >
                                    <FormLabel className='w-full'>
                                        {!!userA?.addresses &&
                                        userA.addresses.length > 0
                                            ? 'Ou rajoute une nouvelle adresse :'
                                            : 'Rajoute une nouvelle adresse :'}
                                    </FormLabel>
                                    <Popover
                                        open={newAddressOpen}
                                        onOpenChange={setNewAddressOpen}
                                    >
                                        <div className='flex items-center'>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        aria-expanded={
                                                            newAddressOpen
                                                        }
                                                        className={cn(
                                                            addressInputClass,
                                                            'justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                        onClick={() => {
                                                            if (!newAddressOpen)
                                                                setNewAddressOpen(
                                                                    true,
                                                                )
                                                        }}
                                                    >
                                                        {!newAddressObjectWatch.label && (
                                                            <HousePlus className='opacity-[0.8]' />
                                                        )}

                                                        {!!newAddressObjectWatch.label && (
                                                            <>
                                                                {
                                                                    newAddressObjectWatch.label
                                                                }
                                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                            </>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            {!!newAddressObjectWatch.label && (
                                                <CircleX
                                                    className='ml-2 h-6 w-6 shrink-0 cursor-pointer text-red-500'
                                                    onClick={() => {
                                                        setValue(
                                                            'newAddressObject',
                                                            addressObjectEmpty,
                                                        )
                                                        setNewAddressOpen(false)
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <PopoverContent className='w-[300px] p-0'>
                                            <Command>
                                                <CommandInput
                                                    value={field.value}
                                                    placeholder='Cherche une nouvelle adresse'
                                                    onValueChange={(value) => {
                                                        const sanitizedValue =
                                                            value.replaceAll(
                                                                ',',
                                                                '',
                                                            )

                                                        field.onChange(
                                                            sanitizedValue,
                                                        )

                                                        fetchAddressSuggestions(
                                                            sanitizedValue,
                                                        )
                                                    }}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        {addressInputWatch &&
                                                        addressInputWatch.length >
                                                            3 ? (
                                                            'Aucune adresse trouvée'
                                                        ) : (
                                                            <div className='flex justify-center'>
                                                                <HousePlus />
                                                            </div>
                                                        )}
                                                    </CommandEmpty>

                                                    <CommandGroup>
                                                        {fields.map(
                                                            (
                                                                suggestion,
                                                                suggestionIndex,
                                                            ) => (
                                                                <CommandItem
                                                                    className='cursor-pointer'
                                                                    key={
                                                                        suggestion.id
                                                                    }
                                                                    value={
                                                                        suggestion
                                                                            .properties
                                                                            .label
                                                                    }
                                                                    onSelect={() => {
                                                                        setValue(
                                                                            'newAddressObject',
                                                                            {
                                                                                ...suggestion.properties,
                                                                                label: suggestion
                                                                                    .properties
                                                                                    .label,
                                                                            },
                                                                        )
                                                                        setNewAddressOpen(
                                                                            false,
                                                                        )

                                                                        setValue(
                                                                            'savedUserAddressLabel',
                                                                            undefined,
                                                                        )

                                                                        setValue(
                                                                            'registeredAddressObject',
                                                                            addressObjectEmpty,
                                                                        )
                                                                    }}
                                                                >
                                                                    <span
                                                                        {...register(
                                                                            `addressSuggestions.${suggestionIndex}.properties.label`,
                                                                        )}
                                                                    >
                                                                        {
                                                                            suggestion
                                                                                .properties
                                                                                .label
                                                                        }
                                                                    </span>
                                                                </CommandItem>
                                                            ),
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            onClick={() => {
                                setOpenRequestDialog(false)
                            }}
                            className='rounded-lg bg-gray-400 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:bg-gray-500'
                            aria-label='cancel transaction request'
                        >
                            {'Annuler'}
                        </Button>

                        {/* Button to send the transaction request */}
                        <Button
                            disabled={isPending}
                            type='submit'
                            className='rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700'
                            aria-label='transaction request'
                        >
                            {!!sendingEmail && 'Envoi en cours…'}
                            {!sendingEmail && emailSent
                                ? 'Demande envoyée'
                                : 'Envoyer la demande'}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default PreTransactionForm
