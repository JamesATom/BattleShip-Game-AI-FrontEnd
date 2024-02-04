import { useState } from 'react';
import { ImageBoxes } from "./Image Boxes/ImageBoxArray";
import HeaderComponent from "./Header Component/headerComponent";
import { GameBox } from "./Game Box Components/gameBox";
import FooterComponent from "./Footer Component/footerComponent";

export default function LandingPage() {
    const [imageBoxes] = useState(ImageBoxes);

    return (
        <> 
            <HeaderComponent />

            <main className="grid-container">
                {imageBoxes.map((imageBox, index) => (
                    <GameBox key={index} imageBox={imageBox} />
                ))}
            </main>
            
            <FooterComponent />
        </>
    );
}
