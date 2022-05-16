import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a {
        transition: color 0.2s ease-in;
        display: flex;
        padding: 20px;
        transition: color 0.2s ease-in;
        align-items: center;

    }
    &:hover {
        a {
            color: ${(props) => (props.theme.accentColor)}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor}
`;

const Loading = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;

`

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins );
    return <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? <Loading>"Loading.. "</Loading>: 
        <CoinsList>
            {data?.slice(0,100).map((coin) => (
            <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{
                    name: coin.name
                }}>
                <Img alt={coin.symbol} src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                {coin.name} &rarr;
                </Link>  
            </Coin>))}
        </CoinsList>}
    </Container> 
}
export default Coins;