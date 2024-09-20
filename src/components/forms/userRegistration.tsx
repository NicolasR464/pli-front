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
import { getRandomAvatarUrl } from '@/utils/functions'

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { UserRegistration } from '@/types/formValidations/userRegistration'
import { userRegistrationSchema } from '@/types/formValidations/userRegistration'

import { Button } from '../shadcn/ui/button'
import { Input } from '../shadcn/ui/input'
import { cn } from '../shadcn/utils'
import { useDebouncedCallback } from '@mantine/hooks'
import { Avatar } from '@radix-ui/react-avatar'
import { ChevronsUpDown } from 'lucide-react'

/**
 * RegistrationForm component for user registration.
 *
 * This component renders a form for user onboarding.
 * @returns {React.JSX.Element} The rendered registration form
 */
export const RegistrationForm = (): React.JSX.Element => {
    const { control, watch, setValue, register, handleSubmit } =
        useForm<UserRegistration>({
            resolver: zodResolver(userRegistrationSchema),
        })

    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            pseudo: '',
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
    }, [setValue])

    // Watch for form values
    // const addressInput = watch('addressInput')
    const addressObject = watch('addressObject')
    const pseudo = watch('pseudo')
    const avatarUrl = watch('avatarUrl')

    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            if (input.length >= 3) {
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

    const onSubmit = (data: UserRegistration) => {
        console.log('🔥')

        console.log(data)
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
                {JSON.stringify(pseudo, undefined, 2)}
                {/** User Pseudo */}
                <Controller
                    control={control}
                    name='pseudo'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormItem>
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
                <Avatar>
                    <Image
                        src={avatarUrl}
                        alt='Avatar'
                        width={100}
                        height={100}
                    />
                </Avatar>
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

                <Button type='submit'>{'Submit'}</Button>
            </form>
        </Form>
    )
}
