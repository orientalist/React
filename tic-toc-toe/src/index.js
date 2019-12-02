import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
};

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='border-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='border-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    };
};

class Game extends React.Component {
    //建構式
    constructor(props) {
        super(props);
        this.state = {
            //歷程紀錄
            history: [{ squares: Array(9).fill(null) }],
            //玩家是否為X
            xIsNext: true,
            //現處於記錄索引
            stepNumber:0
        };
    };

    //宮格點擊事件
    //寫於此是因為他會改變處存於此的歷程
    //而後再透過render往下傳遞給board
    handleClick(i) {
        //當前歷程(取歷程中自0開始的當前歷程索引+1單位)
        const history = this.state.history.slice(0,this.state.stepNumber+1);

        //當前歷程
        const current = history[history.length - 1];

        //複製當前歷程
        const squares = current.squares.slice();

        //若已獲勝,不作為
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        //修改當前歷程,填入X/O
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //刷新state=>觸發render
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext
        });
    };

    //回跳事件
    jumpTo(step){
        //觸發render,渲染至該歷程
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0
        });
    };

    //渲染事件
    render() {
        const history = this.state.history;
        //透過stepNumber取得當前歷程
        const current = history[this.state.stepNumber];
        //計算是否有贏家
        const winner = calculateWinner(current.squares);

        //產生歷程按鈕
        const move = history.map((step, move) => {

            const desc = move ?
                `Go to move #${move}` :
                `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        //產生狀態文字
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{move}</ol>
                </div>
            </div>
        );
    };
};

//===================================================//
//起始點
ReactDom.render(
    <Game />,
    document.getElementById('root')
);

//計算是否有贏家
function calculateWinner(squares) {
    //用以檢驗的位置陣列
    let winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //逐一取出陣列
    for (let line of winningLines) {
        const [a, b, c] = line;
        //若陣列三位置直接相同,則獲勝
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    };
    return null;
};