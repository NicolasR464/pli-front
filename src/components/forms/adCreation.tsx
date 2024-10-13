/* eslint-disable react/jsx-handler-names */
'use client'

import React, { useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/shadcn/ui/button'
import { Calendar } from '@/components/shadcn/ui/calendar'
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
    FormMessage,
} from '@/components/shadcn/ui/form'
import { Input, InputNumber } from '@/components/shadcn/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { cn } from '@/components/shadcn/utils'

import { useUserStore } from '@/stores/user'
import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/addressSuggestions'
import { translations } from '@/utils/constants'

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import { DeliveryTypeSchema, StateSchema, StatusSchema } from '@/types/article'
import { categories, CategoryEnumSchema } from '@/types/article/categories'
import type { ArticleFormData } from '@/types/formValidations/adCreation'
import { ArticleFormDataSchema } from '@/types/formValidations/adCreation'

import { useDebouncedCallback } from '@mantine/hooks'
import { Label } from '@radix-ui/react-label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import {
    Calendar as CalendarIcon,
    ChevronsUpDown,
    CircleX,
    House,
} from 'lucide-react'

const ArticleForm = (): React.JSX.Element => {
    const [open, setOpen] = useState(false)

    const { address: storedAddresses } = useUserStore((state) => state.user)

    console.log(storedAddresses)

    const form = useForm<ArticleFormData>({
        resolver: zodResolver(ArticleFormDataSchema),
        defaultValues: {
            adTitle: '',
            brand: '',
            model: '',
            description: '',
            manufactureDate: undefined,
            purchaseDate: undefined,
            state: undefined,
            status: 'AVAILABLE',
            category: undefined,
            subCategory: undefined,
            size: undefined,
            deliveryType: undefined,
            dimensions: {
                length: 0,
                width: 0,
                height: 0,
                weight: 0,
            },
            addressInput: '',
            addressObject: undefined,
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

    const addressObject = watch('addressObject')
    const addressInput = watch('addressInput')

    const onSubmit = (data: ArticleFormData) => {
        console.log('🚀 onSubmit')
        console.log(data)
        /** @TODO : send the data to the API */
    }

    /**
     * Handles form validation errors.
     *
     * This function is called when form validation fails. It logs the validation errors
     * to the console for debugging purposes.
     * @param {FieldErrors<UserRegistration>} errors - The validation errors object
     * @returns {void}
     */
    const onError = (errors: FieldErrors<ArticleFormData>): void => {
        console.log('Validation Errors:', errors)
    }

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

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className='mx-auto max-w-4xl space-y-8 rounded-lg bg-white p-6 shadow-md'
            >
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Ad Title Input */}
                    <Controller
                        control={control}
                        name='adTitle'
                        render={({ field }) => (
                            <FormItem className='col-span-full'>
                                <Label className='text-lg font-semibold'>
                                    {'Titre de l’annonce'}
                                </Label>
                                <FormDescription className='text-sm text-gray-500'>
                                    {'To do once we have the mutation done'}
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Brand Input */}
                    <Controller
                        control={control}
                        name='brand'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Marque de l’article'}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Model Input */}
                    <FormField
                        control={control}
                        name='model'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Modèle de l’article'}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Description Textarea */}
                    <FormField
                        control={control}
                        name='description'
                        render={({ field }) => (
                            <FormItem className='col-span-full'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Description'}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Manufacture Date Picker */}
                    <FormField
                        control={control}
                        name='manufactureDate'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Date de fabrication'}
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>
                                                        {'Choisissez une date'}
                                                    </span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'
                                    >
                                        <Calendar
                                            mode='single'
                                            className='bg-white'
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Purchase Date Picker */}
                    <FormField
                        control={control}
                        name='purchaseDate'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Date d’achat'}
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>
                                                        {'Choisissez une date'}
                                                    </span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'
                                    >
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* State Select */}
                    <FormField
                        control={control}
                        name='state'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'État'}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select state' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {StateSchema.options.map((state) => (
                                            <SelectItem
                                                key={state}
                                                value={state}
                                            >
                                                {
                                                    translations.products
                                                        .states[state]
                                                }
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Status Select */}
                    <FormField
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Statut'}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select status' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {StatusSchema.options.map((status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {
                                                    translations.products
                                                        .status[status]
                                                }
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Category Select */}
                    <FormField
                        control={control}
                        name='category'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Catégorie'}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select category' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {CategoryEnumSchema.options.map(
                                            (category) => (
                                                <SelectItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {
                                                        translations.products
                                                            .categories[
                                                            category
                                                        ]
                                                    }
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Subcategory Select */}
                    <FormField
                        control={control}
                        name='subCategory'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Sous-catégorie'}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Sélectionner une sous-catégorie' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {form.watch('category') &&
                                            categories[
                                                form.watch('category')
                                            ].map((subCategory) => (
                                                <SelectItem
                                                    key={subCategory}
                                                    value={subCategory}
                                                >
                                                    {subCategory}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Delivery Type Checkboxes */}
                    <FormField
                        control={control}
                        name='deliveryType'
                        render={({ field }) => (
                            <FormItem className='space-y-3'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Type de livraison'}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className='flex flex-col space-y-1'
                                    >
                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={
                                                        DeliveryTypeSchema
                                                            .options[0]
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className='font-normal'>
                                                {
                                                    translations.products
                                                        .delivery.PICKUP
                                                }
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={
                                                        DeliveryTypeSchema
                                                            .options[1]
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className='font-normal'>
                                                {
                                                    translations.products
                                                        .delivery.SHIPPING
                                                }
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={
                                                        DeliveryTypeSchema
                                                            .options[2]
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className='font-normal'>
                                                {
                                                    translations.products
                                                        .delivery.BOTH
                                                }
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Dimensions of the article */}
                    <div className='flex w-[250px] flex-wrap justify-between'>
                        {/* Dimensions of the article : Length */}
                        <FormField
                            control={control}
                            name='dimensions.length'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormMessage />
                                    <FormLabel className='text-base'>
                                        {'Longueur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Width */}
                        <FormField
                            control={control}
                            name='dimensions.width'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Largeur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Height */}
                        <FormField
                            control={control}
                            name='dimensions.height'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Hauteur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Weight */}
                        <FormField
                            control={control}
                            name='dimensions.weight'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Poids (kl)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/** User registed address */}
                <Select>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Sélectionne une adresse enregistrée' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{'Adresses:'}</SelectLabel>
                            <SelectItem value='apple'>Apple</SelectItem>
                            <SelectItem value='banana'>Banana</SelectItem>
                            <SelectItem value='blueberry'>Blueberry</SelectItem>
                            <SelectItem value='grapes'>Grapes</SelectItem>
                            <SelectItem value='pineapple'>Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/** Article Address */}
                <div className='flex justify-center'>
                    <FormField
                        control={control}
                        name='addressInput'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>
                                    {
                                        'Rajoute une adresse où se situe l’article'
                                    }
                                </FormLabel>
                                <Popover
                                    open={open}
                                    onOpenChange={setOpen}
                                >
                                    <div className='flex items-center'>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant='outline'
                                                    role='combobox'
                                                    aria-expanded={open}
                                                    className={cn(
                                                        'min-w-full justify-between sm:min-w-[420px]',
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                    onClick={() => {
                                                        if (!open) {
                                                            setOpen(true)
                                                        }
                                                    }}
                                                >
                                                    {!!field.value &&
                                                        !!addressObject &&
                                                        Object.keys(
                                                            addressObject,
                                                        ).length === 0 &&
                                                        field.value}
                                                    {!!addressObject &&
                                                        Object.keys(
                                                            addressObject,
                                                        ).length > 0 &&
                                                        addressObject.label}
                                                    {!field.value &&
                                                        !!addressObject &&
                                                        Object.keys(
                                                            addressObject,
                                                        ).length === 0 &&
                                                        'Rentre ton adresse'}

                                                    {!!addressObject &&
                                                        Object.keys(
                                                            addressObject,
                                                        ).length > 0 && (
                                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                        )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        {!!addressObject &&
                                            Object.keys(addressObject).length >
                                                0 && (
                                                <CircleX
                                                    className='ml-2 h-6 w-6 shrink-0 text-red-500 opacity-50'
                                                    onClick={() => {
                                                        setValue(
                                                            'addressObject',
                                                            undefined,
                                                        )
                                                        setOpen(false)
                                                    }}
                                                />
                                            )}
                                    </div>

                                    <PopoverContent className='w-[300px] p-0'>
                                        <Command>
                                            <CommandInput
                                                value={field.value}
                                                placeholder='Cherche ton adresse'
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
                                                    {addressInput &&
                                                    addressInput.length > 3 ? (
                                                        'Aucune adresse trouvée'
                                                    ) : (
                                                        <div className='flex justify-center'>
                                                            <House />
                                                        </div>
                                                    )}
                                                </CommandEmpty>

                                                <CommandGroup>
                                                    {fields.map(
                                                        (suggestion, index) => (
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
                                                                        'addressObject',
                                                                        {
                                                                            ...suggestion.properties,
                                                                            label: suggestion
                                                                                .properties
                                                                                .label,
                                                                        },
                                                                    )
                                                                    setOpen(
                                                                        false,
                                                                    )
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
                </div>

                <Button
                    type='submit'
                    className='w-full md:w-auto'
                >
                    {'✨ Estimer l’article'}
                </Button>
            </form>
        </Form>
    )
}

export default ArticleForm
