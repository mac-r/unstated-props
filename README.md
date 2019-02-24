```js
import { connectContainers } from 'unstated-connect';

import CounterContainer from './CounterContainer';
import BookContainer from './BookContainer';

export default connectContainers({
  counter: CounterContainer
})
```

```js
import * as withContainers from './containers';
export default withContainers(App, { root: true });
```

```js
import * as withContainers from './containers';

const Button = ({ containers: counter }) => (
  <button onClick={ () => { counter.increment() }}>click</button>
)

export default withContainers(Button, { only: [ 'counter' ] });
```
