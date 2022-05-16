import { useOutletContext } from "react-router-dom"

interface priceProps{
    coinId : String;
}

function Price() {
    const { coinId } = useOutletContext<priceProps>();
    return <h1>Price</h1>
}

export default Price;