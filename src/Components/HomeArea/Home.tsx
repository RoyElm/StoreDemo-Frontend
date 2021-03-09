import React, { Component } from "react";
import Footer from "../LayoutArea/Footer/Footer";
import Logo from "../LayoutArea/Logo/Logo";
import Menu from "../LayoutArea/Menu/Menu";
import NavLog from "../UserArea/NavLog/NavLog";
import Routing from "../LayoutArea/Routing/Routing";
import "./Home.css";


//img with class
class Home extends Component {
    public render(): JSX.Element {
        return (
            <div className="Home p-col-11 p-md-11 p-lg-12">
                <h1 className="MainSentence">
                    <section>
                        הינה שיטת אימון ומותג המשלבת WoolFit
                    </section>
                    <section>
                        מספר תחומי ספורט שונים ומקצועיים הפונים לכלל
                    </section>
                    <section>
                        האוכלוסיה אשר גורמים משפרים את איכות החיים שלנו ועושה את האימון מהנה יותר
                    </section>
                </h1>
            </div>
        );
    }
}
// class Home extends Component {
//     public render(): JSX.Element {
//         return (
//             <div className="Home">
//                 <header>
//                     <Logo />
//                 </header>
//                 <main>

//                 </main>
//                 <aside>
//                     <Menu />
//                 </aside>
//                 <footer>
//                     <Footer />
//                 </footer>
//             </div>
//         );
//     }
// }

export default Home;

