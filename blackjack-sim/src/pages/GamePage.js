import '../App.css';
import '../css/Login.css';
import NavBar from '../components/navbarComponent';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newDeck, drawCards } from "../services/deckService";
import { addWin, addLoss } from "../services/accountService";

function GamePage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) navigate("/login");
    }, [navigate, user]);

    async function initGame() {
        setGameOver(false);
        setMessage("");
        setPlayerCards([]);
        setDealerCards([]);

        try {
            const deck = await newDeck();
            setDeckId(deck.deck_id);

            const playerResponse = await drawCards(deck.deck_id, 2);
            const dealerResponse = await drawCards(deck.deck_id, 2);

            console.log("Player draw response:", playerResponse);
            console.log("Dealer draw response:", dealerResponse);

            if (playerResponse.cards && playerResponse.cards.length === 2) {
                setPlayerCards(playerResponse.cards);
            } else {
                console.error("Player did not get 2 cards:", playerResponse);
            }

            if (dealerResponse.cards && dealerResponse.cards.length === 2) {
                setDealerCards(dealerResponse.cards);
            } else {
                console.error("Dealer did not get 2 cards:", dealerResponse);
            }
        } catch (err) {
            console.error("Error initializing game:", err);
        }
    }

    useEffect(() => {
        initGame();
    }, []);

    function calculateHand(cards) {
        let total = 0;
        let aces = 0;

        cards.forEach((card) => {
            if (card.value === "ACE") {
                aces++;
                total += 11;
            } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
                total += 10;
            } else {
                total += parseInt(card.value);
            }
        });

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    async function hit() {
        if (gameOver) return;
        try {
            const draw = await drawCards(deckId, 1);
            const newHand = [...playerCards, draw.cards[0]];
            setPlayerCards(newHand);

            if (calculateHand(newHand) > 21) {
                setMessage("Bust! You lose.");
                setGameOver(true);
                await addLoss(user.user_id);
            }
        } catch (err) {
            console.error("Error drawing card:", err);
        }
    }

    async function stand() {
        if (gameOver) return;

        setGameOver(true);
        let dealerHand = [...dealerCards];
        const playerTotal = calculateHand(playerCards);

        try {
            while (calculateHand(dealerHand) < 17) {
                const draw = await drawCards(deckId, 1);
                dealerHand.push(draw.cards[0]);
            }

            setDealerCards(dealerHand);
            const dealerTotal = calculateHand(dealerHand);

            if (dealerTotal > 21 || playerTotal > dealerTotal) {
                setMessage("You win!");
                await addWin(user.user_id);
            } else if (dealerTotal === playerTotal) {
                setMessage("It's a tie.");
            } else {
                setMessage("Dealer wins.");
                await addLoss(user.user_id);
            }
        } catch (err) {
            console.error("Error during dealer turn:", err);
        }
    }

    return (
        <div>
            <NavBar />
            {!deckId ? (
                <p>Loading game...</p>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h2>Blackjack</h2>

                    <h3>Dealer</h3>
                    {dealerCards.map((c, i) => (
                        <img
                            key={i}
                            src={gameOver || i === 0 ? c.image : "https://deckofcardsapi.com/static/img/back.png"}
                            alt="card"
                            width={90}
                        />
                    ))}

                    <h3>Your Hand ({calculateHand(playerCards)})</h3>
                    {playerCards.map((c) => (
                        <img key={c.code} src={c.image} alt={c.code} width={90} />
                    ))}

                    <div style={{ marginTop: "20px" }}>
                        {!gameOver ? (
                            <>
                                <button onClick={hit} className="login-button">Hit</button>
                                <button onClick={stand} className="login-button">Stand</button>
                            </>
                        ) : (
                            <>
                                <h2>{message}</h2>
                                <button onClick={initGame} className="login-button" style={{ marginTop: "20px" }}>
                                    Play Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GamePage;
