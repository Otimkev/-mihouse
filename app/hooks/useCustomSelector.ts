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

const formatedRoomTypes = roomTypes.map((roomType) => ({
    value: roomType,
    label: roomType
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