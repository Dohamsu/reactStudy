import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import counterStore from "../stores/CounterStore";
import {useRouter} from 'next/router'

interface Props {
  counterStore?: counterStore;
}


@inject("counterStore")
@observer
class Counter extends Component<Props, {}> {
  render() {
    const { counterStore } = this.props;
    
    return (
    <div>
    {counterStore!.number}
    <button onClick={()=>counterStore!.increase(2) } >+2</button>
    </div>
);
}
}


export default function defaultApp(){
  const router = useRouter();
  
  return (
    <div>

        <Counter/>
        <div>signuP Pages</div>
        <button onClick={()=>router.push('/')}>RootPage </button>
      </div>
      )
      
      // beforePopState() : 라우터가 작동하기 전에 무언가를 해야할 때 사용
      // routeChangeStart() : 경로가 변경되기 시작할 때 발생
      // routeChangeComplete() : 경로가 완전히 변경되면 발생
      // routeChangeError() : 경로 변경 시 오류가 발생하거나 경로 로드가 취소되면 발생
      // beforeHistoryChange() : 브라우저의 기록을 변경하기 전에 실행
      // hashChangeStart() : 해시는 변경되지만 페이지는 변경되지 않을 때 발생
      // hashChangeComplete : 해시가 변경되었지만 페이지가 변경되지 않은 경우 발생
}