import { useContext, useEffect, useState } from "react"
import { FlagContext } from "./FlagContext"

function useFlag (flag_name) {
    const { client } = useContext(FlagContext)
    const [ flag, setFlag ] = useState(false)

    useEffect( () => {
        if (!client) { return }

        const updateHandler = () => {
            let status = client.getFlag(flag_name)
            if (status === undefined){
                setFlag(false)
            }
            else { setFlag(status) }
        }

        client.addEventListener('update', updateHandler)
        client.addEventListener('ready', updateHandler)

        return () => {
            client.removeEventListener('update', updateHandler)
            client.removeEventListener('ready', updateHandler)
        }
    }, [])

    return flag
}


export default useFlag