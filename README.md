# Feature-Toggles-React-SDK
### React SDK for [opensourcefeaturetoggles.com](https://opensourcefeaturetoggles.com)

## All repositories as part of this project

[JS-SDK](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Flagging-Client-API)

[Admin-Website](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Flagging-Admin-UI)

[Node-Backend](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Flagging-Server)

## Installations

```bash
npm install feature-toggles-react-sdk
# or 
yarn add feature-toggles-react-sdk 
```

## How to Use 
### Initialize the Client

First create a config and pass that config as props with name 'config' to FlagProvider somewhere in your component tree. The config should contain the API Key for your project's environment that you will be testing and a formatted string to tell the client how often it should check for updated flags.

Since the client is able to update on regular intervals, any changes done by the project admin will be reflected in real time to the client. 

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FlagProvider } from 'feature-toggles-react-sdk'

const config = {
  apiKey : 'YOUR-API-KEY', 
  refreshRate : '5s', 
}

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </React.StrictMode>,
)
```

### Get Flags

You can check if a feature flag is enabled with the ```useFlag``` hook. Simply pass it the feature and variable you are looking for with the format 'featureName.variableName'. This function returns a boolean of whether it is active or not. If the feature/variable combination you pass does not exist in your project or is not enabled for the given environment, the flag will default to false. 

```jsx
import { useFlag } from 'feature-toggles-react-sdk'

function App () {
    let featureFlag = useFlag('feature.variable')

    return (
        <>
            { featureFlag ? <h1>Feature turned on</h1> ? <h1>Feature turned off</h1> }
        </>
    )
}
```

### Get Features

Similar to useFlag, you can check if a feature is enabled with the ```useFeature``` hook by passing it the name of the feature. If the feature doesn't exist, the flag defaults to false. 

Since features typically have multiple variables, this hook can be useful for enabling/disabling entire parts of your application that may hold many variables.

```jsx
import { useFeature } from "feature-toggles-react-sdk"

function HomePage () {
  const displayAbout = useFeature('about')

  return (
      <>
          <Header/>
          <Sidebar/>
          { displayAbout ? <About/> : null } 
          <Main/>
      </>
  )
}
```

### Defer flags until fetched 

While the feature toggle client makes its initial request, you can defer loading your application until the flags have been loaded. It's important to note that all 
flags that are called in your application default to false until they are updated by the client. 

```jsx
import { useFlagStatus } from 'feature-toggles-react-sdk';

function MyApp {
  const { flagsReady, flagsError } = useFlagsStatus()

  if (!flagsReady) {
    return <Loading />;
  }
  return <MyComponent error={flagsError} />
}
```
