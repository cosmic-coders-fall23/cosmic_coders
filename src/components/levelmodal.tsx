import {Modal, ModalBody, ModalHeader} from "@nextui-org/react";
import * as React from "react";

type StoryLine = { level: number, title: string, body: string }

export const storyLines: StoryLine[] = [
    {
        level: 1,
        title: "Initiation",
        body: "In the year 2345, Earth faces a sudden extraterrestrial threat. Mysterious alien ships, known as the Xelarians, have appeared on the horizon, launching a surprise attack on the planet. As a skilled pilot, you are recruited to join Earth's Galactic Guardian squad. In Level 1, your mission is to defend the Earth's major cities, learning to control your advanced starfighter and engage in fierce battles against the initial waves of Xelarian invaders. Your goal is to protect the planet and discover the origins of this hostile invasion."
    },
    {
        level: 2,
        title: "Xelarian Arsenal",
        body: "As you delve deeper into the Xelarian threat, you uncover that they are harvesting Earth's resources to power their advanced technology. In Level 2, you must infiltrate one of their resource mining facilities on the moon, battling through heavily fortified defenses to sabotage their operation. Along the way, you gain access to a new arsenal of weapons and equipment to enhance your starfighter's capabilities."
    },
    {
        level: 3,
        title: "",
        body: "With your enhanced weaponry, you track the Xelarians to a mysterious nebula where they have set up a formidable base of operations. Level 3 presents you with a challenging dogfight through the colorful but treacherous nebula, requiring precision flying and cunning tactics. Infiltrate their base and uncover a piece of the Xelarian's ultimate plan, hinting at a larger, more sinister scheme."
    },
    {
        level: 4,
        title: "",
        body: "In a desperate race against time, you discover that the Xelarians have been secretly constructing a doomsday device capable of destroying Earth. Level 4 sees you navigating a labyrinthine fortress, disabling security systems, and confronting increasingly powerful Xelarian bosses. The clock is ticking as you approach the doomsday device's control center"
    },
    {
        level: 5,
        title: "The Battle for Earth",
        body: "In the climactic Level 5, you engage in a decisive space battle above Earth. The Xelarian mothership, the source of their power, emerges from a hidden location. As the last line of defense, you must lead an epic assault against the mothership, battling waves of enemies and overcoming formidable challenges. Your mission: destroy the mothership and save Earth from annihilation, all while uncovering the truth behind the Xelarians' motives.The fate of Earth and humanity rests in your hands as you progress through these levels, gradually unveiling the mystery behind the Xelarian invasion and ultimately striving to secure the survival of the planet."
    }
];

interface StoryModalProps {
    level: number;
    isModalVisible: boolean;
    setModalVisible: (value: boolean) => void;
}

export default function LevelModal({level, isModalVisible, setModalVisible}: StoryModalProps) {
    const story = storyLines.find(storyLine => storyLine.level === level);

    return (
        <>
            <Modal isOpen={isModalVisible} isDismissable={false}>
                <ModalHeader>{story?.title || `Level ${level}`}</ModalHeader>
                <ModalBody>{story?.body || 'No story available for this level.'}</ModalBody>
            </Modal>
        </>
    )
}
