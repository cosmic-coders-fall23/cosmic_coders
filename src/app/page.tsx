'use client'
import React from 'react';
import {motion} from "framer-motion";
import {Button} from "@nextui-org/button";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import {Link} from "@nextui-org/link";

type LeaderboardScore = {
    id: number;
    username: string;
    score: number;
}

const sampleData: LeaderboardScore[] = [
    {id: 11, username: "InterstellarHero", score: 9800},
    {id: 9, username: "InfinityWarrior", score: 9500},
    {id: 6, username: "AstroChampion", score: 9200},
    {id: 4, username: "NovaCommander", score: 8800},
    {id: 8, username: "SpaceMaster", score: 8600},
    {id: 10, username: "LunarLegend", score: 8300},
    {id: 2, username: "CosmicWarrior", score: 8200},
    {id: 5, username: "StarPilot", score: 7700},
    {id: 1, username: "GalaxyExplorer", score: 6900},
    {id: 7, username: "SolarGuardian", score: 7100},
];

function HomePage() {


    return (
        <div className="container mx-auto">
            <div className="pt-24 h-screen">
                <motion.h1
                    className="text-7xl font-black"
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1, ease: "anticipate"}}
                >
                    COSMIC CODERS
                </motion.h1>
                <motion.h2
                    className="text-2xl font-bold"
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1, ease: "anticipate", delay: 0.5}}
                >
                    Defend Earth, Destroy Invaders, Unleash Your Galactic Fury!
                </motion.h2>
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1, ease: "anticipate", delay: 0.6}}
                >
                    <Button as={Link} href="/signup" size="lg" className="mt-8" color="primary">Sign Up</Button>
                </motion.div>

                <div className="mt-12 flex flex-row flex-grow">
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 0.9}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 4, delay: 0.5}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 1}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 3, delay: 0.8}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 1.1}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 6, delay: 0.6}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 1.2}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 5, delay: 0.1}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 1.3}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 4, delay: 1}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: "anticipate", delay: 1.4}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: 300}}
                            transition={{repeat: Infinity, repeatType: "loop", ease: "linear", duration: 5, delay: 0.7}}
                        >
                            <Image className="w-1/3" src="/sprites/alien.png"/>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1, ease: "anticipate"}}
                >
                    <motion.div
                        className="mt-48 w-12"
                        initial={{x: 0}}
                        animate={{x: 600}}
                        transition={{repeat: Infinity, repeatType: "reverse", ease: "linear", duration: 5}}
                    >
                        <Image src="/sprites/starship.png"/>
                    </motion.div>
                </motion.div>
            </div>
            <div className="h-screen text-right">
                <motion.h1
                    initial={{opacity: 0, x: 100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5}}
                    className="text-5xl font-black"
                >
                    Engaging Gameplay
                </motion.h1>
                <motion.div
                    className="flex flex-row justify-end mt-8"
                    initial={{opacity: 0, x: 100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.6}}
                >
                    <Image src="/videos/demo.gif" />
                </motion.div>
            </div>
            <div className="h-screen">
                <motion.h1
                    initial={{opacity: 0, x: -100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.2}}
                    className="text-5xl font-black"
                >
                    Epic Storyline
                </motion.h1>
                <motion.h3
                    initial={{opacity: 0, x: -100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.3}}
                    className="text-2xl font-extrabold mt-8"
                >
                    Initiation
                </motion.h3>
                <motion.p
                    initial={{opacity: 0, x: -100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.4}}
                >
                    In the year 2345, Earth faces a sudden extraterrestrial threat. Mysterious alien ships, known as
                    the Xelarians, have appeared on the horizon, launching a surprise attack on the planet. As a skilled
                    pilot, you are recruited to join Earth's Galactic Guardian squad. In Level 1, your mission is to
                    defend the Earth's major cities, learning to control your advanced starfighter and engage in fierce
                    battles against the initial waves of Xelarian invaders. Your goal is to protect the planet and
                    discover the origins of this hostile invasion.
                </motion.p>
                <motion.h3
                    className="text-2xl font-extrabold mt-8"
                    initial={{opacity: 0, x: -100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.5}}
                >
                    Xelarian Arsenal
                </motion.h3>
                <motion.p
                    initial={{opacity: 0, x: -100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.6}}
                >
                    As you delve deeper into the Xelarian threat, you uncover that they are harvesting Earth's
                    resources to power their advanced technology. In Level 2, you must infiltrate one of their resource
                    mining facilities on the moon, battling through heavily fortified defenses to sabotage their
                    operation. Along the way, you gain access to a new arsenal of weapons and equipment to enhance your
                    starfighter's capabilities.
                </motion.p>
                <div className="mt-12 text-center font-bold text-xl">
                    <motion.p
                        initial={{opacity: 0, x: -100}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{ease: "anticipate", duration: 0.5, delay: 0.7}}
                    >
                        Armed with newfound power and determination, you, the defender of Earth, stand at the precipice
                        of the final battle.
                    </motion.p>
                    <br/>
                    <motion.p
                        initial={{opacity: 0, x: -100}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{ease: "anticipate", duration: 0.5, delay: 0.9}}
                    >
                        The fate of our world hangs in the balance.
                    </motion.p>
                    <br/>
                    <motion.p
                        initial={{opacity: 0, x: -100}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{ease: "anticipate", duration: 0.5, delay: 1}}
                    >
                        Will you rise to the challenge, conquer the Xelarian menace, and secure the future of humanity
                        in the vastness of the cosmos?
                    </motion.p>
                </div>
            </div>
            <div className="h-screen">
                <motion.h1
                    initial={{opacity: 0, x: 100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.2}}
                    className="text-5xl font-black text-right"
                >
                    Competitive Leaderboard
                </motion.h1>
                <motion.div
                    className="mt-8 flex justify-end"
                    initial={{opacity: 0, x: 100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.4}}
                >
                    <Table className="max-w-5xl" aria-label="Leaderboard table">
                        <TableHeader>
                            <TableColumn>POSITION</TableColumn>
                            <TableColumn>USERNAME</TableColumn>
                            <TableColumn>SCORE</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No high scores yet. Start playing to claim your spot!"}>
                            {sampleData.map((value: LeaderboardScore, index: number) => (
                                <TableRow key={value.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {value.username}
                                    </TableCell>
                                    <TableCell>{value.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
                <motion.div
                    className="flex justify-end"
                    initial={{opacity: 0, x: 100}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.5}}
                >
                    <Button as={Link} href="/leaderboard" size="lg" className="mt-8" color="secondary">Current
                        Leaderboard</Button>
                </motion.div>
            </div>
            <div className="mb-24 text-center">
                <motion.h1
                    initial={{opacity: 0, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.2}}
                    className="text-5xl font-black"
                >
                    Start Playing Today!
                </motion.h1>
                <motion.p
                    className="pt-8 text-2xl"
                    initial={{opacity: 0, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.3}}
                >
                    Your galaxy needs you – enlist today for an epic gaming experience beyond the stars!
                </motion.p>
                <motion.div
                    initial={{opacity: 0, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{ease: "anticipate", duration: 0.5, delay: 0.5}}
                >
                    <Button as={Link} href="/signup" size="lg" className="mt-8" color="primary">Sign Up</Button>
                </motion.div>
            </div>
        </div>
    );
}

export default HomePage;
