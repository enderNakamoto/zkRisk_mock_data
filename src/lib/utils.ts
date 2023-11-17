export const booleanify = (value: string): boolean => {
    const truthy: string[] = [
        'true',
        'True',
        't',
        '1'
    ]

    return truthy.includes(value)
}