"use client"
import kaboom from "kaboom"
import * as React from "react"

const Game: React.FC = () => {

    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const k = kaboom({
            global: true,
            canvas: canvasRef.current as any,
            background: [0, 0, 20],
            width: 800,
            height: 600,
            scale: 1,
            debug: true,
        })

        k.loadSprite("spaceship", "sprites/spaceship.png")

        const player = k.add([
            k.sprite("spaceship"),
            k.pos(120, 80),
            k.scale(1),
            k.area(), 
            k.body(),
        ])

        const moveScale = 100

        k.onKeyDown("left", () => {
            player.move(k.vec2(-1, 0).scale(moveScale))
        })
        k.onKeyDown("right", () => {
            player.move(k.vec2(1, 0).scale(moveScale))
        })
        k.onKeyDown("up", () => {
            player.move(k.vec2(0, -1).scale(moveScale))
        })
        k.onKeyDown("down", () => {
            player.move(k.vec2(0, 1).scale(moveScale))
        })

    }, [])

    return (
        <div className="h-screen flex items-center justify-center p-5">
            <div>
                <div className="flex w-full flex-wrap gap-4">
                    <div>
                        {/* <h1 className="text-4xl text-center font-extrabold mb-4">GAME</h1> */}
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;