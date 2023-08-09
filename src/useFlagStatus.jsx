import { useContext } from "react"
import { FlagContext } from "./FlagContext"

function useFlagStatus () {
    let { flagsReady, flagsError } = useContext(FlagContext)

    return { flagsReady, flagsError }
}

export default useFlagStatus