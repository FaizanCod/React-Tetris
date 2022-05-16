import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    const HIGH_SCORE = 'highScore';
    const highScoreString = localStorage.getItem(HIGH_SCORE);
    const highScoreNumber = JSON.parse(highScoreString);

    const linePoints = [40, 100, 300, 1200];

    const checkHighScore = useCallback(() => {
        if (score > highScore) {
            console.log("New High Score");
            localStorage.setItem(HIGH_SCORE, highScore);
            setHighScore(score);
        }
    }, [highScore, highScoreNumber, score]);

    const calcScore = useCallback(() => {

        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            checkHighScore();
            setRows(prev => prev + rowsCleared);
        }
    }, [checkHighScore, level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, highScore, setHighScore, rows, setRows, level, setLevel];
}