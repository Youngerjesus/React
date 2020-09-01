## Rendering Elements
    엘리먼트는 React 앱의 가장 작은 단위입니다.
    
앨리먼트는 화면에 표시할 내용을 기술합니다. 

```jsx
    const element = <h1>Hello, world</h1>;
```

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게 생성할 수 있습니다. 

React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트합니다.

더 널리 알려진 개념인 “컴포넌트”와 엘리먼트를 혼동할 수 있습니다.
 
다음 장에서 컴포넌트에 대해 소개할 예정입니다. 

엘리먼트는 컴포넌트의 “구성 요소”이므로 이번 장을 읽고 나서 다음 장으로 넘어갈 것을 권합니다.

* * * 
#### DOM에 엘리먼트 렌더링하기

HTML 파일 어딘가에 <div>가 있다고 가정해 봅시다.

```jsx
    <div id="root"></div>
```

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 “루트(root)” DOM 노드라고 부릅니다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있습니다.
 
React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있습니다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ReactDOM.render()로 전달하면 됩니다.

```jsx
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
```

***
#### 렌더링 된 엘리먼트 업데이트하기

React elements are immutable. 

Once you create an element, you can’t change its children or attributes. 

An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to ReactDOM.render().

예시로 똑딱거리는 시계를 살펴보겠습니다.

```jsx
    function tick() {
      const element = (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
      ReactDOM.render(element, document.getElementById('root'));
    }
    
    setInterval(tick, 1000);
```

In practice, most React apps only call ReactDOM.render() once

In the next sections we will learn how such code gets encapsulated into stateful components.

각 주제가 서로 연관이 있기 때문에 건너뛰지 않는 것을 추천합니다.

***
#### 변경된 부분만 업데이트하기

React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트합니다.

매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 React DOM은 내용이 변경된 텍스트 노드만 업데이트했습니다.









