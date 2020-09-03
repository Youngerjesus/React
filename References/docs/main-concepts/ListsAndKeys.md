## Lists and Keys

    먼저 JavaScript에서 리스트를 어떻게 변환하는지 살펴봅시다.
    
아래는 map()함수를 이용하여 numbers 배열의 값을 두배로 만든 후 map()에서 반환하는 새 배열을 doubled 변수에 할당하고 로그를 확인하는 코드입니다.

```javascript
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map((number) => number * 2);
    console.log(doubled); // output [2, 4, 6, 8]
```

React에서 배열을 엘리먼트 리스트로 만드는 방식은 이와 거의 동일 합니다.

***
#### Rendering Multiple Components

엘리먼트 모음을 만들고 중괄호 {}를 이용하여 JSX에 포함 시킬 수 있습니다.

아래의 JavaScript map() 함수를 사용하여 numbers 배열을 반복 실행합니다. 각 항목에 대해 li 엘리먼트를 반환하고 엘리먼트 배열의 결과를 listItems에 저장합니다.

```jsx
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
```

listItems 배열을 ul 엘리먼트 안에 포함하고 DOM에 렌더링합니다.

```jsx
    ReactDOM.render(
      <ul>{listItems}</ul>,
      document.getElementById('root')
    );
```

***
#### Basic List Component

일반적으로 컴포넌트 안에서 리스트를 렌더링합니다.

이전 예제를 numbers 배열을 받아서 순서 없는 엘리먼트 리스트를 출력하는 컴포넌트로 리팩토링할 수 있습니다.

```jsx
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return (
        <ul>{listItems}</ul>
      );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
```

이 코드를 실행하면 리스트의 각 항목에 key를 넣어야 한다는 경고가 표시됩니다. “key”는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트입니다. 다음 섹션에서 key의 중요성에 대해서 더 설명하겠습니다. 이제 numbers.map() 안에서 리스트의 각 항목에 key를 할당하여 키 누락 문제를 해결하겠습니다.

```jsx
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        <li key={number.toString()}>
          {number}
        </li>
      );
      return (
        <ul>{listItems}</ul>
      );
    }
    
    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
```

***
#### Key

Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다. key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 합니다.

```jsx
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
```

Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것입니다. 대부분의 경우 데이터의 ID를 key로 사용합니다.

```jsx
    const todoItems = todos.map((todo) =>
      <li key={todo.id}>
        {todo.text}
      </li>
    );
```

렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있습니다.

```jsx
    const todoItems = todos.map((todo, index) =>
      // Only do this if items have no stable IDs
      <li key={index}>
        {todo.text}
      </li>
    );
```

항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 권장하지 않습니다. 이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있습니다. Robin Pokorny’s가 작성한 글인 인덱스를 key로 사용할 경우 부정적인 영향에 대한 상세 설명을 참고하시길 바랍니다. 만약 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용합니다.

***
#### Extracting Components with Keys

Keys only make sense in the context of the surrounding array.

예를 들어 ListItem 컴포넌트를 추출 한 경우 ListItem 안에 있는 li 엘리먼트가 아니라 배열의 ListItem 엘리먼트가 key를 가져야 합니다.

예시: 잘못된 Key 사용법

```jsx
    function ListItem(props) {
      const value = props.value;
      return (
        // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
        <li key={value.toString()}>
          {value}
        </li>
      );
    }
    
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        // 틀렸습니다! 여기에 key를 지정해야 합니다.
        <ListItem value={number} />
      );
      return (
        <ul>
          {listItems}
        </ul>
      );
    }
    
    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
```

예시: 올바른 Key 사용법

```jsx
    function ListItem(props) {
      // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
      return <li>{props.value}</li>;
    }
    
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        // 맞습니다! 배열 안에 key를 지정해야 합니다.
        <ListItem key={number.toString()} value={number} />
      );
      return (
        <ul>
          {listItems}
        </ul>
      );
    }
    
    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
```

Keys Must Only Be Unique Among Siblings

Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique. We can use the same keys when we produce two different arrays:

```jsx
    function Blog(props) {
      const sidebar = (
        <ul>
          {props.posts.map((post) =>
            <li key={post.id}>
              {post.title}
            </li>
          )}
        </ul>
      );
      const content = props.posts.map((post) =>
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      );
      return (
        <div>
          {sidebar}
          <hr />
          {content}
        </div>
      );
    }
    
    const posts = [
      {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
      {id: 2, title: 'Installation', content: 'You can install React from npm.'}
    ];
    ReactDOM.render(
      <Blog posts={posts} />,
      document.getElementById('root')
    );
```

React에서 key는 힌트를 제공하지만 컴포넌트로 전달하지는 않습니다. 컴포넌트에서 key와 동일한 값이 필요하면 다른 이름의 prop으로 명시적으로 전달합니다.

```jsx
    const content = posts.map((post) =>
      <Post
        key={post.id}
        id={post.id}
        title={post.title} />
    );
```













