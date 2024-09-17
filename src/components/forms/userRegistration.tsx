'use client'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
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

import { getAddressSuggestions } from '@/utils/apiCalls/address-suggestions'

import type { UserRegistration } from '@/types/formValidations/userRegistration'
import { userRegistrationSchema } from '@/types/formValidations/userRegistration'

import { Button } from '../shadcn/ui/button'
import { Input } from '../shadcn/ui/input'
import { cn } from '../shadcn/utils'
import { useDebouncedCallback } from '@mantine/hooks'
import axios from 'axios'
import { ChevronsUpDown } from 'lucide-react'

type AddressSuggestion = {
    label: string
    context: string
}

/**
 * RegistrationForm component for user registration.
 *
 * This component renders a form for user onboarding.
 * @returns {React.JSX.Element} The rendered registration form
 */
export const RegistrationForm = (): React.JSX.Element => {
    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            pseudo: 'Johny',
            avatarUrl: 'https://placehold.co/100x100',
            addressInput: '',
            addressObject: {
                street: '',
                city: '',
                postcode: 0,
                citycode: 0,
                floor: 0,
                extra: '',
                geopoints: {
                    type: '',
                    coordinates: [],
                },
            },
        },
    })

    const [addressSuggestions, setAddressSuggestions] = useState<
        AddressSuggestion[]
    >([])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            console.log({ input })

            try {
                const addresses = await getAddressSuggestions(input)
                console.log(addresses)

                return addresses
            } catch (error) {
                console.error('Error fetching address suggestions:', error)
                return []
            }
        },
        500,
    )

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

                {/** User Address */}
                <FormField
                    control={form.control}
                    name='addressInput'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>{'Address'}</FormLabel>
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
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value
                                                ? (addressSuggestions.find(
                                                      (address) =>
                                                          address.label ===
                                                          field.value,
                                                  )?.label ?? field.value)
                                                : 'Select address'}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className='w-[300px]'>
                                    <Command>
                                        <CommandInput
                                            placeholder='Type address…'
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                fetchAddressSuggestions(value)
                                            }}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {'No address found.'}
                                            </CommandEmpty>
                                            {!!isLoading && (
                                                <div className='p-2 text-sm'>
                                                    {'Loading…'}
                                                </div>
                                            )}
                                            <CommandGroup>
                                                {!isLoading &&
                                                    addressSuggestions.map(
                                                        (address) => (
                                                            <CommandItem
                                                                key={
                                                                    address.label
                                                                }
                                                                value={
                                                                    address.label
                                                                }
                                                                onSelect={() => {
                                                                    field.onChange(
                                                                        address.label,
                                                                    )
                                                                    setIsPopoverOpen(
                                                                        false,
                                                                    )
                                                                }}
                                                            >
                                                                {address.label}
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
