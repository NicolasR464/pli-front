'use client'
import React, { useEffect, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

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
} from '@/components/shadcn/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/ui/popover'

import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/addressSuggestions'
import { useCreateUser } from '@/utils/apiCalls/user/mutations'
import { pagePaths } from '@/utils/constants'
import { getRandomAvatarUrl, getRandomUserPseudonym } from '@/utils/functions'

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { UserRegistration } from '@/types/formValidations/userRegistration'
import { userRegistrationSchema } from '@/types/formValidations/userRegistration'

import { Button } from '../shadcn/ui/button'
import { Input } from '../shadcn/ui/input'
import { cn } from '../shadcn/utils'
import { useAuth } from '@clerk/nextjs'
import { useDebouncedCallback } from '@mantine/hooks'
import { Avatar } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import { ChevronsUpDown } from 'lucide-react'

/**
 * RegistrationForm component for user registration.
 *
 * This component renders a form for user onboarding. It is asking for the user's address, an avatar,
 * and a pseudonym.
 * @returns {React.JSX.Element} The rendered registration form
 */
export const RegistrationForm = (): React.JSX.Element => {
    const { mutateAsync, isPending } = useCreateUser()
    const [imageLoaded, setImageLoaded] = useState(false)
    const { getToken } = useAuth()

    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            avatarUrl: '',
            addressInput: '',
            addressObject: {},
        },
    })

    const { control, watch, setValue, handleSubmit, register } = form

    const { fields, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    const [open, setOpen] = useState(false)

    // Set random avatar and pseudo on mount
    useEffect(() => {
        setValue('avatarUrl', getRandomAvatarUrl())
        setValue('pseudo', getRandomUserPseudonym())
    }, [setValue])

    const addressObject = watch('addressObject')
    const avatarUrl = watch('avatarUrl')

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
     * Handles form submission.
     *
     * This function is called when the form is submitted. It processes the form data,
     * gets a JWT token, prepares the data to send, and makes an API call to create a new user.
     * @param {UserRegistration} data - The form data
     * @returns {Promise<void>}
     */
    const onSubmit = async (data: UserRegistration): Promise<void> => {
        const { pseudo } = data

        const JWT = await getToken({ template: 'trocup-1' })

        if (!JWT) redirect(`${pagePaths.HOME}?onboardingSuccess=false`)

        const dataToSend = {
            avatarUrl,
            pseudo,
            address: addressObject,
            createdAt: new Date().toISOString(),
        }

        await mutateAsync(
            {
                data: dataToSend,
                JWT,
            },
            {
                onSuccess: () =>
                    redirect(`${pagePaths.HOME}?onboardingSuccess=true`),
                onError: (error) => {
                    // TODO: Implement proper error handling
                    // - For pseudo already taken: autofocus on pseudo input with error message
                    // - For stale JWT: redirect to login
                    // - For email already used: show appropriate error message
                    console.error('Error creating user:', error)
                    redirect('/?onboardingSuccess=false')
                },
            },
        )
    }

    /**
     * Handles form validation errors.
     *
     * This function is called when form validation fails. It logs the validation errors
     * to the console for debugging purposes.
     * @param {FieldErrors<UserRegistration>} errors - The validation errors object
     * @returns {void}
     */
    const onError = (errors: FieldErrors<UserRegistration>): void => {
        console.log('Validation Errors:', errors)
        // TODO: Handle the errors, maybe show an error message to the user@
    }

    return (
        <Form {...form}>
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit, onError)}
                className='space-y-8'
            >
                {/** User Pseudo */}
                <Controller
                    control={control}
                    name='pseudo'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormItem>
                            <Label>{'Pseudo'}</Label>
                            <FormControl>
                                <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/** User Avatar URL */}
                <Controller
                    control={control}
                    name='avatarUrl'
                    render={({ field: { onChange, onBlur } }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type='hidden'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/** Avatar Image */}
                {!!avatarUrl && (
                    <Avatar>
                        <Image
                            src={avatarUrl}
                            alt='Avatar'
                            width={100}
                            height={100}
                            priority
                            onLoad={() => {
                                setImageLoaded(true)
                            }}
                        />
                    </Avatar>
                )}

                {/** Change Avatar Button */}
                <Button
                    disabled={!imageLoaded}
                    type='button'
                    onClick={() => {
                        setValue('avatarUrl', getRandomAvatarUrl())
                    }}
                >
                    {'Change ton avatar'}
                </Button>

                {/** User Address */}
                <FormField
                    control={control}
                    name='addressInput'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>{'Adresse'}</FormLabel>

                            <Popover
                                open={open}
                                onOpenChange={setOpen}
                            >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            aria-expanded={open}
                                            className={cn(
                                                'w-[500px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                            onClick={() => {
                                                setOpen(true)
                                            }}
                                        >
                                            {!!field.value &&
                                                !addressObject &&
                                                field.value}
                                            {!!addressObject &&
                                                addressObject.label}
                                            {!field.value &&
                                                !addressObject &&
                                                'Sélectionne ton adresse'}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className='w-[300px] p-0'>
                                    <Command>
                                        <CommandInput
                                            placeholder='Cherche ton adresse'
                                            onValueChange={(value) => {
                                                const sanitizedValue =
                                                    value.replaceAll(',', '')

                                                field.onChange(sanitizedValue)

                                                fetchAddressSuggestions(
                                                    sanitizedValue,
                                                )
                                            }}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {'Aucune adresse trouvée'}
                                            </CommandEmpty>

                                            <CommandGroup>
                                                {fields.map(
                                                    (suggestion, index) => (
                                                        <CommandItem
                                                            className='cursor-pointer'
                                                            key={suggestion.id}
                                                            value={
                                                                suggestion
                                                                    .properties
                                                                    .label
                                                            }
                                                            onSelect={() => {
                                                                setValue(
                                                                    'addressObject',
                                                                    {
                                                                        ...suggestion.properties,
                                                                        label: suggestion
                                                                            .properties
                                                                            .label,
                                                                    },
                                                                )
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <span
                                                                {...register(
                                                                    `addressSuggestions.${index}.properties.label`,
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

                {/** Submit Button */}
                <Button
                    type='submit'
                    disabled={!!isPending}
                >
                    {isPending ? 'Enregistrement…' : 'Sauvegarder'}
                </Button>
            </form>
        </Form>
    )
}
