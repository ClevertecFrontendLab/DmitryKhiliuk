export type BookingType = {
    id: number
    order: boolean
    dateOrder: string
    customerId: number
    customerFirstName: string
    customerLastName: string
}

export type DeliveryType = {
    id: number
    handed: boolean
    dateHandedFrom: string
    dateHandedTo: string
    recipientId: number
    recipientFirstName: string
    recipientLastName: string
}

export type HistoriesType = {
    id: number
    userId: number
}

export type ImageType = {
    url: string
}

export type CommentType = {
    id: number
    rating: number
    text: string
    createdAt: string
    user: {
        commentUserId: number
        firstName: string
        lastName: string
        avatarUrl: string
    }
}

export  type BookType = {
    issueYear: string
    rating: number
    title: string
    authors: string[]
    image: ImageType | null
    categories: string[]
    id: number
    booking: BookingType | null
    delivery: DeliveryType | null
    histories: HistoriesType[] | null
}

export type BooksType = BookType[];

export type BookDetailType = {
    id: number
    title: string
    rating: number
    issueYear: string
    description: string
    publish: string
    pages: string
    cover: string
    weight: string
    format: string
    ISBN: string
    producer: string
    authors: string[]
    images: ImageType[]
    categories: string[]
    comments: CommentType[] | null
    booking: BookingType | null
    delivery: DeliveryType | null
    histories: HistoriesType[] | null

}

export type CategoriesItemType = {
    id: number
    name:  string
    path: string
}

export type CategoriesType = CategoriesItemType[]

export type ErrorType = {
    data: null
    error: {
        status: number
        name: string
        message: string
        details: null
    }
}

export type AppStatusType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

/* AUTH */

export type AuthDataType = {
    identifier: string
    password: string
    username: string
}

export type RegistrationDataType = {
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
    email: string
}

export type ResetDataType = {
    email: string
}

export type RecoveryDataType = {
    password: string
    passwordConfirmation: string
    code: string
}

export type DataType = AuthDataType | RegistrationDataType | ResetDataType | RecoveryDataType

