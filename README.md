## unstated-props

[![NPM](http://img.shields.io/npm/v/unstated-props.svg?style=flat)](https://www.npmjs.org/package/unstated-props)
[![travis-ci](https://travis-ci.org/mac-r/unstated-props.svg?branch=master)](https://travis-ci.org/mac-r/unstated-props)

> A higher-order component that enables access to your unstated containers from<br/> component props. No need to set up a `Provider` or `Subscribe` wrappers.

<p align="center">
<img width="800" src='https://cdn.blinkloader.com/express/rF9GczNCw0srKYaWh0NlluCOM/unstated-props.png' alt="unstated-props usage demo" />
</p>

### 👋 Hi there!

**unstated-props** is an abstraction layer on
top of **unstated** by **@jamiebuilds**:<br/>
https://github.com/jamiebuilds/unstated

This is a higher-order component that enables access to your unstated containers from component props. No need to set up a `Provider` or clunky `Subscribe` wrappers. This one is a humble attempt to make a masterpiece like `unstated` even better. ✨

🐣 **< 990 bytes** when used directly in the browser <br/>
⚛️ **React / preact** compatible (thanks to <a href="https://github.com/developit/preact-compat">preact-compat</a>)

### Installation

To install the stable version:

```
npm install --save unstated-props
```

This assumes you are using `npm` as your package manager.

### Usage

Since `unstated-props` is an extension on top of `unstated`, we create `Containers` as we would normally do.
It's recommended to put all of your containers into a single folder. Your application
structure would look similar to the following:

```
src/
  app.jsx
  components/
    Button.jsx
    Menu.jsx
    ...
  containers/
    PlaylistContainer.js
    SettingsContainer.js
    ...
    index.js
```

#### Step 1. Put unstated containers into "containers" folder

Your containers are the original `unstated` containers:

```js
// containers/PlaylistContainer.js
// A good old unstated Container, simple and easy to read.

import { Container } from 'unstated';

class PlaylistContainer extends Container {
  state = { shuffleMode: false };

  shuffle = async () => {
    await this.setState({ shuffleMode: true });
    console.log(this.state.shuffleMode); // true
  };
}

export default PlaylistContainer;
```

#### Step 2. Create index.js in the "containers" folder

Then you need to create the `index.js` file in your `containers/` folder.
This is a place where you import `unstated-props`. You can organize it
in a way similar to this:

```js
// containers/index.js
// The major trick happens here.

import { connect } from 'unstated-props';
import PlaylistContainer from './PlaylistContainer';
import SettingsContainer from './SettingsContainer';

// "playlist" and "settings" will become available
// through "this.props.containers" in your components
export default connect({
  playlist: PlaylistContainer,
  settings: SettingsContainer
});
```

#### Step 3. Set up the root component

Let's say that our demo app has the core component named `App`.
This is the root of the whole thing.

We wrap it with a root flag:

```js
// Root component "src/app.jsx".
// TLDR: don't forget about the root flag! 😉

import React from 'react';
import withContainers from './containers';

const App = () => (
  <div>
    Many different things will be added here.
  </div>
)

export default withContainers(App, { root: true })
```

#### Step 4. Use containers where needed

Now we can access containers from our components. It's really easy and
the end result looks great:

```js
// components/Menu.jsx

import React from 'react';
import withContainers from '../containers';

const Menu = ({ containers: { playlist }}) => (
  <button onClick={()=> { playlist.shuffle() }}>
    Shuffle mode: {playlist.state.shuffleMode}
  </button>
)

export default withContainers(Menu);
```

That's it. Enjoy! ❤️

**Feel free to star this repo and follow me on Twitter:**

[![Github](https://githubbadges.com/star.svg?user=mac-r&repo=unstated-props&style=flat)](https://www.npmjs.org/package/unstated-props)
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/makarochkin.svg?style=social&label=Follow%20%40makarochkin)](https://twitter.com/makarochkin)

### Related


- [unstated](https://raw.githubusercontent.com/jamiebuilds/unstated) - State so simple, it goes without saying
- [unstated-debug](https://github.com/sindresorhus/unstated-debug) - Debug your Unstated containers with ease

----


MIT License, 2019. Max Makarochkin
