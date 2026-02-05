
import { useRouteError } from "react-router";

export function FallBackUI_Route(){
    const error = useRouteError();
     console.log(error);
     
    return (
        <>
            <h1>
               Status: {error.status}                
            </h1>
            <h2>
               Error Message: {error.error?.message}
            </h2>
        </>
    )
}