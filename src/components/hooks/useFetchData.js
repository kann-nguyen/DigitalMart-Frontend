import { useEffect } from "react";
import { useState } from "react"
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

const useFetchData = (apiFuncs) => {
    const [isFetched, setFetched] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true));
        Promise.all(apiFuncs())
            .then(() => {
                setFetched(true);
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }, [])
    return isFetched;
}

export default useFetchData;