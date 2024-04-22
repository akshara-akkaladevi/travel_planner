import React from "react";
import { Header } from "../../components/ui/header";
import { FooterNew } from "../../components/ui/footer";


export function Home() {
    return (
        <>
            <Header />


            <div>
                <h1 className="m-4">Welcome to Travel Planner!</h1> 
                <p className="m-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sunt tempore, distinctio adipisci quos eligendi, beatae recusandae corrupti velit consequatur veritatis deserunt iusto provident ullam nam magnam delectus fuga autem.</p>  
            </div>


            <FooterNew />
        </>
    )
}