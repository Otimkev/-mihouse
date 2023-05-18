const roomStyles = [
    "Modern",
    "Minimalist",
    "Tropical",
    "Coastal",
    "Vintage",
    "Maximalist",
    "Christmas",
    "Neoclassic",
    "Scandinavian",
    "Art deco",
    "Exotic"
]

const formatedRoomStyles = roomStyles.map((roomStyle) => ({
    value: roomStyle,
    label: roomStyle
}))

const useRoomStyles = () => {
    const getAllRoomStyles = () => formatedRoomStyles;

    const getByValue = (value: string) => {
        return formatedRoomStyles.find((item) => item.value == value);
    }

    return {
        getAllRoomStyles,
        getByValue
    }
}

export default useRoomStyles;