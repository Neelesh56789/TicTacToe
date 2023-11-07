import { useRef, useState } from "react";
import circle from"../Assets/circle.png"
import cross from "../Assets/cross.png"

let option = ["","","","","","","","",""];

export const TicTacToe = () =>{

    let [count, setCount] = useState(0);
    let [isLock, setIsLock] = useState(false);
    let congrats = useRef(null);
    let col1 = useRef(null);
    let col2 = useRef(null);
    let col3 = useRef(null);
    let col4 = useRef(null);
    let col5 = useRef(null);
    let col6 = useRef(null);
    let col7 = useRef(null);
    let col8 = useRef(null);
    let col9 = useRef(null);
    let col_arr = [col1,col2,col3,col4,col5,col6,col7,col8,col9];
    const click = (e, i) =>{
        e.preventDefault();
        if(isLock)
        {
            return 0;
        }
        if(count % 2 == 0)
        {
            e.target.innerHTML = `<img src = '${cross}'>`;
            option[i] = 'x';
            setCount(++count);
        }
        else{
            e.target.innerHTML = `<img src = '${circle}'>`;
            option[i] = 'o';
            setCount(++count);
        }
        IsWin();
    }

    const IsWin = () =>{
        if(option[0] === option[1] && option[1] === option[2] && option[2]!= "")
        {
            Won(option[0]);
        }
        if(option[3] === option[4] && option[4] === option[5] && option[5]!= "")
        {
            Won(option[3]);
        }
        if(option[6] === option[7] && option[7] === option[8] && option[8]!= "")
        {
            Won(option[6]);
        }
        if(option[0] === option[4] && option[4] === option[8] && option[8]!= "")
        {
            Won(option[0]);
        }
        if(option[2] === option[4] && option[4] === option[6] && option[6]!= "")
        {
            Won(option[2]);
        }
        if(option[0] === option[3] && option[3] === option[6] && option[6]!= "")
        {
            Won(option[0]);
        }
        if(option[1] === option[4] && option[4] === option[7] && option[7]!= "")
        {
            Won(option[1]);
        }
        if(option[2] === option[5] && option[5] === option[8] && option[8]!= "")
        {
            Won(option[2]);
        }
    }

    const Won = (win) =>{
        setIsLock(true)
        if(win === 'x')
        {
            congrats.current.innerHTML = `Congratulations <img src = ${cross}> , You have won the game`;
        }
        else{
            congrats.current.innerHTML = `Congratulations <img src = ${circle}> , have won the game`;
        }
    }
    const Reset = ()=>{
        setIsLock(false);
        congrats.current.innerHTML = "Tic Tac Toe";
        col_arr.map((e)=>{
            e.current.innerHTML="";
        })
    }
    return (
        <div className = "container">
            <div className="name" ref = {congrats}>Tic Tac Toe</div>
            <div className="play-board">
                <div className="row1">
                    <div className = "col" role="button" ref = {col1} onClick={(e)=>{click(e, 0)}}></div>
                    <div className = "col" role="button" ref = {col2} onClick={(e)=>{click(e, 1)}}></div>
                    <div className = "col" role="button" ref = {col3} onClick={(e)=>{click(e, 2)}}></div>
                </div>
                <div className="row2">
                    <div className = "col" role="button" ref = {col4} onClick={(e)=>{click(e, 3)}}></div>
                    <div className = "col" role="button" ref = {col5} onClick={(e)=>{click(e, 4)}}></div>
                    <div className = "col" role="button" ref = {col6} onClick={(e)=>{click(e, 5)}}></div>
                </div>
                <div className="row3">
                    <div className = "col" role="button" ref = {col7} onClick={(e)=>{click(e, 6)}}></div>
                    <div className = "col" role="button" ref = {col8} onClick={(e)=>{click(e, 7)}}></div>
                    <div className = "col" role="button" ref = {col9} onClick={(e)=>{click(e, 8)}}></div>
                </div>
            </div>
            <div className = "reset">
                <div className="reset-btn" onClick={Reset}>Reset</div>
            </div>
        </div>
    )
}