const roomTypes = [
    "Living Room",
    "Bedroom",
    "Bath Room",
    "Atic",
    "Kitchen",
    "Dinning room",
    "Office",
    "Home office",
]

const resultQuality = [
    {label:"Low (costs 10pts)", value: "256x256"},
    {label:"Medium (costs 15pts)", value: "512x512"},
    {label:"High (costs 25pts", value: "1024x1024"}
]

const formatedRoomTypes = resultQuality.map((roomType) => ({
    value: roomType.value,
    label: roomType.label
}))

const useCustomSelector = () => {
    const getAllRoomTypes = () => formatedRoomTypes;

    const getByValue = (value: string) => {
        return formatedRoomTypes.find((item) => item.value == value);
    }

    return {
        getAllRoomTypes,
        getByValue
    }
}

export default useCustomSelector;