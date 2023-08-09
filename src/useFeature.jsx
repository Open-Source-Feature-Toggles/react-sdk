import { useContext, useEffect, useState } from "react"
import { FlagContext } from "./FlagContext"

function useFeature (feature_name) {
    const { client } = useContext(FlagContext)
    const [ feature, setFeature ] = useState(false)

    useEffect( () => {
        if (!client) { return }

        const updateHandler = () => {
            let status = client.getFeature(feature_name)
            setFeature(status)
        }

        client.addEventListener('update', updateHandler)
        client.addEventListener('ready', updateHandler)

        return () => {
            client.removeEventListener('update', updateHandler)
            client.removeEventListener('ready', updateHandler)
        }
    }, [])
    return feature
}

export default useFeature