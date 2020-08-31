## React 최상위 API
    React는 React 라이브러리의 진입점입니다. 
    
    <script> 태그를 사용하여 React를 불러오게 되면 
    
    전역 객체 React를 통하여 최상위 API를 사용할 수 있습니다.
* * *

### Overview 
* * * 
### Components
React 컴포넌트를 사용하면 UI를 독립적이고 재사용할 수 있는 부분으로 나누고 각 부분을 분리하여 생각할 수 있습니다.

React 컴포넌트는 React.Component 또는 React.PureComponent로 세부적으로 나누어 정의할 수 있습니다.

<ul>
    <li> React.Component </li>
    <li> React.PureComponent </li>
</ul>

React 컴포넌트를 정의할 때 래핑될 수 있는 함수의 형태로 할 수도 있습니다.
<ul>
    <li> React.memo </li>
</ul>

<br> 

#### Transforming Elements
React는 엘리먼트를 조작하는 API들을 제공합니다.

* * * 
#### Fragments
React는 래퍼 없이 여러 엘리먼트를 렌더링할 수 있는 컴포넌트를 제공합니다.

> [React.Fragment](#React.Fragment)

* * * 
#### Refs
> [React.createRef](#React.createRef)
>
> [React.forwardRef](#React.forwardRef)   

* * * 
#### Suspense
Suspense를 사용하면 컴포넌트가 렌더링하기 전에 다른 작업이 먼저 이루어지도록 대기합니다

현재 Suspense는 단 하나의 사용 사례 React.lazy를 사용하여 컴포넌트를 동적으로 불러오기만 지원합니다. 

나중에는 데이터 불러오기와 같은 사용 사례를 지원할 계획입니다.
> [React.lazy](#React.lazy)
>
> [React.Suspense](#React.Suspense)

* * * 
#### Hooks   
Hooks를 사용하면 class를 사용하지 않아도 state와 React 기능들을 사용할 수 있도록 해줍니다.

> useContext
>
> useState
>
> useEffect 
>
> useReducer
>
> useCallback
>
> useMemo
>
> useRef
>
> useImperativeHandle
>
> useLayoutEffect
>
> useDebugValue
* * *
##### React.Fragment </a>
React.Fragment 컴포넌트를 사용하면 render() 메서드 안에서 추가적인 DOM 엘리먼트를 생성하지 않아도 여러 엘리먼트를 반환할 수 있습니다.

``` jsx
    render() {
      return (
        <React.Fragment>
          Some text.
          <h2>A heading</h2>
        </React.Fragment>
      );
    }

    축약형인 <></> 문법으로도 동일하게 사용할 수 있습니다.
```



 