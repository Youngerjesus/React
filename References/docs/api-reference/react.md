## React 최상위 API
    React는 React 라이브러리의 진입점입니다. 
    
    <script> 태그를 사용하여 React를 불러오게 되면 
    
    전역 객체 React를 통하여 최상위 API를 사용할 수 있습니다.
    
    npm에서 ES6를 사용하는 경우 import React from 'react'; 를 통해서 사용할 수 있다. 
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

* * * 
#### Creating React Elements
UI의 형태를 설명하는 데에 JSX를 사용할 것을 권장합니다.

Each JSX element is just syntactic sugar for calling React.createElement(). 

You will not typically invoke the following methods directly if you are using JSX.

> [createElement()](#createElement)
>
> [createFactory()](#createFactory)

* * *
#### Transforming Elements
React는 엘리먼트를 조작하는 API들을 제공합니다.

> [cloneElement()](#cloneElement)
>
> [isValidElement](#isValidElement)
>
> [React.Children](#React.Children)
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
##### React.Fragment
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

* * * 
##### createElement

``` jsx
    React.createElement(
      type,
      [props],
      [...children]
    )
```

인자로 주어지는 타입에 따라 새로운 React 엘리먼트를 생성하여 반환합니다. <br>
(Note. React Element는 화면에 표시할 내용을 말합니다)

type 인자로는 태그 이름 문자열('div' 또는 'span' 등), React 컴포넌트 타입, 또는 React Fragment 타입 중 하나가 올 수 있습니다. <br>
(Note. React Component 타입은 말 그대로 컴포넌트 UI를 재사용 가능한 개별적인 여러 조각을 말합니다) 

JSX로 작성된 코드는 React.createElement()를 사용하는 형태로 변환됩니다. 

JSX를 사용할 경우 React.createElement()를 직접 호출하는 일은 거의 없습니다. 

* * *
##### createFactory

``` javascript
    React.createFactory(type)
```

주어진 타입의 React 엘리먼트를 만들어내는 함수를 반환합니다. 

React.createElement()와 마찬가지로 type 인자는 태그 이름 문자열('div' 또는 'span' 등), React 컴포넌트 타입, 또는 React Fragment 타입 중 하나가 올 수 있습니다.

이 헬퍼 함수는 레거시 기능으로 간주되며, 대신 JSX 문법을 사용하거나 React.createElement()를 직접 사용하는 것이 좋습니다. <br>
(Note legacy란 옛날에 개발된 기술을 말한다. ) 

JSX를 사용할 경우 React.createFactory()를 직접 호출하는 일은 거의 없습니다. 

* * * 
##### cloneElement
``` javascript
    
    React.cloneElement(
      element,
      [props],
      [...children]
    )
```

element를 기준으로 새로운 React 엘리먼트를 복사하고 반환합니다. 

새로운 엘리먼트에는 원본 엘리먼트가 가졌던 props가 새로운 props와 얕게(shallowly Copy) 합쳐진 뒤 주어집니다. 

New children will replace existing children. key and ref from the original element will be preserved.

React.cloneElement()는 아래의 구문과 거의 동등합니다.

``` jsx
    <element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves refs. This means that if you get a child with a ref on it, you won’t accidentally steal it from your ancestor.  <br>
(Note. Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.)

* * * 
##### isValidElement 

``` jsx
    React.isValidElement(object)
```

객체가 React 엘리먼트인지 확인합니다. true 또는 false를 반환합니다.

* * * 
##### React.Children 

React.Children provides utilities for dealing with the this.props.children opaque data structure
(Note. Opaque Data type은 애당 데이터 타입의 내부 정보가 외부 인터페이스로 모두 노출되지 않은 데이터 타입을 말한다.)

> #### React.Children.map
```jsx
    React.Children.map(children, function[(thisArg)])
```

children에 포함된 각 자식에 대하여 this를 thisArg의 값으로 설정한 함수를 호출합니다. 

children이 배열일 경우, 이 배열의 각 자식에 대하여 함수가 호출됩니다. 

children이 null 또는 undefined일 경우, 이 메서드는 배열이 아니라 null 또는 undefined를 반환합니다.
(Note. children이 Fragment일 경우, children은 단일 자식으로 취급되어 순회하지 않습니다.)


> #### React.Children.forEach
```jsx
    React.Children.forEach(children, function[(thisArg)])
```

React.Children.map()와 비슷하지만, 배열을 반환하지 않습니다.

> #### React.Children.count

```jsx
    React.Children.count(children)
```

children에 포함된 컴포넌트의 개수를 반환합니다. 

map 또는 forEach로 전달된 콜백이 호출된 횟수와 동일한 값입니다.

> #### React.Children.only

```jsx
    React.Children.only(children)
```

children이 단 하나의 자식(React 엘리먼트)를 갖는지 확인하고 해당 자식 엘리먼트를 반환합니다. 

그렇지 않을 경우 오류를 발생시킵니다.

React.Children.only()는 React.Children.map()의 반환값을 허용하지 않는데,
 
왜냐하면 반환값이 React 엘리먼트가 아니라 배열이기 때문입니다.

> #### React.Children.toArray

``` jsx
    React.Children.toArray(children)
```

Returns the children opaque data structure as a flat array with keys assigned to each child.

render() 메서드에서 children의 집합을 다루고 싶을 때, 

특히 this.props.children을 하부로 전달하기 전에 다시 정렬하거나 일부만 잘라내고 싶을 때에 유용합니다.

* * * 
##### React.createRef

React.createRef는 React 엘리먼트에 ref 어트리뷰트로 붙일 수 있는 ref를 생성합니다.

```jsx
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
    
        this.inputRef = React.createRef();
      }
    
      render() {
        return <input type="text" ref={this.inputRef} />;
      }
    
      componentDidMount() {
        this.inputRef.current.focus();
      }
    }
```

* * * 
##### React.forwardRef

React.forwardRef는 전달받은 ref 어트리뷰트를 하부 트리 내의 다른 컴포넌트로 전달하는 React 컴포넌트를 생성합니다.
 
이 기법은 잘 사용되지 않지만, 아래의 두 시나리오에서는 특히 유용합니다.

DOM 엘리먼트로 ref 전달하기

고차 컴포넌트(Higer Order Component)로 ref 전달하기

```jsx
    const FancyButton = React.forwardRef((props, ref) => (
      <button ref={ref} className="FancyButton">
        {props.children}
      </button>
    ));
    
    // You can now get a ref directly to the DOM button:
    const ref = React.createRef();
    <FancyButton ref={ref}>Click me!</FancyButton>;
```
    위의 예시에서 React는 <FancyButton ref={ref}> 엘리먼트에 주어진 ref를 
    
    React.forwardRef 호출시 렌더링 함수에 2번째 인자로 전달합니다.
     
    이 렌더링 함수는 ref를 <button ref={ref}> 엘리먼트에 전달합니다.
    
    자세한 내용은 advance-guides에 있습니다

* * * 
##### React.lazy

React.lazy()를 사용하면 동적으로 불러오는 컴포넌트를 정의할 수 있습니다. 

그러면 번들의 크기를 줄이고, 초기 렌더링에서 사용되지 않는 컴포넌트를 불러오는 작업을 지연시킬 수 있습니다.

lazy한 컴포넌트를 렌더링하려면 렌더링 트리 상위에 <React.Suspense> 컴포넌트가 존재해야 한다는 점에 유의하세요. 

```jsx
    const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

* * * 
##### React.Suspense

React.Suspense lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. 

Today, lazy loading components is the only use case supported by <React.Suspense>:

```jsx
    // 이 컴포넌트는 동적으로 불러옵니다
    const OtherComponent = React.lazy(() => import('./OtherComponent'));
    
    function MyComponent() {
      return (
        // Displays <Spinner> until OtherComponent loads
        <React.Suspense fallback={<Spinner />}>
          <div>
            <OtherComponent />
          </div>
        </React.Suspense>
      );
```

lazy components can be deep inside the Suspense tree —  it doesn’t have to wrap every one of them. 

The best practice is to place <Suspense> where you want to see a loading indicator, 

but to use lazy() wherever you want to do code splitting.
