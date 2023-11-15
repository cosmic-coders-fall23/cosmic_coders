import {Modal, ModalBody, ModalHeader} from "@nextui-org/react";
import * as React from "react";

type StoryLine = { level: number, title: string, body: string }

export const storyLines: StoryLine[] = [
    {
        level: 1,
        title: "Galactic Chase",
        body: "The chase leads you into the depths of the galaxy. You find yourself navigating through asteroid fields and dodging debris, while the Xelarian fleet is hot on your trail. Your mission is to lead them away from Earth while gathering crucial intelligence about their fleet composition."
    },
    {
        level: 2,
        title: "Ambush in the Asteroids",
        body: "In the shadowy asteroid belt, you set up an ambush for the pursuing Xelarian ships. Your plan: hit them hard and fast, exploiting the asteroids for tactical advantage. Stealth and speed are your allies as you engage in guerilla-style warfare against the enemy fleet."
    },
    {
        level: 3,
        title: "The Lost Colony",
        body: "A distress signal leads you to a forgotten human colony, long thought lost. Here, you encounter survivors who have been fending off Xelarian attacks. Your task is to defend the colony and help fortify their defenses, learning some of their survival tactics."
    },
    {
        level: 4,
        title: "Interstellar Espionage",
        body: "You go undercover on a Xelarian-controlled space station to gather intelligence. Navigating the enemy's hub, you discover plans for another attack on Earth. The mission turns into a race against time to relay this information back to the Galactic Guardian squad."
    },
    {
        level: 5,
        title: "Duel in the Dark",
        body: "In the uncharted regions of space, you find yourself in a one-on-one dogfight with a notorious Xelarian ace. This battle tests your skills to their limits, requiring every trick in your book to emerge victorious and gain vital information about the enemy's weaknesses."
    },
    {
        level: 6,
        title: "The Nebulae Network",
        body: "Your journey takes you through a network of nebulae, each with its own unique dangers and mysteries. Here, you discover hidden paths and shortcuts that could be key to outmaneuvering the Xelarian fleet, but also find yourself facing strange, unknown cosmic phenomena."
    },
    {
        level: 7,
        title: "Black Hole Peril",
        body: "A dangerous mission leads you perilously close to a black hole. As you navigate the intense gravitational forces, you must also contend with Xelarian forces keen on exploiting the situation. Your goal is to gather rare cosmic data while ensuring your own survival."
    },
    {
        level: 8,
        title: "Rebellion of the Robots",
        body: "On a remote mining planet, you encounter a group of sentient robots rebelling against Xelarian control. You join forces with them, learning new technologies and strategies to bolster your fight against the Xelarian oppressors."
    },
    {
        level: 9,
        title: "The Crystal Moon",
        body: "A mysterious moon made entirely of a strange crystal substance holds the key to a powerful new energy source. You must secure the moon and its secrets before the Xelarians can claim it, facing both environmental hazards and a heavily fortified enemy outpost."
    },
    {
        level: 10,
        title: "Echoes of the Past",
        body: "Discovering an ancient alien relic, you unlock secrets of a long-gone civilization that once stood against the Xelarians. These revelations bring new hope and strategies to the fight, offering a potential weakness in the Xelarian armada."
    },
    {
        level: 11,
        title: "Invasion of the Hive",
        body: "You infiltrate a Xelarian hive ship, a massive vessel that serves as both a factory and a warship. Inside, you sabotage their war efforts and free captive species, causing chaos in the enemy ranks and slowing down their production capabilities."
    },
    {
        level: 12,
        title: "The Time Dilemma",
        body: "An experimental Xelarian weapon traps you in a time loop. Each loop teaches you more about the enemy, but you must find a way to break free before becoming trapped forever. Your understanding of the Xelarians deepens with each repetition."
    },
    {
        level: 13,
        title: "Starship Graveyard",
        body: "Navigating a graveyard of ancient starships, you piece together the history of past battles and learn from the fallen. Here, you scavenge old technologies and weaponry, repurposing them to give your starfighter an edge in the ongoing war."
    },
    {
        level: 14,
        title: "The Great Betrayal",
        body: "A trusted ally turns out to be a Xelarian spy, putting the entire Galactic Guardian squad at risk. You must uncover the extent of the betrayal, root out any other spies, and reestablish trust among the ranks to continue the fight."
    },
    {
        level: 15,
        title: "Final Assault",
        body: "The stage is set for a final, decisive assault on the Xelarian homeworld. Leading the Galactic Guardian fleet, you face the full might of the Xelarian forces in a battle that will determine the fate of the galaxy. Victory will require every skill and ally you've gained on your journey."
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
        <Modal className="modal-container" isOpen={isModalVisible} isDismissable={false}>
            <div className="crawl-text">
                <ModalHeader className="font-pixel-emulator text-xl text-white">
                    {story?.title || `Level ${level}`}
                </ModalHeader>
                <ModalBody className="font-pixel-emulator text-xl text-white">
                    {story?.body || 'No story available for this level.'}
                </ModalBody>
            </div>
        </Modal>
    );
}
