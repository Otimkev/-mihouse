const Privacy = [
    "Public",
    "Private"
]

const formatedPrivacy = Privacy.map((privacy) => ({
    value: privacy,
    label: privacy
}))

const usePrivacy = () => {
    const getAllPrivacy = () => formatedPrivacy;

    const getByValue = (value: string) => {
        return formatedPrivacy.find((item) => item.value == value);
    }

    return {
        getAllPrivacy,
        getByValue
    }
}

export default usePrivacy;