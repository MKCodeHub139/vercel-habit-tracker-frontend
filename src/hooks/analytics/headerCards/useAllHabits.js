import {useQuery} from '@apollo/client/react'
import {GetHabits} from '../../../graphql/queries'

const useAllHabits = () => {

    const {data:habits, isLoading, isError} = useQuery(GetHabits);
    return {habits, isLoading, isError}
}

export default useAllHabits