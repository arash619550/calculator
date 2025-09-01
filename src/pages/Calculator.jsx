import styles from '../styles/calculator.module.css'
import icon from '../assets/images/icon.png'
import { useState } from 'react'
export default function Calculator() {
    const [display, setDisplay] = useState("0")
    const [isNewNumber, setIsNewNumber] = useState(false)
    const [memory, setMemory] = useState(0)
    const handleNumClick = (e) => {
        const value = e.target.innerText
        if (display === "0" || isNewNumber) {
            setDisplay(value)
        } else {
            setDisplay(display + value)
        }
        setIsNewNumber(false)
    }
    const handleOperatorClick = (operator) => {
        const lastChar = display[display.length - 1]
        if (["+", "-", "*", "/"].includes(lastChar)) return
        setDisplay(display + operator)
        setIsNewNumber(true)
    }
    const handleClear = () => {
        setDisplay("0")
        setIsNewNumber(false)
    }
    const handleDelete = () => {
        if (display.length === 1) {
            setDisplay("0")
        } else {
            setDisplay(display.slice(0, -1))
        }
        setIsNewNumber(false)
    }
    const handleCE = () => {
        const regex = /[+\-*/](?!.*[+\-*/])/
        const match = display.match(regex)
        if (match) {
            setDisplay(display.slice(0, match.index + 1))
        } else {
            setDisplay("0")
        }
        setIsNewNumber(false)
    }
    const handlePercent = () => {
        try {
            setDisplay((eval(display) * 0.01).toString())
        } catch {
            setDisplay("0")
        }
    }
    const handleToggleSign = () => {
        try {
            const value = eval(display)
            setDisplay((-value).toString())
        } catch {
            setDisplay("0")
        }
    }
    const handleDot = () => {
        const lastNumber = display.split(/[\+\-\*\/]/).pop()
        if (!lastNumber.includes(".")) {
            setDisplay(display + ".")
            setIsNewNumber(false)
        }
    }
    const handleEqual = () => {
        const lastChar = display[display.length - 1]
        if (["+", "-", "*", "/"].includes(lastChar)) return
        try {
            setDisplay(eval(display).toString())
        } catch {
            setDisplay("0")
        }
    }
    const handleInverse = () => {
        try {
            const value = eval(display)
            if (value === 0) {
                setDisplay("خطا")
            } else {
                setDisplay((1 / value).toString())
            }
        } catch {
            setDisplay("0")
        }
    }
    const handleSquare = () => {
        try {
            const value = eval(display)
            setDisplay((value * value).toString())
        } catch {
            setDisplay("0")
        }
    }
    const handleSqrt = () => {
        try {
            const value = eval(display)
            if (value < 0) {
                setDisplay("خطا")
            } else {
                setDisplay(Math.sqrt(value).toString())
            }
        } catch {
            setDisplay("0")
        }
    }
    const handleMC = () => {
        setMemory(0)
    }
    const handleMR = () => {
        setDisplay(memory.toString())
        setIsNewNumber(true)
    }
    const handleMPlus = () => {
        try {
            const value = eval(display)
            setMemory(memory + value)
            setIsNewNumber(true)
        } catch { }
    }
    const handleMMinus = () => {
        try {
            const value = eval(display)
            setMemory(memory - value)
            setIsNewNumber(true)
        } catch { }
    }
    return (
        <>
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
                    <button className={styles.number} onClick={handleNumClick}>7</button>
                    <button className={styles.number} onClick={handleNumClick}>8</button>
                    <button className={styles.number} onClick={handleNumClick}>9</button>
                    <button onClick={() => handleOperatorClick("*")}>*</button>
                    <button className={styles.number} onClick={handleNumClick}>4</button>
                    <button className={styles.number} onClick={handleNumClick}>5</button>
                    <button className={styles.number} onClick={handleNumClick}>6</button>
                    <button onClick={() => handleOperatorClick("-")}>-</button>
                    <button className={styles.number} onClick={handleNumClick}>1</button>
                    <button className={styles.number} onClick={handleNumClick}>2</button>
                    <button className={styles.number} onClick={handleNumClick}>3</button>
                    <button onClick={() => handleOperatorClick("+")}>+</button>
                    <button className={styles.number} onClick={handleToggleSign}>
                        <sup>+</sup>/<sub>-</sub>
                    </button>
                    <button className={styles.number} onClick={handleNumClick}>0</button>
                    <button className={styles.number} onClick={handleDot}>.</button>
                    <button className={styles.mosavi} onClick={handleEqual}>=</button>
                </div>
            </div>
        </>
    )
}