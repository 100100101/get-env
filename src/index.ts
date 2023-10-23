type TGetEnv = (key: string, isFormat?: boolean) => string | number | boolean
export const getEnv: TGetEnv = (key, isFormat = true) => {
    const envValue = process.env[key]
    if (envValue === undefined)
        throw new Error(`process.env is not contain '${key}'`)

    if (!isFormat) return envValue

    if (envValue === 'true') {
        return true
    } else if (envValue === 'false') {
        return false
    }
    const envValueConvertedToString = envValue.toString()
    const envValueConvertedToFloat = parseFloat(envValueConvertedToString)
    const envValueConvertedToFloatString = envValueConvertedToFloat.toString()

    if (
        envValueConvertedToFloat &&
        envValueConvertedToString.length ===
            envValueConvertedToFloatString.length
    ) {
        return envValueConvertedToFloat
    }

    const envValueConvertedToInt = parseInt(envValueConvertedToString)
    const envValueConvertedToIntString = envValueConvertedToInt.toString()

    if (
        // envValueConvertedToInt ??
        (envValueConvertedToInt || envValueConvertedToInt === 0) &&
        envValueConvertedToString.length === envValueConvertedToIntString.length
    ) {
        return envValueConvertedToInt
    }
    return envValue
}
