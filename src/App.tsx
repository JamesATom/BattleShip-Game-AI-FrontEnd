// import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BattleShipDashBoard from './pages/BattleShip Game/Dashboard/battleShipDashboard';
import GameBoard from './pages/BattleShip Game/PlayWithUser/GameBoardWithUser/gameBoard';
import GameOnBoard from './pages/BattleShip Game/PlayWithUser/GameOnWithUser/gameOnBoard';
import LandingPage from './pages/Landing Page/landingPage';
import AIGameBoard from './pages/BattleShip Game/PlayWithAI/GameBoardWithAI/gameBoardWithAI';
import { PrivateRoute } from './privateRoute';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from './utils/graphqlQuery/gql';
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
    const { data: subscriptionData, error: subscriptionError } = useSubscription(USER_SUBSCRIPTION);

    if (subscriptionData !== undefined) {
        sessionStorage.setItem('users', JSON.stringify(subscriptionData));
    }

    if (subscriptionError) {
        console.error("Subscription error:", subscriptionError);
        return <div>Error</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage  />} />

                <Route 
                path="/battleship-dashboard" 
                element={
                    <PrivateRoute allowedPath='/battleship-dashboard'>
                        <BattleShipDashBoard subscriptionData={subscriptionData} />
                    </PrivateRoute>} 
                />
                    
                <Route 
                path="/battleship-gameBoard" 
                element={
                    <PrivateRoute allowedPath='/battleship-gameBoard'>
                        <GameBoard />
                    </PrivateRoute>} 
                />

                <Route 
                path="/battleship-gameOn" 
                element={
                    <PrivateRoute allowedPath='/battleship-gameOn'>
                        <GameOnBoard />
                    </PrivateRoute>} 
                />
                
                <Route 
                path="/battleship-ai/:difficulty" 
                element={
                    <PrivateRoute allowedPath='/battleship-ai/:difficulty'>
                        <AIGameBoard />
                    </PrivateRoute>} 
                />

                {/* <Route
                path='/battleship-gameOn-ai'
                element={
                    <PrivateRoute allowedPath='/battleship-gameOn-ai'>
                        <GameOnBoardAI />
                    </PrivateRoute>}
                /> */}

                <Route path="*" element={<Navigate to="/" />} /> 
                
            </Routes>

            <SpeedInsights />
        </Router>
    );
}

export default App;


