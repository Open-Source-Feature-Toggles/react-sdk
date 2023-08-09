import { FlagContext } from "./FlagContext"
import { useEffect, useMemo, useRef, useState } from "react"
import FeatureToggleClient from "osff-js-sdk"

function FlagProvider ({
    config, 
    children
}) {
    
    const client = useRef(new FeatureToggleClient(config))
    const [ FlagsReady, setFlagsReady ] = useState(false)
    const [ FlagsError, setFlagsError ] = useState(false) 
    const [ clientStarted, setClientStarted ] = useState(false)

    const startClient = () => {
        if (!clientStarted){
            client.current.start()
            setClientStarted(true)
        }
    }

    useEffect( () => {
        if (!client || !config){
            throw new Error(`You must provide a valid config to the flag provider in order 
                for the FeatureToggleClient to start`)
        }

        const readyCallBack = () => {
            console.log('[CONNECTED] Feature-Toggle-Client')
            setFlagsReady(true)
        }

        const errorCallBack = () => {
            setFlagsError(true)
            throw new Error('Error with Feature-Toggle-Client connection')
        }

        startClient()

        client.current.addEventListener('ready', readyCallBack)
        client.current.addEventListener('error', errorCallBack)

        return () => {
            client.current.removeEventListener('ready', readyCallBack)
            client.current.removeEventListener('error', errorCallBack)
        }
    }, [])

    const context = useMemo(() => ({
        client : client.current, 
    }), [FlagsReady, FlagsError])

    return <FlagContext.Provider value={context}>{children}</FlagContext.Provider>
}

export default FlagProvider