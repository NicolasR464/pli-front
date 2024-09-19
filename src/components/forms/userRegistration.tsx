'use client'
import React, { useCallback, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
    FormDescription,
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

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { UserRegistration } from '@/types/formValidations/userRegistration'
import { userRegistrationSchema } from '@/types/formValidations/userRegistration'

import { Button } from '../shadcn/ui/button'
import { Input } from '../shadcn/ui/input'
import { cn } from '../shadcn/utils'
import { useDebouncedCallback } from '@mantine/hooks'
import { ChevronsUpDown } from 'lucide-react'

/**
 * RegistrationForm component for user registration.
 *
 * This component renders a form for user onboarding.
 * @returns {React.JSX.Element} The rendered registration form
 */
export const RegistrationForm = (): React.JSX.Element => {
    const { control, watch, setValue, register } = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
    })

    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
    })

    const { fields, replace, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    const [open, setOpen] = useState(false)

    const addressInput = watch('addressInput')
    const addressObject = watch('addressObject')

    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            console.log({ input })
            console.log(input.length)

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

                    console.log(addresses)

                    // if (addresses) setValue('addressSuggestions', addresses)
                    // if (addresses) update(addresses)
                } catch (error) {
                    console.error('Error fetching address suggestions:', error)
                    return []
                }
            }

            return []
        },
        500,
    )

    const addressInputWatch = watch('addressInput')
    const addressSuggestionsWatch = watch('addressSuggestions')

    return (
        <Form {...form}>
            <form className='space-y-8'>
                {/** User Pseudo */}
                <FormField
                    control={form.control}
                    name='pseudo'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{'Pseudo'}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/** User Avatar */}
                <FormField
                    control={form.control}
                    name='avatarUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type='hidden'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                                            onClick={() => setOpen(true)}
                                        >
                                            {!!field.value &&
                                                !addressObject &&
                                                field.value}
                                            {!!addressObject &&
                                                `${addressObject.housenumber} ${addressObject.street}, ${addressObject.postcode} ${addressObject.city}`}
                                            {!field.value &&
                                                !!addressObject &&
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
