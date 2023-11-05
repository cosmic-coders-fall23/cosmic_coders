"use client";
import React, { useEffect, useState, useContext } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton, Chip} from "@nextui-org/react";
import GameService from "@/services/gameservice";
import {UserContext} from "@/components/usercontext";

type LeaderboardScore = {
    id: number;
    username: string;
    score: number;
}

function LeaderboardPage() {
    const {user} = useContext(UserContext);
    const [data, setData] = useState(Array(10) as LeaderboardScore[]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        await GameService.leaderboard().then(response => {
            if (response.status === 200) {
                setData(response.data);
                console.log(data);
            }
        }).catch(error => {
            console.log(error);
        })
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="p-5 flex justify-center">
            <Table className="max-w-5xl" aria-label="Leaderboard table">
                <TableHeader>
                    <TableColumn>POSITION</TableColumn>
                    <TableColumn>USERNAME</TableColumn>
                    <TableColumn>SCORE</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No high scores yet. Start playing to claim your spot!"}>
                        {data.map((value: LeaderboardScore, index: number) => (
                            <TableRow key={value.id}>
                                
                                <TableCell>{index+1}</TableCell>
                                
                                <TableCell>
                                    {value.username === user.username ? <Chip color="primary">{user.username}</Chip> : value.username}
                                </TableCell>
                                <TableCell>{value.score}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default LeaderboardPage;