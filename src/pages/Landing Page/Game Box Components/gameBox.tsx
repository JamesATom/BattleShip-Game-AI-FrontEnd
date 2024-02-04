
import { Link } from 'react-router-dom';
import '../landingPage.css';

export const GameBox = ({ imageBox }: { imageBox: any }) => (
    <Link 
    to={imageBox.link} 
    className="image-link" 
    style={{ 
        display: 'block', 
        height: '100%' 
        }}>
        <div 
        className="grid-item" 
        style={{ 
            backgroundImage: `url(${imageBox.image})`, 
            backgroundPosition: "center" 
            }}>
        </div>
    </Link>
);

