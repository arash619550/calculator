import styles from '../styles/calculator.module.css'
import icon from '../assets/images/icon.png'
import { useState } from 'react'

export default function Calculator() {
    const [display, setDisplay] = useState("0")
    const [previousValue, setPreviousValue] = useState(null)
    const [operation, setOperation] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [memory, setMemory] = useState(0)

    // --- اعداد ---
    const handleNumClick = (num) => {
        if (waitingForOperand) {
            setDisplay(num)
            setWaitingForOperand(false)
        } else {
            setDisplay(display === "0" ? num : display + num)
        }
    }

    // --- عملگرها ---
    const handleOperatorClick = (nextOperation) => {
        const inputValue = parseFloat(display)

        if (previousValue === null) {
            setPreviousValue(inputValue)
        } else if (operation) {
            const currentValue = previousValue || 0
            const newValue = calculate(currentValue, inputValue, operation)

            setPreviousValue(newValue)
            setDisplay(String(newValue))
        }

        setWaitingForOperand(true)
        setOperation(nextOperation)
    }

    // --- محاسبات ---
    const calculate = (firstValue, secondValue, operation) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue
            case '-':
                return firstValue - secondValue
            case '*':
                return firstValue * secondValue
            case '/':
                return firstValue / secondValue
            default:
                return secondValue
        }
    }

    // --- مساوی ---
    const handleEqual = () => {
        const inputValue = parseFloat(display)

        if (previousValue !== null && operation) {
            const result = calculate(previousValue, inputValue, operation)
            setDisplay(String(result))
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
        }
    }

    // --- سایر توابع ---
    const handleClear = () => {
        setDisplay("0")
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(false)
    }

    const handleDelete = () => {
        if (display.length === 1) {
            setDisplay("0")
        } else {
            setDisplay(display.slice(0, -1))
        }
    }

    const handleCE = () => {
        setDisplay("0")
        setWaitingForOperand(false)
    }

    const handlePercent = () => {
        const currentValue = parseFloat(display)
        setDisplay(String(currentValue * 0.01))
        setWaitingForOperand(true)
    }

    const handleToggleSign = () => {
        setDisplay(String(-parseFloat(display)))
    }

    const handleDot = () => {
        if (waitingForOperand) {
            setDisplay("0.")
            setWaitingForOperand(false)
        } else if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    const handleInverse = () => {
        const currentValue = parseFloat(display)
        if (currentValue === 0) {
            setDisplay("خطا")
        } else {
            setDisplay(String(1 / currentValue))
        }
        setWaitingForOperand(true)
    }

    const handleSquare = () => {
        const currentValue = parseFloat(display)
        setDisplay(String(currentValue * currentValue))
        setWaitingForOperand(true)
    }

    const handleSqrt = () => {
        const currentValue = parseFloat(display)
        if (currentValue < 0) {
            setDisplay("خطا")
        } else {
            setDisplay(String(Math.sqrt(currentValue)))
        }
        setWaitingForOperand(true)
    }

    // --- حافظه ---
    const handleMC = () => setMemory(0)
    const handleMR = () => { setDisplay(String(memory)); setWaitingForOperand(true) }
    const handleMPlus = () => { setMemory(memory + parseFloat(display)); setWaitingForOperand(true) }
    const handleMMinus = () => { setMemory(memory - parseFloat(display)); setWaitingForOperand(true) }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={icon} alt="icon" width={24} height={24} />
                <h1 className={styles.h1}>calculator</h1>
            </div>

            <h2 className={styles.result}>{display}</h2>

            <div className={styles.mButtons}>
                <button onClick={handleMC}>MC</button>
                <button onClick={handleMR}>MR</button>
                <button onClick={handleMPlus}>M+</button>
                <button onClick={handleMMinus}>M-</button>
            </div>

            <div className={styles.buttonsContainer}>
                <button onClick={handlePercent}>%</button>
                <button onClick={handleCE}>CE</button>
                <button onClick={handleClear}>C</button>
                <button onClick={handleDelete}>back</button>

                <button onClick={handleInverse}>1/x</button>
                <button onClick={handleSquare}>x<sup>2</sup></button>
                <button onClick={handleSqrt}>√</button>
                <button onClick={() => handleOperatorClick("/")}>/</button>

                <button className={styles.number} onClick={() => handleNumClick("7")}>7</button>
                <button className={styles.number} onClick={() => handleNumClick("8")}>8</button>
                <button className={styles.number} onClick={() => handleNumClick("9")}>9</button>
                <button onClick={() => handleOperatorClick("*")}>*</button>

                <button className={styles.number} onClick={() => handleNumClick("4")}>4</button>
                <button className={styles.number} onClick={() => handleNumClick("5")}>5</button>
                <button className={styles.number} onClick={() => handleNumClick("6")}>6</button>
                <button onClick={() => handleOperatorClick("-")}>-</button>

                <button className={styles.number} onClick={() => handleNumClick("1")}>1</button>
                <button className={styles.number} onClick={() => handleNumClick("2")}>2</button>
                <button className={styles.number} onClick={() => handleNumClick("3")}>3</button>
                <button onClick={() => handleOperatorClick("+")}>+</button>

                <button className={styles.number} onClick={handleToggleSign}>
                    <sup>+</sup>/<sub>-</sub>
                </button>
                <button className={styles.number} onClick={() => handleNumClick("0")}>0</button>
                <button className={styles.number} onClick={handleDot}>.</button>
                <button className={styles.mosavi} onClick={handleEqual}>=</button>
            </div>
        </div>
    )
}