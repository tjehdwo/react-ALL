// todoList
import React,{useState,useEffect,useCallback} from "react";

function ExCallBack(){
    const [count,setCount] = useState(0);
    const inClick = useCallback(() => {
        setCount((count) => count +1);
    },[]);

    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={inClick}>증가하기</button>
        </div>
    )
}