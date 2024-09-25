/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { useEffect, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Image from 'next/image'
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

import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/address-suggestions'
import { createUser } from '@/utils/apiCalls/user'
import { useCreateUser } from '@/utils/apiCalls/user/mutations'
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
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const { mutateAsync, isLoading } = useCreateUser()

    const { control, watch, setValue, register, handleSubmit } =
        useForm<UserRegistration>({
            resolver: zodResolver(userRegistrationSchema),
        })

    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            avatarUrl: '',
            addressInput: '',
            addressObject: {},
        },
    })

    const { fields, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    const [open, setOpen] = useState(false)

    // Set random avatar on mount
    useEffect(() => {
        setValue('avatarUrl', getRandomAvatarUrl())
        setValue('pseudo', getRandomUserPseudonym())
    }, [setValue])

    // Watch for form values
    // const addressInput = watch('addressInput')
    const addressObject = watch('addressObject')
    const pseudo = watch('pseudo')
    const avatarUrl = watch('avatarUrl')

    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            if (input.length > 3) {
                try {
                    const addresses = await getAddressSuggestions(input)
                    console.log(addresses)

                    let index = 0
                    if (addresses)
                        for (const address of addresses) {
                            update(index, address)
                            index++
                        }
                } catch (error) {
                    console.error('Error fetching address suggestions:', error)
                    return []
                }
            }

            return []
        },
        500,
    )

    const onSubmit = async (data: UserRegistration): Promise<void> => {
        console.log('🔥')

        console.log(data)

        const token = await getToken({ template: 'trocup-1' })
        console.log({ token })

        if (token)
            await createUserMutation.mutateAsync(token, {
                onSuccess: () => {
                    console.log('User created successfully')
                    // You can add additional logic here, like redirecting the user or showing a success message
                },
                onError: (error) => {
                    console.error('Error creating user:', error)
                    // Handle the error, maybe show an error message to the user
                },
            })
    }

    const onError = (errors: FieldErrors<UserRegistration>): void => {
        console.log('Validation Errors:', errors)
    }

    return (
        <Form {...form}>
            <form
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
                        />
                    </Avatar>
                )}
                <Button
                    type='button'
                    onClick={() => {
                        setValue('avatarUrl', getRandomAvatarUrl())
                    }}
                >
                    {'Change Avatar'}
                </Button>

                {/* {'addressSuggestionsWatch 👇'}
                <br />
                {JSON.stringify(addressSuggestionsWatch, undefined, 2)}
                <br />
                {JSON.stringify(fields, undefined, 2)}
                <br />
                {'🔥----------------------------------🔥'}
                <br />
                <br />
                {'addressObject 👇'}
                <br />
                {JSON.stringify(addressObject, undefined, 2)}
                <br />
                {'addressInputWatch 👇'}
                <br />
                {JSON.stringify(addressInputWatch, undefined, 2)} */}

                {/** User Address */}
                <FormField
                    control={form.control}
                    name='addressInput'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>{'Addresse'}</FormLabel>

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
                                                `${addressObject.housenumber} ${addressObject.street}, ${addressObject.postcode} ${addressObject.city}`}
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
                                                {'Aucune adresse trouvée.'}
                                            </CommandEmpty>

                                            <CommandGroup>
                                                {fields.map(
                                                    (suggestion, index) => (
                                                        <CommandItem
                                                            className='cursor-pointer'
                                                            key={suggestion.id}
                                                            value={
                                                                suggestion.label
                                                            }
                                                            onSelect={() => {
                                                                setValue(
                                                                    'addressObject',
                                                                    suggestion.properties,
                                                                )
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <span
                                                                {...register(
                                                                    `addressSuggestions.${index}.label`,
                                                                )}
                                                            >
                                                                {
                                                                    suggestion.label
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

                <Button
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting…' : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}
