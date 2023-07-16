import React, { useState } from 'react'
import './Tic.css'

function Tic() {

    const [turn, setTurn] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState();

    const checkWinner = (pattern) => {
        // cells details for the condition of winner.
        const samples = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let sample in samples) {
            samples[sample].forEach(element => {
                if (
                    pattern[element[0]] === '' ||
                    pattern[element[1]] === '' ||
                    pattern[element[2]] === ''
                ) {
                    //do nothing
                } else if (
                    // Checking player entry on the samples data of winner's condition
                    pattern[element[0]] === pattern[element[1]] &&
                    pattern[element[1]] === pattern[element[2]]
                ) {
                    setWinner(pattern[element[0]])
                }
            });
        }

    }

    const handleClick = (number) => {
        // alert(`Testing : ${number}`)
        if (cells[number] === '') {
            const result = { ...cells }
            if (turn === 'X') {
                setTurn('O')
                result[number] = 'X'
            } else {
                setTurn('X')
                result[number] = 'O'
            }
            checkWinner(result)
            setCells(result)
            console.log('result', result)
        } else {
            alert('Double click not allowed!')
        }
    }

    const Cell = (props) => {
        return <td onClick={() => handleClick(props.number)}>{cells[props.number]}</td>;
    }

    const handleRestart = () => {
        setWinner(null)
        setCells(Array(9).fill(''))
        setTurn('X')
    }

    return (
        <div >
            {`turn : ${turn}`}
            <table className='main__table'>
                <tbody>
                    <tr>
                        <Cell number={0} />
                        <Cell number={1} />
                        <Cell number={2} />
                    </tr>
                    <tr>
                        <Cell number={3} />
                        <Cell number={4} />
                        <Cell number={5} />
                    </tr>
                    <tr>
                        <Cell number={6} />
                        <Cell number={7} />
                        <Cell number={8} />
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                    <h3>{winner} is the winner of the game!</h3>
                    <button onClick={() => handleRestart()}>Play Again!</button>
                </>
            )}
        </div>
    )
}

export default Tic