### Reconciliation
React는 선언적 API를 제공하기 때문에 갱신이 될 때마다 매번 무엇이 바뀌었는지를 걱정할 필요가 없습니다. 

React를 사용하다 보면, ’render() 함수는 React 엘리먼트 트리를 만드는 것이다

state나 props가 갱신되면 render() 함수는 새로운 React 엘리먼트 트리를 반환할 것입니다. 

이때 React는 방금 만들어진 트리에 맞게 가장 효과적으로 UI를 갱신하는 방법을 알아낼 필요가 있습니다.

하나의 트리를 가지고 다른 트리로 변환하기 위한 최소한의 연산 수를 구하는 알고리즘 문제를 풀기 위한 일반적인 해결책들이 있습니다.

하지만 이러한 최첨단의 알고리즘도 n개의 엘리먼트가 있는 트리에 대해 O(n3)의 복잡도를 가집니다.

React에 이 알고리즘을 적용한다면, 1000개의 엘리먼트를 그리기 위해 10억 번의 비교 연산을 수행해야 합니다. 

React는 대신, 두 가지 가정을 기반하여 O(n) 복잡도의 휴리스틱 알고리즘을 구현했습니다.

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.

2. 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.
* * *
### 비교 알고리즘 (Diffing Algorithm)
두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교합니다. 

이후의 동작은 루트 엘리먼트의 타입에 따라 달라집니다.
* * *
#### 엘리먼트의 타입이 다른 경우
두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다.

a tag에서 img tag로, Article jsx 에서 Comment jsx로, 혹은 Button tag to div tag로 바뀌는 것 모두 트리 전체를 재구축하는 경우입니다.

컴포넌트 인스턴스는 componentWillUnmount()가 실행됩니다. 



새로운 트리가 만들어질 때, 새로운 DOM 노드들이 DOM에 삽입됩니다.

그에 따라 컴포넌트 인스턴스는 componentWillMount()가 실행되고

componentDidMount()가 이어서 실행됩니다.

이전 트리와 연관된 모든 state는 사라집니다.

``` typescript jsx
    <div>
        <Counter />
    </div>

    <span>
        <Counter />
    </span>
```
이전 Counter는 사라지고, 새로 다시 마운트가 될 것입니다.

* * * 
#### DOM 엘리먼트의 타입이 같은 경우

같은 타입의 두 React DOM 엘리먼트를 비교할 때, React는 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신합니다

``` typescript jsx
    <div className="before" title="stuff" />
    
    <div className="after" title="stuff" />
```

이 두 엘리먼트를 비교하면, React는 현재 DOM 노드 상에 className만 수정합니다

style이 갱신될 때, React는 또한 변경된 속성만을 갱신합니다. 예를 들어,

``` typescript jsx
    <div style={{color: 'red', fontWeight: 'bold'}} />
    
    <div style={{color: 'green', fontWeight: 'bold'}} />
```
위 두 엘리먼트 사이에서 변경될 때, React는 fontWeight는 수정하지 않고 color 속성 만을 수정합니다.

DOM 노드의 처리가 끝나면, React는 이어서 해당 노드의 자식들을 재귀적으로 처리합니다.
* * * 

####같은 타입의 컴포넌트 엘리먼트

컴포넌트가 갱신되면 인스턴스는 동일하게 유지되어 렌더링 간 state가 유지됩니다

React는 새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신합니다

이때 해당 인스턴스의 componentWillReceiveProps()와 componentWillUpdate()를 호출합니다.
 
* * *
#### 자식에 대한 재귀적 처리

DOM 노드의 자식들을 재귀적으로 처리할 때,

React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성합니다.

예를 들어, 자식의 끝에 엘리먼트를 추가하면, 두 트리 사이의 변경은 잘 작동할 것입니다.

``` jsx
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>
    
    <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </ul>
    
    React는 두 트리에서 <li>first</li>가 일치하는 것을 확인하고,

    <li>second</li>가 일치하는 것을 확인합니다. 

    그리고 마지막으로 <li>third</li>를 트리에 추가합니다.
```

하지만 위와 같이 단순하게 구현하면, 

리스트의 맨 앞에 엘리먼트를 추가하는 경우 성능이 좋지 않습니다

예를 들어, 아래의 두 트리 변환은 형편없이 작동합니다.

``` jsx
    <ul>
      <li>Duke</li>
      <li>Villanova</li>
    </ul>
    
    <ul>
      <li>Connecticut</li>
      <li>Duke</li>
      <li>Villanova</li>
    </ul>

    React는 <li>Duke</li>와 <li>Villanova</li> 종속 트리를 그대로 유지하는 대신

    모든 자식을 변경합니다. 이러한 비효율은 문제가 될 수 있습니다.
   
```

* * *
#### Keys

이러한 문제를 해결하기 위해, React는 key 속성을 지원합니다.

자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인합니다. 

``` jsx
    <ul>
      <li key="2015">Duke</li>
      <li key="2016">Villanova</li>
    </ul>
    
    <ul>
      <li key="2014">Connecticut</li>
      <li key="2015">Duke</li>
      <li key="2016">Villanova</li>
    </ul>
```

이제 React는 '2014' key를 가진 엘리먼트가 새로 추가되었고, '2015'와 '2016' key를 가진 엘리먼트는 그저 이동만 하면 되는 것을 알 수 있습니다.
* * *

#### Tradeoffs

재조정 알고리즘은 구현상의 세부사항이라는 것을 명심하세요.

React는 항상 전체 앱을 재렌더링할 수도 있지만, 최종적으로 출력되는 결과는 항상 같을 것입니다. 

Just to be clear rerender in this context means calling render for all components, 

it doesn’t mean React will unmount and remount them.

일반적인 사용 사례에서 더 빠르게 작동할 수 있도록 계속 휴리스틱 알고리즘을 개선하고 있습니다. 

key는 반드시 변하지 않고, 예상 가능하며, 유일해야 합니다
