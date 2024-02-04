import { gql } from '@apollo/client';


// Queries
export const GOOGLE_CLIENT_ID_QUERY = gql`
    query {
        googleClientID {
            clientID
        }
    }
`;

// Mutations
export const USER_MUTATION = gql`
    mutation UserMutation($data: CreateUserInput!) {
        createUser(data: $data) {
            id
            name
            email
        }
    }
`;

export const JOIN_ROOM_MUTATION = gql`
    mutation JoinRoomMutation($data: JoinRoomInput!) {
        joinRoom(data: $data) {
            message,
            statusCode
        }
    }
`;

export const LEAVE_ROOM_MUTATION = gql`
    mutation LeaveRoomMutation($data: LeaveRoomInput!) {
        leaveRoom(data: $data) {
            message,
            statusCode
        }
    }
`;

export const SET_SHIP_POSITIONS_MUTATION = gql`
    mutation SetShipPositionsMutation($data: SetShipPositionsInput!) {
        setShipPositions(data: $data) {
            message,
            statusCode
        }
    }
`;

export const LEAVE_ROOM_DURING_GAME_MUTATION = gql`
    mutation LeaveRoomDuringGameMutation($data: LeaveRoomInput!) {
        leaveRoomDuringGame(data: $data) {
            message,
            statusCode,
            userId
        }
    }
`;

export const ATTACK_TO_BOARD_MUTATION = gql`
    mutation AttackToBoardMutation($data: BoardAttackInput!) {
        attackToBoard(data: $data) {
            isHit,
            attackPosition
        }
    }
`;

export const YOU_WIN_MUTATION = gql`
    mutation YouWinMutation($data: YouWinInput!) {
        youWin(data: $data) {
            message,
            statusCode
        }
    }
`;

// Subscriptions
export const USER_SUBSCRIPTION = gql`
    subscription OnNewUserAdded {
        userAdded {
            id
            name
            picture
            score
        }
    }
`;

export const ROOM_SUBSCRIPTION = gql`
    subscription OnRoomUpdated($roomId: String!) {
        shipPositionsSet(data: { roomId: $roomId }) {
            message
            statusCode
        }
    }
`;

export const LEAVE_ROOM_DURING_GAME_SUBSCRIPTION = gql`
    subscription leaveRoomDuringGameSubscription($roomId: String!) {
        leaveRoomDuringGameSubscription(data: { roomId: $roomId }) {
            message,
            statusCode,
            userId
        }
    }
`;

export const ATTACK_TO_BOARD_SUBSCRIPTION = gql`
    subscription OnBoardAttacked($roomId: String!) {
        attackToBoardSubscription(data: { roomId: $roomId }) {
            isHit,
            attackPosition
        }
    }
`;

export const YOU_WIN_SUBSCRIPTION = gql`
    subscription OnYouWin($roomId: String!) {
        youWinSubscription(data: { roomId: $roomId }) {
            message,
            statusCode
        }
    }
`;