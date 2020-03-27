// ova e HIGHER ORDER COMPONENT - HOC
// HOC e najcesto funkcija sto zema eden component
// i vrakja nekoj drug enhanced component

import React from "react";
import AuthService from "./AuthService";


    /*
    Ovoj component e filter component - ja filtrira <App> component spored toa
    dali userot e logiran ili ne. Ako e logiran togas se prikazuva <App> component so withAuth funkcijata
    kako nejzin wrapper component. Ako ne e samo redirect-nuva kon /login odnosno <LogIn> component
     */


export default function withAuth(AuthComponent) {

    const Auth = new AuthService();

    return class AuthWrapped extends React.Component{

        constructor() {
            super();
            this.state = {
                user:null
            }
        }

        // componentDidMount() {
        //     if(!Auth.loggedIn()){               // ako userot ne e logiran redirect na login
        //         this.props.history.replace('/login')
        //     }
        //     else{           // ako e logiran probuvame da go zememe negoviot profil
        //         try {
        //             const profile = Auth.getProfile();  // dekodirame token i go stavame vo state
        //             this.setState({
        //                 user:profile
        //             })
        //         }
        //         catch (err) {
        //             Auth.logout();
        //             this.props.history.replace('/login')
        //         }
        //     }
        // }



        // vaka bese porano napraveno, mislam deka raboti i so componentDidMount

        componentWillMount() {
            //debugger;
            if(!Auth.loggedIn()){               // ako userot ne e logiran redirect na login
                this.props.history.replace('/login')
            }
            else{           // ako e logiran probuvame da go zememe negoviot profil
                try {
                    const profile = Auth.getProfile();  // dekodirame token i go stavame vo state
                    this.setState({
                        user:profile
                    })
                }
                catch (err) {
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }


        render() {
            if(this.state.user){    // ako userot vo state ne e null (ako e logiran)
                return(
                    <AuthComponent {...this.props} {...this.state}/>        // {...this.props} za da se prenesat propsot
                )                                                       // od nekoja parent component (vo slucajov nema, samo index.js)
                                            // radi {...this.state} vo App component imas vo props user koj mozes da go access-nes
                                            // user e ustvari od tip Auth.getProfile objekt, odnosno vo nego sodrzi id,username,iat,exp
            }
            else{
                return null;
            }
        }
    }
}